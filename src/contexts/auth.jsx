import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect, createContext } from "react";
import { auth, db } from "../services/firabaseConnection";
import { collection, getDocs, getDoc, setDoc, doc, addDoc, deleteDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import verifyErroCode from "../utils/verifyErroCode";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    // const [snapUser, setSnapUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const authStates = {
        signed: !!user,
        user,
        loading,
        loadingAuth,
        setUser
    };

    const authActions = {
        signIn,
        signUp,
        logout,
        storageUser
    };

    function loadUser() {
        const storageUser = localStorage.getItem("user");
        try {
            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
        } catch (error) {
            console.log(error);
            setUser(null);
        }

        setLoading(false);
    }

    async function signUp(name, email, password) {
        setLoadingAuth(true);
        try {
            const createdUser = await createUserWithEmailAndPassword(auth, email, password);

            const collectionRef = collection(db, "user");
            const docRef = doc(collectionRef, createdUser.user.uid);
            await setDoc(docRef, { name: name, avatarUrl: null });

            let data = {
                uid: createdUser.user.uid,
                name: name,
                email: createdUser.user.email,
                avatarUrl: null
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Conta criada com sucesso. Bem vindo!");
        } catch (err) {
            const errorCode = err.code;
            let response = verifyErroCode(errorCode);
            if (response == null) {
                response = err.message;
            }
            setLoadingAuth(false);
            setUser(null);
            storageUser(null);
            setLoadingAuth(false);
            toast.warn(response);
        }
    }

    async function signIn(email, password) {
        setLoadingAuth(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const docRef = doc(db, "user", response.user.uid);
            let document = await getDoc(docRef);

            let data = {
                uid: response.user.uid,
                name: document.data().name,
                avatarUrl: document.data().avatarUrl,
                email: response.user.email
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem vindo!");
        } catch (err) {
            const errorCode = err.code;
            let response = verifyErroCode(errorCode);

            if (response == null) {
                response = err.message;
            }
            toast.error(response);
            setLoadingAuth(false);
        }
    }

    function storageUser(data) {
        localStorage.setItem("user", JSON.stringify(data));
    }

    async function logout() {
        try {
            await auth.signOut();
            setUser(null);
            storageUser(null);
        } catch (err) {
            console.log(`Falha ao deslogar: ${err}`);
        }
    }
    return <AuthContext.Provider value={{ state: authStates, action: authActions }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
