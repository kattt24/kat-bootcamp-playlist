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
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen"
      style = {{ 
        backgroundImage: "url('pink-gradient.jpg')", 
        backgroundSize: "cover"
      }}
    >
      {/* Step 2: Bubble Animation Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const pinkShades = ["bg-pink-100", "bg-pink-200", "bg-pink-300", "bg-pink-400"];
          const randomShade = pinkShades[Math.floor(Math.random() * pinkShades.length)];

          const size = 60 + Math.random() * 80; // Random size: 60px – 140px
          const opacity = 0.2 + Math.random() * 0.15; // Opacity between 0.2 and 0.35

          return (
            <div
              key={i}
              className={`absolute rounded-full ${randomShade} animate-float`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                transform: "translateX(-50%)", // Center the circle
                bottom: `-${Math.random() * 100}px`,
                opacity: opacity,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 10}s`,
              }}
            />
          );
        })}
      </div>

      {/* flex-col --> this made them in the center like a column(on top of each other),
       mt-4*/}

      {/* Step 3: Main Content */}
      <Header />
        <main className="flex items-center p-6 z-10 justify-between w-full px-12 py-24">
          {/* Left: Welcome Text + Button */}
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col items-center text-center space-y-4 py-12">
              <h1 className="text-7xl font-bold text-pink-600">Welcome</h1>
              <p className="text-lg text-pink-800">here are a couple of my playlists</p>
              <p className="text-lg text-pink-800">it's a mix of everything</p>
              <Link href="/playlists">
                <button className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-50">
                  Go to Playlists
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Pink rectangle */}
          <div className="flex-1 flex justify-end pr-20 relative">
            <div className="w-120 h-[34rem] bg-pink-200 rounded-xl shadow-md z-10">
              <img
                src="/snoopy-music.png"
                alt="Snoopy"
                className="absolute bottom-9 right-28 z-20 transform scale-114"
              />
            </div>
          </div>

        </main>
      <Footer />
    </div>
  );
}
