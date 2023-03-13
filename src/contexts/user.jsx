import {useState, createContext} from "react";

export const UserContext = createContext({});

function UserProvider({children}) {
    const [nome, setNome] = useState("Oscar");
    const [qtd, setQtd] = useState(22);

    return <UserContext.Provider value={{nome, setNome, qtd}}>{children}</UserContext.Provider>;
}


export default UserProvider;
