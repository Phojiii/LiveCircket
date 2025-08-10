import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src="/live-cricket-logo.webp" alt="Logo" className="h-20" />
        </div>
        <form className="flex gap-2">
          <input
            type="email"
            placeholder="Subscribe to newsletter"
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800 transition"
          >
            Subscribe
          </button>
        </form>
        <div className="flex gap-4 text-blue-700 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 pb-4">
        &copy; {new Date().getFullYear()} LiveCricket. All rights reserved.
      </div>
    </footer>
  );
}