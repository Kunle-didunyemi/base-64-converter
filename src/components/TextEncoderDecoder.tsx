"use client";

import { useState, useRef } from "react";
import { encodeToBase64, decodeFromBase64, copyToClipboard } from "@/lib/utils";
import { Message } from "@/lib/types";

interface TextEncoderDecoderProps {
  className?: string;
}

export default function TextEncoderDecoder({
  className = "",
}: TextEncoderDecoderProps) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [message, setMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEncode = async () => {
    if (!inputText.trim()) {
      showMessage("error", "Please enter some text to encode");
      return;
    }

    setIsLoading(true);
    try {
      const encoded = encodeToBase64(inputText);
      setOutputText(encoded);
      showMessage("success", "Text encoded successfully!");
    } catch (error) {
      showMessage("error", (error as Error).message);
      setOutputText("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecode = async () => {
    if (!inputText.trim()) {
      showMessage("error", "Please enter base64 text to decode");
      return;
    }

    setIsLoading(true);
    try {
      const decoded = decodeFromBase64(inputText);
      setOutputText(decoded);
      showMessage("success", "Text decoded successfully!");
    } catch (error) {
      showMessage("error", (error as Error).message);
      setOutputText("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;

    try {
      await copyToClipboard(outputText);
      showMessage("success", "Copied to clipboard!");
    } catch (error) {
      showMessage("error", "Failed to copy to clipboard");
    }
  };

  return (
    <section
      className={`bg-white rounded-xl p-6 shadow-lg border border-gray-200 ${className}`}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-2xl">📝</span>
        Text Base64 Operations
      </h2>

      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label
            htmlFor="text-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Input Text:
          </label>
          <textarea
            id="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to encode or decode..."
            className="w-full min-h-32 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-vertical focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-black"
            rows={6}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleEncode}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Encode to Base64
          </button>
          <button
            onClick={handleDecode}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Decode from Base64
          </button>
        </div>

        {/* Output Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="text-output"
              className="block text-sm font-medium text-gray-700"
            >
              Output:
            </label>
          </div>
          <textarea
            ref={outputRef}
            id="text-output"
            value={outputText}
            readOnly
            placeholder="Result will appear here..."
            className="w-full min-h-32 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm bg-gray-50 text-gray-800 resize-vertical"
            rows={6}
          />
          <button
            onClick={handleCopy}
            disabled={!outputText || isLoading}
            className="mt-3 px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </section>
  );
}
