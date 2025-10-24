export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface Base64Result {
  base64String: string;
  dataUrl: string;
}

export interface Message {
  type: "success" | "error";
  text: string;
}

export type SupportedFileTypes =
  | "image/jpeg"
  | "image/jpg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "image/svg+xml"
  | "image/x-icon"
  | "application/pdf";

export type FileCategory = "Image" | "PDF" | "SVG Icon" | "Icon" | "File";
