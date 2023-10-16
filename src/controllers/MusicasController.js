const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');
const { collection, doc, addDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');
var firebaseConfig = {
    apiKey: "AIzaSyAwEFtOps6veZZgRbGNYIQZZbYbUPqHF0s",
    authDomain: "autenticacao-a7829.firebaseapp.com",
    projectId: "autenticacao-a7829",
    storageBucket: "autenticacao-a7829.appspot.com",
    messagingSenderId: "988654622937",
    appId: "1:988654622937:web:c7837a7bdd63e2aa9646c8"
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

module.exports = {

    // Obter musicas
    get: async (req, res) => {
        try {
            const musicasCollection = collection(firestore, 'musicas');
            const musicasSnapshot = await getDocs(musicasCollection);
            const musicas = musicasSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            res.json(musicas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar músicas' });
        }
    },

    // Adicionar nova musica
    post: async (req, res) => {
        try {
            const { musica, artista, estilo } = req.body;
            const musicasCollection = collection(firestore, 'musicas');
            const newDoc = await addDoc(musicasCollection, { musica, artista, estilo });
            res.json({ id: newDoc.id, musica, artista, estilo });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar música' });
        }
    },

    // Atualizar musicas
    put: async (req, res) => {
        try {
            const { musica, artista, estilo } = req.body;
            const musicasCollection = collection(firestore, 'musicas');
            const musicasRef = doc(musicasCollection, req.params.id);
            await updateDoc(musicasRef, { musica, artista, estilo });
            res.json({ id: req.params.id, musica, artista, estilo });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar música' });
        }
    },

    // Deletar musica
    delete: async (req, res) => {
        try {
            const musicasCollection = collection(firestore, 'musicas');
            const musicasRef = doc(musicasCollection, req.params.id);
            await deleteDoc(musicasRef);
            res.json({ message: 'Música excluída com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir música' });
        }
    },

}