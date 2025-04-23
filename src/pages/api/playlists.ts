import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Playlist from '@/models/Playlist';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const playlists = await Playlist.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: playlists });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch playlists' });
      }
      break;

    case 'POST':
      try {
        const playlist = await Playlist.create(req.body);
        res.status(201).json({ success: true, data: playlist });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create playlist' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}