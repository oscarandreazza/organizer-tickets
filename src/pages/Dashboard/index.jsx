import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Title from "../../components/Title";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import "./dashboard.css";
import { db } from "../../services/firabaseConnection";
import { collection, getDocs, doc, limit, orderBy, query, startAfter, deleteDoc } from "firebase/firestore/lite";
import { FiHome, FiPlus, FiSearch, FiEdit2, FiTrash2, FiAlertTriangle, FiX } from "react-icons/fi";

import { format } from "date-fns";

const Dashboard = () => {
    // const { state } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    const [showModalDetails, setShowModalDetails] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [details, setDetails] = useState({});

    useEffect(() => {
        loadingTickets();
    }, []);

    async function loadingTickets() {
        try {
            let collectionRef = collection(db, "tickets");
            const querySnapshot = query(collectionRef, orderBy("createdAt", "desc"), limit(5));
            const docsRefs = await getDocs(querySnapshot);
            updatestate(docsRefs);

            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
        setLoading(false);
    }

    async function updatestate(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;

        if (!isCollectionEmpty) {
            let list = [];
            snapshot.forEach(doc => {
                list.push({
                    id: doc.id,
                    customer: doc.data().customer,
                    idCustomer: doc.data().idCustomer,
                    description: doc.data().description,
                    status: doc.data().status,
                    subject: doc.data().subject,
                    createdAt: doc.data().createdAt.toDate()
                });
            });
            const lastDoc = snapshot.docs[snapshot.docs.length - 1];
            setTickets(tickets => [...tickets, ...list]);
            setLastDocs(lastDoc);
        } else {
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

    async function handleMore() {
        try {
            let collectionRef = collection(db, "tickets");
            const querySnapshot = query(collectionRef, orderBy("createdAt", "desc"), startAfter(lastDocs), limit(5));
            const docsRefs = await getDocs(querySnapshot);
            docsRefs.forEach(doc => {
                console.log(doc.data());
            });

            updatestate(docsRefs);
        } catch (err) {
            console.log(err);
        }
    }

    function showDetailsModal(item) {
        setShowModalDetails(!showModalDetails);
        setDetails(item);
    }

    function showDeleteModal(item) {
        setShowModalDelete(!showModalDelete);
        setDetails(item);
    }

    async function handleDelete() {
        try {
            let collectionRef = collection(db, "tickets");
            deleteDoc(doc(collectionRef, details.id));
            const newTickets = tickets.filter(item => item.id !== details.id);
            setTickets(newTickets);
            toast.success("Chamado deletado com sucesso!");
            setShowModalDelete(!showModalDelete);
        } catch (err) {
            console.log(err);
            toast.success("Erro ao deletar chamado!");
        }
    }

    function showNewTicket() {
        return (
            <div className="dashboard">
                <h3>Nenhum chamado registrado...</h3>
                <Link className="newTicket" to="/new-ticket">
                    <FiPlus size={25} />
                    Novo chamado
                </Link>
            </div>
        );
    }

    function showAllTickets() {
        return (
            <div className="newCall">
                <div className="ticket-button">
                    <Link className="newTicket" to="/new-ticket">
                        <FiPlus size={25} />
                        Novo chamado
                    </Link>
                </div>
                <div className="table-ticket">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cadastro</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td data-label="Cliente">{item.customer}</td>
                                        <td data-label="Assunto">{item.subject}</td>
                                        <td data-label="Status">
                                            <span
                                                style={{
                                                    backgroundColor:
                                                        item.status === "Resolvido"
                                                            ? "#5CB85C"
                                                            : item.status === "Em andamento"
                                                            ? "#F0AD4E"
                                                            : "#999"
                                                }}
                                                className="status"
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td data-label="Cadastro">{format(item.createdAt, "dd/MM/yyyy ")}</td>
                                        <td data-label="#">
                                            <button
                                                className="action"
                                                style={{ backgroundColor: "#3583F6" }}
                                                onClick={() => showDetailsModal(item)}
                                            >
                                                <FiSearch size={16} />
                                            </button>
                                            <Link to={`/update-ticket/${item.id}`}>
                                                <button className="action" style={{ backgroundColor: "#F6A935" }}>
                                                    <FiEdit2 size={16} />
                                                </button>
                                            </Link>
                                            <button
                                                className="action"
                                                style={{ backgroundColor: "#d32525" }}
                                                onClick={() => showDeleteModal(item)}
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {loadingMore && <h3 style={{ textAlign: "center", marginTop: 15 }}>Carregando mais chamados...</h3>}
                    {!isEmpty && (
                        <button className="more" onClick={handleMore}>
                            Ver mais
                        </button>
                    )}
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="view">
                <SideBar />
                <div className="main">
                    <Title name="dashboard">
                        <FiHome size={22} />
                    </Title>
                    <span>Carregando chamados...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="view">
            <SideBar />
            <div className="main">
                <Title name="dashboard">
                    <FiHome size={22} />
                </Title>
                {tickets.length === 0 ? showNewTicket() : showAllTickets()}
                {showModalDetails && (
                    <Modal showModal={setShowModalDetails} heigth={450} width={700}>
                        <div className="details-modal">
                            <div className="close">
                                <FiX size={25} color="#000" onClick={() => setShowModalDetails(false)} style={{ cursor: "pointer" }} />
                            </div>
                            <div className="row">
                                <p>
                                    Cliente: <span> {details.customer}</span>
                                </p>
                            </div>
                            <div className="row">
                                <p>
                                    Assunto: <span className="details-subject">{details.subject}</span> Cadastrado em:{" "}
                                    <span>{format(details.createdAt, "dd/MM/yyyy HH:mm")}</span>
                                </p>
                            </div>

                            <div className="row">
                                <p>
                                    Status:{" "}
                                    <span
                                        className="status-span"
                                        style={{
                                            padding: 4,
                                            borderRadius: 6,
                                            color: "#FFF",
                                            backgroundColor:
                                                details.status === "Resolvido"
                                                    ? "#5CB85C"
                                                    : details.status === "Em andamento"
                                                    ? "#F0AD4E"
                                                    : "#999"
                                        }}
                                    >
                                        {details.status}
                                    </span>
                                </p>
                            </div>
                            <div className="row">
                                <p>Detalhes:</p>
                                <div className="details-box"> {details.description}</div>
                            </div>
                        </div>
                    </Modal>
                )}
                {showModalDelete && (
                    <Modal showModal={setShowModalDelete} heigth={200} width={300}>
                        <div className="delete-modal">
                            <FiAlertTriangle size={45} color="#E02041" />
                            <h3>Tem certeza que deseja excluir esse chamado?</h3>
                            <div className="buttons">
                                <button className="delete-confirm" onClick={handleDelete}>
                                    Confirmar
                                </button>
                                <button className="delete-cancel" onClick={() => setShowModalDelete(false)}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
