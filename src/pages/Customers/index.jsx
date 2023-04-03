import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import SideBar from "../../components/SideBar";
import { FiUsers } from "react-icons/fi";
import Title from "../../components/Title";
import { db } from "../../services/firabaseConnection";
import { collection, setDoc, doc } from "firebase/firestore/lite";

const Customers = () => {
    const [loading, setLoading] = useState(false);
    const [nameCustomer, setNameCustomer] = useState("");
    const [documentCustomer, setDocumentCustomer] = useState("");
    const [addressCustomer, setAddressCustomer] = useState("");

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
            setLoading(false);
        } catch (err) {
            toast.warning("Erro ao salvar cliente!");
            setLoading(false);
        }
    }

    return (
        <div className="view">
            <SideBar />
            <div className="main">
                <Title name="Clientes">
                    <FiUsers size={22} />
                </Title>
                <div className="container">
                    <label htmlFor="name">Nome do cliente:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Nome completo"
                        value={nameCustomer}
                        onChange={e => setNameCustomer(e.target.value)}
                    />

                    <label htmlFor="document">CPF/CNPJ:</label>
                    <input
                        type="number"
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
            </div>
        </div>
    );
};

export default Customers;
