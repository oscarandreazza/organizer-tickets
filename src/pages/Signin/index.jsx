import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
import "./Signin.css";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        console.log(`Email: ${email}| Password: ${password}`);
        alert("ok");
    }

    return (
        <div className="section">
            <div className="container">
                <div className="login-box">
                    <div className="login-box-logo">
                        <img src={logo} alt="logo" />
                    </div>

                    <div className="login-box-info">
                        <h1>Entrar</h1>
                        <div className="login-form">
                            <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                            <button onClick={handleLogin}>Acessar</button>
                            <Link to="/register">Criar uma conta</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
