import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <Header />
      <main className="flex flex-col items-center p-6">
      <Link href="/playlists">
          <button className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-50">
            Go to Playlists
          </button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
