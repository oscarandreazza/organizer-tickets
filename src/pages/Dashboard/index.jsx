import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import "./dashboard.css";
import { FiHome, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import Title from "../../components/Title";

const Dashboard = () => {
    // const { state } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);

    function showTickets() {
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

    function showNewCall() {
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
                                <th scope="col">Código</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cadastro</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Código">0001</td>
                                <td data-label="Cliente">João da Silva</td>
                                <td data-babel="Assunto">Dúvida</td>
                                <td data-label="Status">
                                    <span style={{ backgroundColor: "#5CB85C" }} className="status">
                                        Em Andamento
                                    </span>
                                </td>
                                <td data-label="Cadastro">01/01/2021</td>
                                <td data-label="#">
                                    <button className="action" style={{ backgroundColor: "#3583F6" }}>
                                        <FiSearch size={16} />
                                    </button>
                                    <Link to="/update-ticket">
                                        <button className="action" style={{ backgroundColor: "#F6A935" }}>
                                            <FiEdit2 size={16} />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                {tickets.length === 0 ? showTickets() : showNewCall()}
            </div>
        </div>
    );
};

export default Dashboard;
