import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Playlist from '@/models/Playlist';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;
  const { spotifyId } = req.body;

  if (req.method !== 'PATCH') return res.status(405).end('Method Not Allowed');

  try {
    const playlist = await Playlist.findByIdAndUpdate(
      id,
      { $pull: { songs: { spotifyId } } },
      { new: true }
    );
    if (!playlist) return res.status(404).json({ success: false, message: 'Playlist not found' });

    return res.status(200).json({ success: true, data: playlist });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}
