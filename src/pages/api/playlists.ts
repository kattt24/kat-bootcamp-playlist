import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Playlist from '@/models/Playlist';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Connect to the database

  switch (req.method) {
    case 'GET':
      try {
        const playlists = await Playlist.find({}).sort({ createdAt: -1 });
    
        // Convert each playlist to plain object (so songs field is usable in frontend)
        const plainPlaylists = playlists.map((p) => p.toObject());
    
        return res.status(200).json({ success: true, data: plainPlaylists });
      } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch playlists', error });
      }

    case 'POST':
      try {
        const { name, description } = req.body;
        if (!name) {
          return res.status(400).json({ success: false, message: 'Playlist name is required' });
        }

        const newPlaylist = await Playlist.create({ name, description });
        return res.status(201).json({ success: true, data: newPlaylist });
      } catch (error) {
        return res.status(400).json({ success: false, message: 'Failed to create playlist', error });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}