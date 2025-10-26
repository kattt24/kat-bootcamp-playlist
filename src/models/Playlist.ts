// models/Playlist.ts
import mongoose, { Schema, Document, models, Model } from 'mongoose';

// 1. Define an interface
export interface IPlaylist extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  songs: {
    name: string;
    artist: string;
    spotifyId: string;
  }[];
}

// 2. Define the schema
const PlaylistSchema: Schema = new Schema(
  {
    name: { type: String, required: [true, 'Playlist name is required'], minlength: 1 },
    description: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    songs: [
      {
        name: { type: String, required: true },
        artist: { type: String, required: true },
        spotifyId: { type: String, required: true },
      },
    ],
  },
  {
    collection: 'playlists',
  }
);

// 3. Create the model
const Playlist: Model<IPlaylist> =
  models.Playlist || mongoose.model<IPlaylist>('Playlist', PlaylistSchema);

export default Playlist;
