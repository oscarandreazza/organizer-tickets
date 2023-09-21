import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Title from "../../components/Title";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import "./dashboard.css";
import { FiHome, FiPlus, FiSearch, FiEdit2, FiTrash2, FiAlertTriangle, FiX } from "react-icons/fi";
import avatarDefault from "../../assets/avatar.png";
import axios from "axios";
import { format } from "date-fns";

const API_URL = "http://localhost:8989";

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const [showModalDetails, setShowModalDetails] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [details, setDetails] = useState({});
    const { state } = useContext(AuthContext);

    useEffect(() => {
        loadingTickets();
    }, [state.user]);

    async function loadingTickets(id = state.user.user_id, access_token = state.user.access_token) {
        setLoading(true);
        try {
            let data = await axios.get(`${API_URL}/api/ticket?user_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            setTickets(data.data.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
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

    async function handleDelete(id, access_token = state.user.access_token) {
        try {
            await axios.delete(`${API_URL}/api/ticket/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            toast.success("Chamado deletado com sucesso!");
        } catch (err) {
            toast.error("Falha ao deletar chamado!");
        } finally {
            setShowModalDelete(false);
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
                                        <td data-label="Cliente">{item.customer_name}</td>
                                        <td data-label="Assunto">{item.subject}</td>
                                        <td data-label="Status">
                                            <span
                                                style={{
                                                    backgroundColor:
                                                        item.status === "resolved"
                                                            ? "#5CB85C"
                                                            : item.status === "inProgress"
                                                            ? "#F0AD4E"
                                                            : "#999"
                                                }}
                                                className="status"
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td data-label="Cadastro">{format(new Date(item.created_at), "dd/MM/yyyy HH:mm:ss")}</td>
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
                                    Cliente: <span> {details.customer_name}</span>
                                </p>
                            </div>
                            <div className="row">
                                <p>
                                    Assunto: <span className="details-subject">{details.subject}</span> Cadastrado em:{" "}
                                    <span>{format(new Date(details.created_at), "dd/MM/yyyy HH:mm:ss")}</span>
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
                                                details.status === "resolved"
                                                    ? "#5CB85C"
                                                    : details.status === "inProgress"
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
                                <div className="details-box"> {details.details}</div>
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
                                <button className="delete-confirm" onClick={() => handleDelete(details.id)}>
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
