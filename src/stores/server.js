import { defineStore } from "pinia";
import { addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import { async } from "@firebase/util";

export const useMockServer = defineStore("counter", {
  state: () => ({
    counter: 0,
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    getBankAccount(auth, db, result) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("email", "==", user.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            const user = doc.data();
            const accountRef = collection(db, "account");
            const aq = query(accountRef, where("owner", "==", doc.id));
            const aqSnapshot = await getDocs(aq);
            aqSnapshot.forEach(async (doc) => {
              const account = {
                no: doc.id,
                user: user,
                account: doc.data(),
              };
              result(null, account); //null check error
              return;
            });
          });
        } else {
          result(true, null); //have error
          return;
        }
      });
    },
    getTransactions(auth, db, result) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("email", "==", user.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (user_data) => {
            const transRef = collection(db, "transaction");
            const user_d = user_data.data();
            let transaction = [];
            const q_from = query(transRef, where("from", "==", user_d.telno));
            const q_from_snap = await getDocs(q_from);
            q_from_snap.forEach(async (doc) => {
              transaction.push({ data: doc.data(), red: true });
            });

            const q_to = query(transRef, where("to", "==", user_d.telno));
            const q_to_snap = await getDocs(q_to);
            q_to_snap.forEach(async (doc) => {
              transaction.push({ data: doc.data(), red: false });
            });

            result(null, transaction);
            return;
          });
        } else {
          result(true, null);
        }
      });
    },
    getNameByNumber(auth, db, tel, result) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("telno", "==", tel));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            result(null, doc.data());
            return;
          });
        } else {
          result(true, null);
        }
      });
    },
    getAmountByRef(auth, db, ref, result) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const billRef = collection(db, "bills");
          const q = query(billRef, where("ref", "==", ref));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            result(null, doc.data());
            return;
          });
        } else {
          result(true, null);
        }
      });
    },
    transferMoney(auth, db, data, result) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          addDoc(collection(db, "transaction"), data);
          const usersRef = collection(db, "users");
          const q_from = query(usersRef, where("telno", "==", data.from));
          const q_from_snap = await getDocs(q_from);
          q_from_snap.forEach(async (docs) => {
            const acc_ref = collection(db, "account");
            const q_acc = query(acc_ref, where("owner", "==", docs.id));
            const q_acc_snap = await getDocs(q_acc);
            q_acc_snap.forEach(async (acc) => {
              const changefromref = doc(db, "account", acc.id);
              updateDoc(changefromref, {
                balance:
                  parseFloat(acc.data().balance) - parseFloat(data.amount),
              });
            });
          });

          const q_to = query(usersRef, where("telno", "==", data.to));
          const q_to_snap = await getDocs(q_to);
          q_to_snap.forEach(async (docs) => {
            const acc_ref = collection(db, "account");
            const q_acc = query(acc_ref, where("owner", "==", docs.id));
            const q_acc_snap = await getDocs(q_acc);
            q_acc_snap.forEach(async (acc) => {
              const changefromref = doc(db, "account", acc.id);
              updateDoc(changefromref, {
                balance:
                  parseFloat(acc.data().balance) + parseFloat(data.amount),
              });
            });
          });

          result(null, true);
        } else {
          result(true, null);
        }
      });
    },
  },
});
