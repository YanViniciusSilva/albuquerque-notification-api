import { collection, getDocs, updateDoc, where, query, doc } from 'firebase/firestore';
import { db } from '../server.js';
import dayjs from 'dayjs';

async function updateBudgetStatusToExpired(id) {
  try {
    if (!id) {
        console.error("❌ Erro: ID do documento está indefinido.");
        return;
      }

    const docRef = doc(db, "budgets", id);

    if (docRef) {
      await updateDoc(docRef, { status: "expired" }).then(() => {
        return true;
      });
    }
  } catch (error) {
    console.error('❌ Falha ao atualizar o status do orçamento', error);
    return false;
  }
}

export default async function budgetStatusCron() {
  try {
    const docsRef = collection(db, "budgets");
    const q = query(docsRef, where("status", "==", "pending"));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach(
      (doc) => {
        if (dayjs(new Date()).diff(dayjs(doc.data().dateCreated), 'hour') >= 24) {
          updateBudgetStatusToExpired(doc.id).then((response) => {
            if (response) {
              console.info("✅ Status do orçamento atualizado com sucesso.");
            }
          });
        }
      }
    );
  } catch (error) {
    console.error('❌ Falha ao buscar orçamentos', error);
  }
}