import Link from "next/link";
import { playlists } from "@/data/example_data";

export default function PlaylistsPage() {
    return (
    <div className="min-h-screen bg-pink-100 text-white p-8">
      <h1 className="text-3xl text-pink-600 font-bold mb-6">Playlists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playlists.map((playlist) => (
          <Link key={playlist.id} href={`/playlists/${playlist.id}`}>
            <div className="p-6 bg-pink-300 rounded-lg shadow-lg cursor-pointer hover:bg-pink-50 transition">
              <h2 className="text-xl font-semibold">{playlist.title}</h2>
              <p className="text-pink-500">{playlist.description}</p>
              <p className="text-pink-400 mt-2">{playlist.songs.length} songs</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    );
}