import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
import "../Signin/Signin.css";

const Signup = () => {
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [nomeRegister, setNomeRegister] = useState("");

    function handleRegister() {
        console.log(`Email: ${emailRegister}| Password: ${passwordRegister} | Nome: ${nomeRegister}`);
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
                        <h1>Cadastro</h1>
                        <div className="login-form">
                            <input type="text" placeholder="Nome" value={nomeRegister} onChange={e => setNomeRegister(e.target.value)} />
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={emailRegister}
                                onChange={e => setEmailRegister(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={passwordRegister}
                                onChange={e => setPasswordRegister(e.target.value)}
                            />

                            <button onClick={handleRegister}>Cadastrar</button>
                            <Link to="/">Já possuo uma conta!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
