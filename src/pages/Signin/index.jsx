import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

import logo from "../../assets/logo.svg";
import "./Signin.css";

const Signin = () => {
    const { state, action } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);

    function handleLogin() {
        if (!email || !password) {
            setAlert("Por favor, preencha todos os campos antes de continuar *");
            return;
        }

        action.signIn(email, password);
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
                        <h1>Entrar</h1>
                        <div className="login-form">
                            <input type="email" placeholder={"Email"} value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" placeholder={"Senha"} value={password} onChange={e => setPassword(e.target.value)} />
                            <p className="alert">{!alert ? "" : alert}</p>
                            <button onClick={handleLogin}>
                                {!state.loadingAuth ? (
                                    "Acessar conta"
                                ) : (
                                    <ReactLoading type={"bars"} color={"#ffffff"} height={15} width={15} />
                                )}
                            </button>
                            <Link className="link" to="/register">
                                Criar uma conta
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
