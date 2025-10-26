import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Playlist from '@/models/Playlist';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    const { playlistId, name, artist, spotifyId } = req.body;

    try {
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ success: false, message: 'Playlist not found' });
      }

      // 👇 This must match the schema field
      playlist.songs.push({ name, artist, spotifyId });
      await playlist.save();

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to add song:', error);
      return res.status(500).json({ success: false, error: 'Failed to add song' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
