import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Playlist from '@/models/Playlist';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (typeof id !== 'string') return res.status(400).json({ success: false, message: 'Invalid ID format' });

  try {
    switch (req.method) {
      case 'GET':
        const playlist = await Playlist.findById(id);
        if (!playlist) return res.status(404).json({ success: false, message: 'Playlist not found' });
        return res.status(200).json({ success: true, data: playlist });

      case 'PUT':
        const updated = await Playlist.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updated) return res.status(404).json({ success: false, message: 'Playlist not found' });
        return res.status(200).json({ success: true, data: updated });

      case 'DELETE':
        const deleted = await Playlist.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Playlist not found' });
        return res.status(200).json({ success: true });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error', error: err });
  }
}
