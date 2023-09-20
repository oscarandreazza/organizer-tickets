import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../services/firabaseConnection";
import { collection, setDoc, getDocs, doc } from "firebase/firestore/lite";
import { FiPlus } from "react-icons/fi";
import { AuthContext } from "../../contexts/auth";
import ReactLoading from "react-loading";
import SideBar from "../../components/SideBar";
import Title from "../../components/Title";
import { toast } from "react-toastify";

const CreateTicket = () => {
    const { state } = useContext(AuthContext);

    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const [customer, setCustomer] = useState("");
    const [subject, setSubject] = useState("Suporte");
    const [status, setStatus] = useState("Em aberto");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        setLoading(true);
        loadClientes();
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            const collectionRef = collection(db, "user");
            const docRef = await getDocs(collectionRef);

            const list = [];

            docRef.forEach(doc => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    avatarUrl: doc.data().avatarUrl
                });
            });

            setUsers(list);

            if (list.length === 0) {
                setCustomers([{ id: 1, name: "" }]);
                setUsers(false);
                return;
            }
            setLoading(false);
        } catch (err) {
            setUsers([{ id: 1, name: "" }]);
            setLoading(false);
            throw new Error(err);
        }
    }

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
                setLoading(false);
                return;
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

    function handleChangeUsers(e) {
        setUser(e.target.value);
    }

    const createNewTicket = async () => {
        setLoading(true);
        if ((!user, !customer || !subject || !status || !description)) {
            toast.error("Preencha todos os campos!");
            setLoading(false);
            return;
        }
        try {
            const collectionRef = collection(db, "tickets");
            const docRef = doc(collectionRef);
            await setDoc(docRef, {
                owner: users[user].name,
                ownerAvatar: users[user].avatarUrl,
                subject: subject,
                status: status,
                customer: customers[customer].name,
                description: description,
                createdAt: new Date(),
                idCustomer: customers[customer].id,
                userId: state.user.uid
            });
            toast.success("Chamado criado com sucesso!");
            setCustomer("");
            setSubject("Suporte");
            setStatus("Em aberto");
            setDescription("");
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
            toast.error("Falha ao criar chamado, tente novamente!");
        }
        setLoading(false);
    };

    return (
        <div className="view">
            <SideBar />
            <div className="main">
                <Title name="Novo chamado">
                    <FiPlus size={22} />
                </Title>
                <div className="container">
                    <label htmlFor="client">Responsavel:</label>

                    {loading ? (
                        <input type="text" placeholder="Carregando responsaveis..." />
                    ) : (
                        <select value={user} onChange={handleChangeUsers}>
                            <option value="" disabled>
                                Selecione um responsavel
                            </option>
                            {users.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    )}

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
