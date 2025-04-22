export default async function handler(req: { query: { q: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; results?: any; }): void; new(): any; }; }; }) {
    const query = req.query.q;
  
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid search query' });
    }
  
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
    try {
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${authString}`,
        },
        body: 'grant_type=client_credentials',
      });
  
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
  
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const searchData = await searchResponse.json();
      const results = searchData.tracks?.items.map((track: { id: any; name: any; artists: any[]; album: { name: any; images: { url: any; }[]; }; duration_ms: number; }) => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map((a) => a.name).join(', '),
        album: track.album.name,
        duration: `${Math.floor(track.duration_ms / 60000)}:${Math.floor((track.duration_ms % 60000) / 1000).toString().padStart(2, '0')}`,
        image: track.album.images?.[0]?.url,
      })) || [];
  
      res.status(200).json({ results });
    } catch (error) {
      console.error('Spotify search error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  