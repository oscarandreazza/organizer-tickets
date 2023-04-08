import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import SideBar from "../../components/SideBar";
import { FiUsers } from "react-icons/fi";
import Title from "../../components/Title";
import { db } from "../../services/firabaseConnection";
import { collection, setDoc, getDocs, doc, deleteDoc } from "firebase/firestore/lite";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
import Modal from "../../components/Modal";
import InputMask from "react-input-mask";

import "./customers.css";

const Customers = () => {
    useEffect(() => {
        loadCustomers();
    }, []);

    async function loadCustomers() {
        const collectionRef = collection(db, "customer");
        const snapshot = await getDocs(collectionRef);
        let list = [];
        snapshot.forEach(doc => {
            list.push({
                id: doc.id,
                name: doc.data().name,
                document: doc.data().document,
                address: doc.data().address
            });
            setCustomers(list);
        });
    }

    const [loading, setLoading] = useState(false);
    const [nameCustomer, setNameCustomer] = useState("");
    const [documentCustomer, setDocumentCustomer] = useState("");
    const [addressCustomer, setAddressCustomer] = useState("");
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [details, setDetails] = useState({});

    function openModal(customer) {
        setShowModal(!showModal);
        setDetails(customer);
    }

    async function handleSaveCustomer() {
        if (!nameCustomer || !documentCustomer || !addressCustomer) {
            toast.error("Preencha todos os campos!");
            return;
        }

        setLoading(true);
        try {
            const collectionRef = collection(db, "customer");
            const docRef = doc(collectionRef);
            await setDoc(docRef, { name: nameCustomer, document: documentCustomer, address: addressCustomer });

            toast.success("Cliente cadastrado com sucesso!");
            setNameCustomer("");
            setDocumentCustomer("");
            setAddressCustomer("");
            loadCustomers();
            setLoading(false);
        } catch (err) {
            toast.warning("Erro ao salvar cliente!");
            setLoading(false);
        }
    }
    async function handleDelete() {
        try {
            const collectionRef = collection(db, "customer");
            const docRef = doc(collectionRef, details.id);
            await deleteDoc(docRef);
            toast.success("Cliente deletado com sucesso!");
            setShowModal(false);
            loadCustomers();
        } catch (err) {
            toast.warning("Erro ao deletar cliente!");
        }
    }

    return (
        <div className="view">
            <SideBar />
            <div className="main">
                <Title name="Clientes">
                    <FiUsers size={22} />
                </Title>
                <div className="container-customers">
                    <label htmlFor="name">Nome do cliente:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Nome completo"
                        value={nameCustomer}
                        onChange={e => setNameCustomer(e.target.value)}
                    />

                    <label htmlFor="document">CPF/CNPJ:</label>
                    <InputMask
                        mask={documentCustomer.length > 14 ? "99.999.999/9999-99" : "999.999.999-99"}
                        id="document"
                        placeholder="CPF OU CNPJ"
                        value={documentCustomer}
                        onChange={e => setDocumentCustomer(e.target.value)}
                    />

                    <label htmlFor="address">Endereço:</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Endreço completo"
                        value={addressCustomer}
                        onChange={e => setAddressCustomer(e.target.value)}
                    />

                    <div className="options">
                        <button className="save" onClick={handleSaveCustomer}>
                            {!loading ? "Salvar" : <ReactLoading type={"bars"} color={"#ffffff"} height={15} width={15} />}
                        </button>
                        <Link to="/dashboard">
                            <button className="exit">Voltar</button>
                        </Link>
                    </div>
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">CPF/CNPJ</th>
                                <th scope="col">Endereço</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, index) => {
                                return (
                                    <tr key={index}>
                                        <td data-label="Cliente">{customer.name}</td>
                                        <td data-label="CPF/CNPJ">{customer.document}</td>
                                        <td data-label="Endereço">{customer.address}</td>
                                        <td data-label="#">
                                            <button
                                                className="action"
                                                style={{ backgroundColor: "#d32525" }}
                                                onClick={() => openModal(customer)}
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
                {showModal && (
                    <Modal showModal={setShowModal} heigth={200} width={300}>
                        <div className="delete-modal">
                            <FiAlertTriangle size={45} color="#E02041" />
                            <h3>Tem certeza que deseja excluir esse chamado?</h3>
                            <div className="buttons">
                                <button className="delete-confirm" onClick={handleDelete}>
                                    Confirmar
                                </button>
                                <button className="delete-cancel" onClick={() => setShowModal(false)}>
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

export default Customers;
