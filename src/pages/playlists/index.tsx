import { useEffect, useState } from 'react';
import PlaylistForm from '@/components/playlistform';
import type { Playlist } from '@/types/playlist';
import Link from 'next/link'; // Make sure this is at the top

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Playlist | null>(null);

  useEffect(() => {
    fetch('/api/playlists')
      .then((res) => res.json())
      .then((data) => setPlaylists(data.data))
      .catch((err) => console.error('Failed to load playlists:', err));
  }, []);

  const handleCreateOrUpdate = async (data: { title: string; description?: string }) => {
    if (editing) {
      try {
        const res = await fetch(`/api/playlists/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: data.title, description: data.description }),
        });

        const result = await res.json();
        if (result.success && result.data) {
          setPlaylists((prev) =>
            prev.map((p) => (p._id === editing._id ? result.data : p))
          );
        }
      } catch (err) {
        console.error('Failed to update playlist:', err);
      }
    } else {
      try {
        const res = await fetch('/api/playlists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: data.title, description: data.description }),
        });

        const result = await res.json();
        if (result.success && result.data) {
          setPlaylists((prev) => [...prev, result.data]);
        }
      } catch (err) {
        console.error('Failed to create playlist:', err);
      }
    }

    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (playlist: Playlist) => {
    setEditing(playlist);
    setShowForm(true);
  };

  const handleDelete = async (playlistId: string) => {
    const confirmed = confirm('Are you sure you want to delete this playlist?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPlaylists((prev) => prev.filter((p) => p._id !== playlistId));
      } else {
        const errData = await res.json();
        alert('Delete failed: ' + errData.message);
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
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
          existingPlaylist={editing ? { title: editing.name, description: editing.description || '' } : undefined}
          closeModal={() => setShowForm(false)}
        />
      )}

      <ul>
        {playlists.map((p) => (
          <li key={p._id} className="bg-white text-black p-4 rounded shadow my-2">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{p.name}</h2>
                <p>{p.description}</p>
                <p className="text-sm text-gray-600">{p.songs?.length || 0} songs</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-3 py-1 text-white bg-blue-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => p._id && handleDelete(p._id)}
                  className="px-3 py-1 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            <Link href={`/playlists/add?id=${p._id}`}>
              <button className="ml-2 text-green-600 cursor-pointer">+ Add Song</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}