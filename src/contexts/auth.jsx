import { useState, useEffect, createContext, useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
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
            setUser(null);
        }

        setLoading(false);
    }

    async function signUp(name, email, password) {
        setLoadingAuth(true);
        const newUser = {
            name: name,
            email: email,
            password: password,
            device_name: navigator.userAgent
        };

        try {
            const user = await axios.post("http://localhost:8989/api/register", newUser);
            const data = user.data;
            toast.success("Conta criada com sucesso. Bem vindo!");
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
        } catch (err) {
            setLoadingAuth(false);
            setUser(null);
            storageUser(null);
            toast.warn(err.response.data.message);
        }
    }

    function storageUser(data) {
        localStorage.setItem("user", JSON.stringify(data));
    }

    async function logout() {
        try {
            setUser(null);
            storageUser(null);
        } catch (err) {
            console.log(`Falha ao deslogar: ${err}`);
        }
    }

    return (
        <AuthContext.Provider value={useMemo(() => ({ state: authStates, action: authActions }), [authStates, authActions])}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
