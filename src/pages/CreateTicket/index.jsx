import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { db } from "../../services/firabaseConnection";
import { collection, setDoc, getDoc, getDocs, doc } from "firebase/firestore/lite";
import { FiPlus } from "react-icons/fi";
import ReactLoading from "react-loading";
import SideBar from "../../components/SideBar";
import Title from "../../components/Title";
import createTicket from "./createTicket.css";
import { toast } from "react-toastify";

const CreateTicket = () => {
    const [customer, setCustomer] = useState("");
    const [customers, setCustomers] = useState([]);

    const [subject, setSubject] = useState("Suporte");
    const [status, setStatus] = useState("Em aberto");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        loadClientes();
    }, []);

    async function loadClientes() {
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
                setCustomers([{ id: 1, name: "" }]);
                return;
                setLoading(false);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setCustomers([{ id: 1, name: "" }]);
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

    const createNewTicket = async () => {
        if (!customer || !subject || !status || !description) {
            toast.error("Preencha todos os campos!");
            return;
        }
    };

    return (
        <div className="view">
            <SideBar />
            <div className="main">
                <Title name="Novo chamado">
                    <FiPlus size={22} />
                </Title>
                <div className="container">
                    <label htmlFor="client">Cliente:</label>

                    {loading ? (
                        <input type="text" placeholder="Carregando clientes..." />
                    ) : (
                        <select value={customer} onChange={handleChangeCustomer}>
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
                        <button className="save" onClick={createNewTicket}>
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

export default CreateTicket;
