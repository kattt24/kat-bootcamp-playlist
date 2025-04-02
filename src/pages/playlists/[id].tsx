import { useRouter } from "next/router";
import { playlists } from "@/data/example_data";

export default function PlaylistDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const playlist = playlists.find((p) => p.id === id);

    if (!playlist) {
        return <div className="text-white p-8">Playlist not found.</div>;
    }

    return (
    <div className="min-h-screen bg-pink-300 text-white p-8">
      <h1 className="text-3xl font-bold">{playlist.title}</h1>
      <p className="text-pink-200">{playlist.description}</p>

      <h2 className="text-2xl font-semibold mt-6">Songs</h2>
      <ul className="mt-4">
        {playlist.songs.map((song) => (
          <li key={song.id} className="p-4 bg-pink-500 rounded-lg shadow-md my-2">
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p className="text-pink-400">
              {song.artist} - {song.album} <span className="text-white">({song.duration})</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
    );
}