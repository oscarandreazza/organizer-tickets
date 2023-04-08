import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import { db } from "../../services/firabaseConnection";
import { collection, updateDoc, getDocs, getDoc, doc } from "firebase/firestore/lite";
import { FiEdit2 } from "react-icons/fi";
import ReactLoading from "react-loading";
import SideBar from "../../components/SideBar";
import Title from "../../components/Title";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTicket = () => {
    useEffect(() => {
        loadingTicket();
        loadingCustomers();
    }, []);

    const { id } = useParams();
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [completed, setCompleted] = useState("");
    const [customer, setCustomer] = useState("");
    const [subject, setSubject] = useState("Suporte");
    const [status, setStatus] = useState("Em aberto");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    async function loadingTicket() {
        try {
            const collectionRef = collection(db, "tickets");
            const docRef = await getDoc(doc(collectionRef, id));
            const data = docRef.data();

            // setCustomer(data.customer);
            setSubject(data.subject);
            setStatus(data.status);
            setDescription(data.description);
        } catch (err) {
            console.log(err);
        }
    }

    async function loadingCustomers() {
        try {
            const collectionRef = collection(db, "customer");
            const docRef = await getDocs(collectionRef);

            const list = [];

            docRef.forEach(doc => {
                list.push({
                    id: doc.id,
                    name: doc.data().name
                });
            });
            setCustomers(list);

            if (list.length === 0) {
                setLoading(false);
                return;
            }
            setLoading(false);
        } catch (err) {
            console.log(err);

            setLoading(false);
        }
    }

    function handleChangeSubject(e) {
        setSubject(e.target.value);
    }

    function handleChangeStatus(e) {
        setStatus(e.target.value);
    }

    function handleChangeCustomer(e) {
        setCustomer(e.target.value);
    }

    async function handleSave() {
        if (customer === "" || subject === "" || status === "" || description === "") {
            toast.error("Preencha todos os campos");
            return;
        }
        try {
            const collectionRef = collection(db, "tickets");
            const docRef = doc(collectionRef, id);
            await updateDoc(docRef, { customer: customers[customer].name, subject: subject, status: status, description: description });

            toast.success("Chamado editado com sucesso!");
            navigate("/dashboard");
            setLoading(false);
        } catch (err) {
            toast.error("Falha ao salvar");
            setLoading(false);
        }
    }

    return (
        <div className="view">
            <SideBar />
            <div className="main">
                <Title name="Editar chamado">
                    <FiEdit2 size={22} />
                </Title>

                <div className="container">
                    <label htmlFor="client">Cliente:</label>

                    {loading ? (
                        <input type="text" placeholder="Carregando clientes..." />
                    ) : (
                        <select value={customer} onChange={handleChangeCustomer}>
                            <option value="" disabled>
                                Selecione um cliente
                            </option>
                            {customers.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    )}

                    <label htmlFor="subject">Assunto:</label>
                    <select id="subject" value={subject} onChange={handleChangeSubject}>
                        <option value="Suporte">Suporte</option>
                        <option value="Visita Técnica">Visita Técnica</option>
                        <option value="Financeiro">Financeiro</option>
                    </select>

                    <label htmlFor="status">Status:</label>
                    <div className="status-tickets">
                        <span>
                            <input
                                type="radio"
                                id="open"
                                value="Em aberto"
                                checked={status === "Em aberto"}
                                onChange={handleChangeStatus}
                            />
                            <label htmlFor="open">Em aberto</label>
                        </span>

                        <span>
                            <input
                                type="radio"
                                id="inProgress"
                                value="Em andamento"
                                checked={status === "Em andamento"}
                                onChange={handleChangeStatus}
                            />
                            <label htmlFor="inProgress">Em andamento</label>
                        </span>

                        <span>
                            <input
                                type="radio"
                                id="solved"
                                value="Resolvido"
                                checked={status === "Resolvido"}
                                onChange={handleChangeStatus}
                            />
                            <label htmlFor="solved">Resolvido</label>
                        </span>
                    </div>

                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        id="description"
                        className="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows="4"
                        cols="50"
                    />

                    <div className="options">
                        <button className="save" onClick={handleSave}>
                            {!loading ? "Salvar" : <ReactLoading type={"bars"} color={"#ffffff"} height={15} width={15} />}
                        </button>
                        <Link to="/dashboard">
                            <button className="exit">Voltar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTicket;
