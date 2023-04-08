import logo from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FiHome, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";
import "./sideBar.css";
import { AuthContext } from "../../contexts/auth";
import avatarDefault from "../../assets/avatar.png";

const SideBar = () => {
    const { state, action } = useContext(AuthContext);

    return (
        <div className="sidebar">
            <div>
                <div className="logo">
                    {state.user.avatarUrl === null ? <img src={avatarDefault} /> : <img src={state.user.avatarUrl} />}

                    {state.user.name ? <p className="name">{state.user.name}</p> : ""}
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
