import {
  FileInfo,
  Base64Result,
  SupportedFileTypes,
  FileCategory,
} from "./types";

/**
 * Encode text to base64 with proper Unicode support
 */
export function encodeToBase64(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (error) {
    throw new Error(`Failed to encode text: ${(error as Error).message}`);
  }
}

/**
 * Decode base64 text to readable string with proper Unicode support
 */
export function decodeFromBase64(base64Text: string): string {
  try {
    return decodeURIComponent(escape(atob(base64Text)));
  } catch (error) {
    throw new Error(`Failed to decode base64: ${(error as Error).message}`);
  }
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Get file category based on MIME type and file extension
 */
export function getFileType(file: File): FileCategory {
  const type = file.type.toLowerCase();
  if (type.startsWith("image/")) return "Image";
  if (type === "application/pdf") return "PDF";
  if (type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg"))
    return "SVG Icon";
  if (type === "image/x-icon" || file.name.toLowerCase().endsWith(".ico"))
    return "Icon";
  return "File";
}

/**
 * Check if file type is supported
 */
export function isValidFileType(file: File): boolean {
  const validTypes: SupportedFileTypes[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/x-icon",
    "application/pdf",
  ];
  const fileName = file.name.toLowerCase();
  return (
    validTypes.includes(file.type.toLowerCase() as SupportedFileTypes) ||
    fileName.endsWith(".svg") ||
    fileName.endsWith(".ico")
  );
}

/**
 * Convert file to base64 data URL
 */
export function convertFileToBase64(file: File): Promise<Base64Result> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(",")[1]; // Remove data URL prefix
      resolve({
        base64String,
        dataUrl: result,
      });
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}

/**
 * Download text as file
 */
export function downloadAsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
