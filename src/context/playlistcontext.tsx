import { createContext, useContext, useState, ReactNode} from "react";

export type Song = {
    id: number;
    title: string;
    artist: string;
    album: string;
    duration: string;
};

export type Playlist = {
    id: string;
    title: string;
    description: string;
    songs: Song[];
};

type PlaylistContextType = {
    playlists: Playlist[];
    addPlaylist: (p: Omit<Playlist, 'id' | 'songs'>) => void;
    editPlaylist: (id: string, updates: Partial<Omit<Playlist, 'id'>>) => void;
    addSong: (playlistId: string, song: Song) => void;
    deleteSong: (playlistId: string, songId: number) => void;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
  
    const addPlaylist = (playlist: Omit<Playlist, 'id' | 'songs'>) => {
      const newPlaylist: Playlist = {
        ...playlist,
        id: Date.now().toString(),
        songs: [],
      };
      setPlaylists((prev) => [...prev, newPlaylist]);
    };

    const editPlaylist = (id: string, updates: any) => {
        setPlaylists(prev =>
          prev.map(p => (p.id === id ? { ...p, ...updates } : p))
        );
    };

    const addSong = (playlistId: string, song: any) => {
        setPlaylists(prev =>
          prev.map(p =>
            p.id === playlistId ? { ...p, songs: [...p.songs, song] } : p
          )
        );
    };

    const deleteSong = (playlistId: string, songId: number) => {
      setPlaylists(prev =>
        prev.map(p =>
          p.id === playlistId
            ? { ...p, songs: p.songs.filter(song => song.id !== songId) }
            : p
        )
      );
    };

    return (
      <PlaylistContext.Provider value={{ playlists, addPlaylist, editPlaylist, addSong, deleteSong }}>
        {children}
      </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) throw new Error('usePlaylist must be used within PlaylistProvider');
  return context;
};