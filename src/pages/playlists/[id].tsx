// src/pages/playlists/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Playlist {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export default function PlaylistDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      console.log('Fetching playlist with ID:', id);

      fetch(`/api/playlists/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`API responded with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPlaylist(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load playlist:', err);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <p className="p-6">Loading playlist...</p>;
  if (!playlist) return <p className="p-6 text-red-600">Playlist not found</p>;

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold mb-2">{playlist.name}</h1>
      {playlist.description && <p className="mb-4">{playlist.description}</p>}
      <p className="italic text-sm text-gray-500">Created at: {new Date(playlist.createdAt).toLocaleString()}</p>

      {/* Optional: Add song form or song list goes here */}
    </div>
  );
}
