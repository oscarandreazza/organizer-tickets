import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import logo from "../../assets/logo.svg";
import "./Signin.css";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../contexts/auth";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const mutation = useAuth();
    const { state, action } = useContext(AuthContext);

    function handleClick() {
        const device_name = navigator.userAgent;
        const data = {
            email: email,
            password: password,
            device_name: device_name
        };

        mutation.mutate(data, {
            onSuccess: data => {
                data.data.email = email;
                action.storageUser(data.data);
                state.setUser(data.data);
                toast.success("Bem-vindo!");
            },
            onError: () => {
                toast.error("Email ou senha incorretos");
            }
        });
    }

    return (
        <div className="section">
            <div className="container-login">
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
                            <button onClick={handleClick}>
                                {mutation.isLoading ? (
                                    <ReactLoading type={"bars"} color={"#ffffff"} height={15} width={15} />
                                ) : (
                                    "Acessar conta"
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
