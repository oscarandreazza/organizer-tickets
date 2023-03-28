import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

import logo from "../../assets/logo.svg";
import "../Signin/Signin.css";

const Signup = () => {
    const { state, action } = useContext(AuthContext);

    const [nomeRegister, setNomeRegister] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [alert, setAlert] = useState(false);

    function handleRegister() {
        if (!nomeRegister || !emailRegister || !passwordRegister) {
            setAlert("Por favor, preencha todos os campos antes de continuar *");
            return;
        }

        action.signUp(nomeRegister, emailRegister, passwordRegister);

        setNomeRegister("");
        setEmailRegister("");
        setPasswordRegister("");
        setAlert(false);
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
                            <p className="alert">{!alert ? "" : alert}</p>
                            <button onClick={handleRegister}>
                                {!state.loadingAuth ? "Cadastrar" : <ReactLoading type={"bars"} color={"#ffffff"} height={15} width={15} />}
                            </button>
                            <Link className="link" to="/">
                                Já possuo uma conta!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
