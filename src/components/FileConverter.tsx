"use client";

import { useState, useRef } from "react";
import {
  convertFileToBase64,
  formatFileSize,
  getFileType,
  isValidFileType,
  copyToClipboard,
  downloadAsFile,
} from "@/lib/utils";
import { Message, Base64Result } from "@/lib/types";

interface FileConverterProps {
  className?: string;
}

export default function FileConverter({ className = "" }: FileConverterProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<string>("No file selected");
  const [outputText, setOutputText] = useState("");
  const [message, setMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFileInfo("No file selected");
      setSelectedFile(null);
      return;
    }

    if (!isValidFileType(file)) {
      showMessage(
        "error",
        "Please select a valid file type (images, icons, or PDFs)"
      );
      event.target.value = "";
      setSelectedFile(null);
      return;
    }

    const fileType = getFileType(file);
    const fileSize = formatFileSize(file.size);
    setFileInfo(`${fileType}: ${file.name} (${fileSize})`);
    setSelectedFile(file);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      const { dataUrl } = await convertFileToBase64(selectedFile);
      setOutputText(dataUrl);
      showMessage("success", "File converted successfully!");
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
      showMessage("success", "Base64 string copied to clipboard!");
    } catch (error) {
      showMessage("error", "Failed to copy to clipboard");
    }
  };

  const handleDownload = () => {
    if (!outputText || !selectedFile) return;

    const fileName = selectedFile.name.replace(/\.[^/.]+$/, "") + "_base64.txt";
    downloadAsFile(outputText, fileName);
    showMessage("success", "File downloaded successfully!");
  };

  const handleClear = () => {
    setSelectedFile(null);
    setFileInfo("No file selected");
    setOutputText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section
      className={`bg-white rounded-xl p-6 shadow-lg border border-gray-200 ${className}`}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-2xl">📁</span>
        File to Base64 Converter
      </h2>

      <div className="space-y-6">
        {/* File Input Section */}
        <div>
          <label
            htmlFor="file-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select File:
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="file-input"
            accept="image/*,.pdf,.ico,.svg"
            onChange={handleFileChange}
            className="w-full p-4 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          <div className="mt-2 p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
            {fileInfo}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleConvert}
            disabled={!selectedFile || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Convert to Base64
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Clear
          </button>
        </div>

        {/* Output Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="file-output"
              className="block text-sm font-medium text-gray-700"
            >
              Base64 Output:
            </label>
          </div>
          <textarea
            id="file-output"
            value={outputText}
            readOnly
            placeholder="Converted base64 string will appear here..."
            className="w-full min-h-32 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm bg-gray-50 text-gray-800 resize-vertical"
            rows={6}
          />
          <div className="flex flex-wrap gap-3 mt-3">
            <button
              onClick={handleCopy}
              disabled={!outputText || isLoading}
              className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={handleDownload}
              disabled={!outputText || isLoading}
              className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Download as Text File
            </button>
          </div>
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
