import cron from 'node-cron';
import budgetStatusCron from './budgetStatusCron.js';

const job = cron.schedule('0 * * * *', () => {
  try {
    console.info('🤖 Cron iniciado');
    budgetStatusCron();
  } catch (error) {
    console.error('❌ Falha ao iniciar o cron', error);
  }
});

export const initCrons = () => {
  job.start();
};
