import TextEncoderDecoder from "@/components/TextEncoderDecoder";
import FileConverter from "@/components/FileConverter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">🔄</span>
            Base64 Encoder/Decoder
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Encode and decode text, or convert files (images, icons, PDFs) to
            base64 format
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto space-y-8">
          <TextEncoderDecoder />
          <FileConverter />
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-200">
          <p className="text-lg">
            Supported file types: Images (PNG, JPG, GIF, WebP), Icons (ICO,
            SVG), PDFs
          </p>
          <p className="text-sm mt-2 opacity-75">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}
