import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { usePlaylist } from '@/context/playlistcontext';
import { Song } from '@/context/playlistcontext';


export default function PlaylistDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { playlists, addSong } = usePlaylist();
  const playlist = playlists.find((p) => p.id === id);

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Song[]>([]);

  useEffect(() => {
    if (!searchTerm) return;
    const delay = setTimeout(() => {
      fetch(`/api/spotify-search?q=${encodeURIComponent(searchTerm)}`)
        .then((res) => res.json())
        .then((data) => setResults(data.results || []))
        .catch((err) => console.error('Search error:', err));
    }, 400);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  if (!playlist) return <div className="text-white p-8">Playlist not found.</div>;

  return (
    <div className="min-h-screen bg-pink-100 text-black p-8">
      <h1 className="text-3xl font-bold">{playlist.title}</h1>
      <p className="text-pink-700 mb-4">{playlist.description}</p>

      <input
        type="text"
        placeholder="Search Spotify..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      {results.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <ul className="space-y-2">
            {results.map((track) => (
              <li key={track.id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
                {track.image && (
                  <img src={track.image} alt={track.title} className="w-12 h-12 rounded" />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{track.title}</p>
                  <p className="text-sm text-gray-600">{track.artist} • {track.album}</p>
                </div>
                <button
                  onClick={() => addSong(playlist.id, { ...track })}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 className="text-2xl font-semibold mt-6 mb-2">Songs</h2>
      <ul>
        {playlist.songs.map((song) => (
          <li key={song.id} className="mb-2">
            <strong>{song.title}</strong> by {song.artist} — <em>{song.album}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}