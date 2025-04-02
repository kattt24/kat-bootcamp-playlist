export default function handler(req, res) {
    if (req.method === 'GET') {
      const playlists = [
        {
          id: '1',
          title: 'Hard Summer',
          description: '#getLIT',
          songs: [
            { id: 1, title: 'Dreamin (feat. Daya)', artist: 'Dom Dolla', album: 'Single', duration: '2:51' },
            { id: 2, title: 'Reach Out', artist: 'MALUGI', album: 'Single', duration: '2:18' },
          ],
        },
        {
          id: '2',
          title: 'Mellow',
          description: '',
          songs: [
            { id: 3, title: 'Birch Tree', artist: 'Strawberry Guy', album: 'Taking My Time to Be', duration: '4:40' },
          ],
        },
      ];
      res.status(200).json({ playlists });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }