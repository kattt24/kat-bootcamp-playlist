import { useEffect, useState } from 'react';
import PlaylistForm from '@/components/playlistform';
import type { Playlist } from '@/types/playlist';

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Playlist | null>(null);

  // Load playlists from database on mount
  useEffect(() => {
    fetch('/api/playlists')
      .then((res) => res.json())
      .then((data) => setPlaylists(data.data))
      .catch((err) => console.error('Failed to load playlists:', err));
  }, []);

  // Handle create or update
  const handleCreateOrUpdate = async (data: { title: string; description?: string }) => {
    if (editing) {
      // For now, just update local state
      setPlaylists((prev) =>
        prev.map((p) => (p._id === editing._id ? { ...p, ...data } : p))
      );
    } else {
      try {
        const res = await fetch('/api/playlists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        setPlaylists((prev) => [...prev, result.data]);
      } catch (err) {
        console.error('Failed to create playlist:', err);
      }
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-pink-100 p-6">
      <h1 className="text-3xl font-bold mb-4">My Playlists</h1>
      <button
        onClick={() => {
          setShowForm(true);
          setEditing(null);
        }}
        className="mb-4 px-4 py-2 bg-pink-600 text-white rounded"
      >
        + Add Playlist
      </button>

      {showForm && (
        <PlaylistForm
          onSubmit={handleCreateOrUpdate}
          existingPlaylist={editing ? { title: editing.title, description: editing.description } : undefined}
          closeModal={() => setShowForm(false)}
        />
      )}

      <ul>
        {playlists.map((p) => (
          <li key={p._id} className="bg-white text-black p-4 rounded shadow my-2">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p>{p.description}</p>
            {/* If you want to implement Edit later */}
            {/* <button onClick={() => { setShowForm(true); setEditing(p); }} className="text-pink-600 mt-2">Edit</button> */}
            <a href={`/playlists/${p._id}`}>
              <span className="ml-2 text-green-600 cursor-pointer">+ Add Song</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}