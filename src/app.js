const express = require('express');
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

const app = express();

const MusicasController = require('./controllers/MusicasController')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Visualizar musicas
app.get('', async (req, res) => {
    try {
        const musicasCollection = collection(firestore, 'musicas');
        const musicasSnapshot = await getDocs(musicasCollection);
        const musicas = musicasSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.render('musicas', { musicas });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar músicas' });
    }
});

// API CRUD
app.get("/api/musicas", MusicasController.get)
app.post("/api/musicas", MusicasController.post)
app.put("/api/musicas/:id", MusicasController.put)
app.delete("/api/musicas/:id", MusicasController.delete)

app.listen(3000, () => console.log('Server started on port 3000'));
