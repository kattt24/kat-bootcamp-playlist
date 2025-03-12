export type Song = {
    id: string;
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

// helps TypeScript enforce structure when handling playlists and songs