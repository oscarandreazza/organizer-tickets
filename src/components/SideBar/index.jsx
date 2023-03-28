import logo from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FiHome, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";
import "./sideBar.css";
import { AuthContext } from "../../contexts/auth";
import avatarDefault from "../../assets/avatar.png";

const SideBar = () => {
    const { state, action } = useContext(AuthContext);

    const [name, setName] = useState(state.user && state.user.name);
    const [avatar, setAvatar] = useState(state.user && state.user.avatarUrl);

    return (
        <div className="sidebar">
            <div>
                <div className="logo">
                    {avatar === null ? <img src={avatarDefault} /> : <img src={avatar} />}

                    {name ? <p className="name">{name}</p> : ""}
                </div>
                <div className="menu">
                    <Link className="menu-item" to="/dashboard">
                        <FiHome />
                        <span>Chamados</span>
                    </Link>
                    <Link className="menu-item" to="/customers">
                        <FiUsers />
                        <span>Clientes</span>
                    </Link>
                    <Link className="menu-item" to="/profile">
                        <FiSettings />
                        <span>Configurações</span>
                    </Link>
                    <Link className="menu-item" onClick={action.logout}>
                        <FiLogOut />

                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
