import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.q;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid search query' });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Spotify credentials are not set' });
  }

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    // Step 1: Get Spotify Access Token
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authString}`,
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('Failed to obtain access token');
    }

    // Step 2: Perform Search
    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const searchData = await searchRes.json();

    const results = searchData.tracks?.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      duration: `${Math.floor(track.duration_ms / 60000)}:${Math.floor((track.duration_ms % 60000) / 1000)
        .toString()
        .padStart(2, '0')}`,
      image: track.album.images?.[0]?.url,
    })) || [];

    return res.status(200).json({ results });
  } catch (err) {
    console.error('Spotify API error:', err);
    return res.status(500).json({ error: 'Something went wrong with the Spotify API' });
  }
}