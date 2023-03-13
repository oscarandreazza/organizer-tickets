import { useContext } from "react";
import { UserContext } from "../contexts/user";

const Nome = () => {
    const { nome, setNome } = useContext(UserContext);
    return (
        <>
            <ul>
                <li>{nome} </li>
                <button onClick={() => setNome("contextualizando")}>OI</button>
            </ul>
        </>
    );
};

export default Nome;
