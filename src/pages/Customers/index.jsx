import SideBar from "../../components/SideBar";
import { FiUsers } from "react-icons/fi";
import Title from "../../components/Title";

const Customers = () => {
    return (
        <div className="view">
            <SideBar />
            <div className="main">
                <Title name="Clientes">
                    <FiUsers size={22} />
                </Title>
            </div>
        </div>
    );
};

export default Customers;
