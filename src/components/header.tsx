export default function Header() {
    return (
    <header className="bg-yellow-100 text-pink-400 py-4 px-6 flex justify-between items-center w-full fixed top-0 left-0">
    <h1 className="text-lg font-bold text-pink-600">Playlist Creator</h1>
    <div className="flex space-x-6">
        <p className="hover:text-gray-400 cursor-pointer">Home</p>
        <p className="hover:text-gray-400 cursor-pointer">Playlists</p>
    </div>
    </header>
    );
}