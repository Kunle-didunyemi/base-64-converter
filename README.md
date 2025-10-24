# Base64 Encoder/Decoder - Next.js Edition

A modern, fully-typed Next.js web application for encoding and decoding base64 strings, and converting files (images, icons, PDFs) to base64 format.

## 🚀 Features

### Text Operations

- **Encode Text**: Convert plain text to base64 format with Unicode support
- **Decode Base64**: Convert base64 strings back to readable text
- **Copy to Clipboard**: Easily copy results to your clipboard

### File Conversion

- **File Upload**: Upload images, icons, and PDFs with validation
- **Base64 Conversion**: Convert files to base64 data URLs
- **Download**: Save base64 output as a text file
- **Copy**: Copy base64 strings to clipboard

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Emoji (built-in)
- **Linting**: ESLint

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd base64-nextjs
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   └── page.tsx        # Main page component
├── components/
│   ├── TextEncoderDecoder.tsx  # Text encoding/decoding component
│   └── FileConverter.tsx       # File conversion component
└── lib/
    ├── types.ts        # TypeScript type definitions
    └── utils.ts        # Utility functions
```

## 🔧 Supported File Types

- **Images**: PNG, JPG, GIF, WebP
- **Icons**: ICO, SVG
- **Documents**: PDF

## 🎯 Usage

### Text Encoding/Decoding

1. Enter your text in the "Input Text" field
2. Click "Encode to Base64" to convert text to base64
3. Click "Decode from Base64" to convert base64 back to text
4. Use "Copy to Clipboard" to copy the result

### File Conversion

1. Click "Select File" and choose an image, icon, or PDF
2. Click "Convert to Base64" to convert the file
3. Use "Copy to Clipboard" or "Download as Text File" to save the result

## 🔒 Security & Privacy

- All processing happens client-side in the browser
- Files are not uploaded to any server
- No data is stored or transmitted
- Full client-side processing ensures privacy

## 🏗️ Architecture

### Components

- **`TextEncoderDecoder`**: Handles text-based base64 operations with proper error handling
- **`FileConverter`**: Manages file uploads, validation, and conversion

### Utilities

- **`encodeToBase64/decodeFromBase64`**: Unicode-safe base64 operations
- **`convertFileToBase64`**: File reading and conversion
- **`copyToClipboard/downloadAsFile`**: Browser API utilities with fallbacks

### Types

Fully typed with TypeScript interfaces for:

- File information
- Base64 results
- Messages and errors
- Supported file types

## 🎨 Styling

Built with Tailwind CSS featuring:

- Gradient backgrounds
- Responsive design
- Hover animations
- Loading states
- Success/error messaging

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.
# base-64-converter
