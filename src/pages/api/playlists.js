export default function handler(req, res) {
    if (req.method === 'GET') {
      const playlists = [
        {
          id: '1',
          title: 'Study',
          description: 'songs to study to',
          songs: [
            { id: 1, title: 'One Summer Day', artist: 'Joe Hisaishi', album: '', duration: '3:09' },
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