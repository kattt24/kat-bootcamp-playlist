import Link from "next/link";

export default function Header() {
    return (
    <header className="bg-pink-300 text-white py-4 px-6 flex justify-between items-center w-full fixed top-0 left-0">
    <h1 className="text-xl font-bold text-white">Playlist Creator</h1>
    <div className="flex space-x-6">
        <Link href="/">
          <p className="hover:text-gray-400 cursor-pointer">Home</p>
        </Link>
        <Link href="/playlists">
          <p className="hover:text-gray-400 cursor-pointer">Playlists</p>
        </Link>
    </div>
    </header>
    );
}