import { useState, createContext } from "react";
// import { auth, dataBase } from "../services/firabaseConnection";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(false);

    return <AuthContext.Provider value={{ signed: !!user, loading }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
