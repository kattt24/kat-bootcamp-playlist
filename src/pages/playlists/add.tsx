import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AddSongPage() {
  const router = useRouter();
  const { id: playlistId } = router.query;

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'no_results'>('idle');

  // Debounce the input to reduce API calls
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch Spotify search results
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchSongs = async () => {
        setStatus('loading');
        try {
          const res = await fetch(`/api/spotify-search?q=${debouncedQuery}`);
          const data = await res.json();
      
          if (!data.results || data.results.length === 0) {
            setResults([]);
            setStatus('no_results');
          } else {
            setResults(data.results);
            setStatus('success');
          }
        } catch (err) {
          console.error('Failed to fetch Spotify results:', err);
          setResults([]);
          setStatus('error');
        }
      };
      

    fetchSongs();
  }, [debouncedQuery]);

  const handleAdd = async (song: any) => {
    if (!playlistId || typeof playlistId !== 'string') {
      console.error('Missing or invalid playlistId:', playlistId);
      return;
    }

    const payload = {
      playlistId,
      name: song.title,
      artist: song.artist,
      spotifyId: song.id,
    };

    console.log('Sending to /api/playlists/songs:', payload);

    const res = await fetch('/api/playlists/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log('Response:', data);

    if (data.success) {
      router.push('/playlists');
    } else {
      console.error('Failed to add song:', data);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Search Spotify</h1>
      <input
        placeholder="Search Spotify..."
        className="w-full p-2 border rounded mb-6"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
        {status === 'loading' && <p className="text-gray-500">Loading...</p>}
        {status === 'error' && (
        <p className="text-red-500">Failed to load results. Please try again.</p>
        )}
        {status === 'no_results' && (
        <p className="text-yellow-600">No tracks found matching your search.</p>
        )}

      <ul className="space-y-3">
        {results.map((song) => (
          <li
            key={song.id}
            className="flex items-center justify-between bg-pink-100 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              {song.image && (
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-16 h-16 rounded object-cover"
                />
              )}
              <div>
                <p className="font-bold">{song.title}</p>
                <p className="text-sm text-gray-600">{song.artist}</p>
              </div>
            </div>
            <button
              onClick={() => handleAdd(song)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded text-lg"
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}