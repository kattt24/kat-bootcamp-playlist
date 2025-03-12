import Link from "next/link";
import { playlists } from "@/data/example_data";

export default function PlaylistsPage() {
    return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Playlists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playlists.map((playlist) => (
          <Link key={playlist.id} href={`/playlists/${playlist.id}`}>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition">
              <h2 className="text-xl font-semibold">{playlist.title}</h2>
              <p className="text-gray-400">{playlist.description}</p>
              <p className="text-gray-300 mt-2">{playlist.songs.length} songs</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    );
}