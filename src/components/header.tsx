export default function Header() {
    return (
        <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-lg font-bold text-green-400">Playlist Creator</h1>
      <div className="flex space-x-6">
        <p className="hover:text-gray-400 cursor-pointer">Home</p>
        <p className="hover:text-gray-400 cursor-pointer">Playlists</p>
      </div>
    </header>
    );
}