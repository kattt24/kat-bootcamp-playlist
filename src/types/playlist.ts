import { Key } from "react";

export type Song = {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
};

export type Playlist = {
    _id: Key | null | undefined;
    id: string;
    title: string;
    description: string;
    songs: Song[];
};

// helps TypeScript enforce structure when handling playlists and songs