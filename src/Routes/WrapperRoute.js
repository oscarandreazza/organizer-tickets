import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Navigate } from "react-router-dom";

const WrapperRouter = ({ isPrivate, children }) => {
    const { signed, loading } = useContext(AuthContext);
    //substituicao por metodo de verificacao firebase

    if (loading) {
        return <div>Carregando</div>;
    }

    if (!signed && isPrivate) {
        return <Navigate to="/" replace />;
    }

    if (signed && !isPrivate) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default WrapperRouter;
