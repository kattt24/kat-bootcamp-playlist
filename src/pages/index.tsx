import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center p-6">
        <h2 className="text-xl font-semibold mb-4">Hello World!</h2>
        <p>Welcome to my app. This is a placeholder for future content.</p>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Go to Playlists
        </button>
      </main>
      <Footer />
    </div>
  );
}
