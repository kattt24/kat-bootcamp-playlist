import { usePlaylist } from '@/context/playlistcontext';
import { useState } from 'react';
import PlaylistForm from '@/components/playlistform';
import type { Playlist } from '@/context/playlistcontext';

export default function PlaylistsPage() {
  const { playlists, addPlaylist, editPlaylist, addSong, deleteSong } = usePlaylist();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Playlist | null>(null);

  return (
    <div className="min-h-screen bg-pink-100 p-6">
      <h1 className="text-3xl font-bold mb-4">My Playlists</h1>
      <button onClick={() => { setShowForm(true); setEditing(null); }} className="mb-4 px-4 py-2 bg-pink-600 text-white rounded">
        + Add Playlist
      </button>

      {showForm && (
        <PlaylistForm
          onSubmit={(data) => {
            editing ? editPlaylist(editing.id, data) : addPlaylist(data);
          }}
          existingPlaylist={
            editing
              ? { title: editing.title, description: editing.description }
              : undefined
          }
          closeModal={() => setShowForm(false)}
        />
      )}

      <ul>
        {playlists.map(p => (
          <li key={p.id} className="bg-white text-black p-4 rounded shadow my-2">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p>{p.description}</p>
            <button onClick={() => { setShowForm(true); setEditing(p); }} className="text-pink-600 mt-2">Edit</button>
            <button onClick={() => addSong(p.id, { id: Date.now(), title: 'New Song', artist: 'Unknown', album: 'N/A', duration: '3:00' })} className="ml-2 text-green-600">+ Add Song</button>
            <ul className="mt-2">
              {p.songs.map(song => (
                <li key={song.id} className="flex justify-between items-center">
                  {song.title} by {song.artist}
                  <button onClick={() => deleteSong(p.id, song.id)} className="text-red-500">🗑️</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
