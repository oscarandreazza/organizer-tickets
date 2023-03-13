import { useContext } from "react";
import { UserContext } from "../contexts/user";
import Nome from "../Nome";

const Alunos = () => {
    const { nome, qtd } = useContext(UserContext);
    return (
        <div>
            <h3> Alunos da turma: {qtd}</h3>
            <Nome />
        </div>
    );
};

export default Alunos;
