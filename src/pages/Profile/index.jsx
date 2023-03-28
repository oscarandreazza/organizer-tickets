import { useState, useContext } from "react";
import { FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { AuthContext } from "../../contexts/auth";
import "./profile.css";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import { FiSettings } from "react-icons/fi";
import avatarDefault from "../../assets/avatar.png";
import { db, storage } from "../../services/firabaseConnection";
import { collection, doc, updateDoc } from "firebase/firestore/lite";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactLoading from "react-loading";

const Profile = () => {
    const { state, action } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    //states vindos do contexto de user
    const [name, setName] = useState(state.user && state.user.name);
    const [email, setEmail] = useState(state.user && state.user.email);
    const [avatar, setAvatar] = useState(state.user && state.user.avatarUrl);
    //states para armazenar novos inputs do perfil
    const [newAvatar, setNewAvatar] = useState(null);

    console.log(name);
    async function handleUpload() {
        try {
            const currentUid = state.user.uid;

            const path = `images/${currentUid}/${newAvatar.name}`;
            const refStorage = ref(storage, path);
            const uploadTask = await uploadBytes(refStorage, newAvatar);
            const urlImage = await getDownloadURL(uploadTask.ref);

            const refCollection = collection(db, "user");
            const docRef = doc(refCollection, state.user.uid);
            await updateDoc(docRef, { name: name, avatarUrl: urlImage });

            let data = {
                ...state.user,
                name: name,
                avatarUrl: urlImage
            };
            state.setUser(data);
            state.storageUser(data);
        } catch (err) {
            console.log(err);
        }
    }

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === "image/jpeg" || image.type === "image/png") {
                setNewAvatar(image);
                setAvatar(URL.createObjectURL(e.target.files[0]));
            } else {
                alert("Envie uma imagem do tipo PNG ou JPEG");
                setNewAvatar(null);
                return null;
            }
        }
    }

    async function handleSave() {
        if (!name) {
            toast.warn("Name is required!");
            return;
        }
        setLoading(true);
        try {
            if (newAvatar === null && name !== "") {
                const refCollection = collection(db, "user");
                const docRef = doc(refCollection, state.user.uid);
                await updateDoc(docRef, { name: name });

                let data = {
                    ...state.user,
                    name: name
                };
                state.setUser(data);
                state.storageUser(data);
            }

            if (newAvatar !== null && name !== null) {
                handleUpload();
            }
            setTimeout(() => {
                setLoading(false);
            }, 500);

            toast.success("Perfil atualizado com sucesso!");
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast.warn("Falha ao atualizar perfil!");
        }
    }

    return (
        <div className="view">
            <SideBar />
            <div className="main">
                <Title name="Meu perfil">
                    <FiSettings size={22} />
                </Title>
                <div className="profile">
                    <div className="avatar-perfil">
                        {avatar === null ? <img src={avatarDefault} /> : <img src={avatar} />}
                        <label htmlFor="image">
                            <FiUpload className="avatar-icon" size={22} />
                        </label>
                        <input id="image" type="file" accept="image/*" onChange={handleFile} />
                    </div>

                    <label htmlFor="name">Nome:</label>
                    <input id="name" value={name} onChange={e => setName(e.target.value)} />

                    <label htmlFor="email">Email:</label>
                    <input id="email" disabled value={email} />

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

export default Profile;
