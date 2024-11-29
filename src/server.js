import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase/firebaseConfig.js';
import { getFirestore } from "firebase/firestore";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { initCrons } from './jobs/index.js';
import pushNotification from './notifications/pushNotification.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const token = process.env.EXPO_NOTIFICATION_TOKEN;

// Inicializa os crons e o Firebase
initCrons();
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp)

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rota para envio de notificações
app.post('/sendNewBudgetNotification', async (req, res) => {
  try {
    await pushNotification(token).then((response) => {
      res.status(200).json({ success: true, data: response.data });
    });
  } catch (error) {
    console.error('❌ Erro ao enviar notificação:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.info(`Servidor rodando na porta: ${PORT}`);
});
