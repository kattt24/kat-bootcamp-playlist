import { useState, useEffect } from "react";

type PlaylistFormProps = {
    onSubmit: (data: { title: string; description: string }) => void;
    existingPlaylist?: { title: string; description: string };
    closeModal: () => void;
};
  
export default function PlaylistForm({
onSubmit,
existingPlaylist,
closeModal,
}: PlaylistFormProps) {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');


useEffect(() => {
    if (existingPlaylist) {
    setTitle(existingPlaylist.title);
    setDescription(existingPlaylist.description);
    }
}, [existingPlaylist]);

const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
    closeModal();
};

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white text-black rounded">
        <input
        type="text"
        placeholder="Playlist Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        />
        <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">
        {existingPlaylist ? 'Update' : 'Add'} Playlist
        </button>
        </form>
    );
}