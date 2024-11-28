const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;
const token = process.env.EXPO_NOTIFICATION_TOKEN;

app.use(cors());
app.use(bodyParser.json());
app.post('/sendNewBudgetNotification', async (req, res) => {
  if (!token) {
    return res.status(400).json({ error: 'Token, título e corpo são obrigatórios.' });
  }

  try {
    const response = await axios.post(
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

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('❌ Erro ao enviar notificação:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
  

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta:${PORT}`);
});
