import axios from 'axios';

export default async function pushNotification(token, res) {
  if (!token) {
    return res.status(400).json({ error: 'Token, título e corpo são obrigatórios.' });
  }

  return await axios.post(
    'https://exp.host/--/api/v2/push/send',
    {
      to: token,
      title: 'Você tem um novo orçamento!',
      body: 'Clique para saber mais.',
      sound: 'default',
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
