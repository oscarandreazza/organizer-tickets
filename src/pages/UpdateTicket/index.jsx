import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../services/firabaseConnection";
import { collection, setDoc, doc } from "firebase/firestore/lite";
import { FiEdit2 } from "react-icons/fi";
import ReactLoading from "react-loading";
import SideBar from "../../components/SideBar";
import Title from "../../components/Title";

const UpdateTicket = () => {
    const [newClient, setNewClient] = useState("");
    const [subject, setSubject] = useState("");
    const [status, setStatus] = useState("");
    const [completed, setCompleted] = useState("");

    return (
        <div className="view">
            <SideBar />
            <div className="main">
                <Title name="Editar chamado">
                    <FiEdit2 size={22} />
                </Title>
            </div>
        </div>
    );
};

export default UpdateTicket;
