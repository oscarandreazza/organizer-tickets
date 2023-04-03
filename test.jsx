import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect, createContext } from "react";
import { auth, db } from "../services/firabaseConnection";
import { collection, getDocs, getDoc, setDoc, doc, addDoc, deleteDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import verifyErroCode from "../utils/verifyErroCode";

export const AuthContext = createContext({});

class AuthProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loadingAuth: false,
            loading: true
        };
        this.authActions = {
            signIn: this.signIn.bind(this),
            signUp: this.signUp.bind(this),
            logout: this.logout.bind(this),
            storageUser: this.storageUser.bind(this)
        };
    }

    componentDidMount() {
        this.loadUser();
    }

    authStates() {
        return {
            signed: !!this.state.user,
            user: this.state.user,
            loading: this.state.loading,
            loadingAuth: this.state.loadingAuth,
            setUser: user => this.setState({ user })
        };
    }

    async signUp(name, email, password) {
        this.setState({ loadingAuth: true });
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

            this.setState({ user: data });
            this.storageUser(data);
            this.setState({ loadingAuth: false });
            toast.success("Conta criada com sucesso. Bem vindo!");
        } catch (err) {
            const errorCode = err.code;
            let response = verifyErroCode(errorCode);
            if (response == null) {
                response = err.message;
            }
            this.setState({ user: null });
            this.storageUser(null);
            this.setState({ loadingAuth: false });
            toast.warn(response);
        }
    }

    async signIn(email, password) {
        this.setState({ loadingAuth: true });
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

            this.setState({ user: data });
            this.storageUser(data);
            this.setState({ loadingAuth: false });
            toast.success("Bem vindo!");
        } catch (err) {
            const errorCode = err.code;
            let response = verifyErroCode(errorCode);

            if (response == null) {
                response = err.message;
            }
            toast.error(response);
            this.setState({ loadingAuth: false });
        }
    }

    storageUser(data) {
        localStorage.setItem("user", JSON.stringify(data));
    }

    async logout() {
        try {
            await auth.signOut();
            this.setState({ user: null });
            this.storageUser(null);
        } catch (err) {
            console.log(`Falha ao deslogar: ${err}`);
        }
    }

    async loadUser() {
        const storageUser = localStorage.getItem("user");
        try {
            if (storageUser) {
                this.setState({ user: JSON.parse(storageUser) });
            }
        } catch (error) {
            console.log(error);
            this.setState({ user: null });
        }

        this.setState({ loading: false });
    }

    render() {
        const authStates = this.authStates();
        return <AuthContext.Provider value={{ state: authStates, action: this.authActions }}>{this.props.children}</AuthContext.Provider>;
    }
}

export default AuthProvider;
