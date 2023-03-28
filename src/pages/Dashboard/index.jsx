import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import SideBar from "../../components/SideBar";
import "./dashboard.css";
import { FiHome } from "react-icons/fi";
import Title from "../../components/Title";

const Dashboard = () => {
    const { state } = useContext(AuthContext);
    return (
        <div className="view">
            <SideBar />
            <div className="main">
                <Title name="dashboard">
                    <FiHome size={22} />
                </Title>
            </div>
        </div>
    );
};

export default Dashboard;
