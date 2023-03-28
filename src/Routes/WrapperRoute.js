import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Navigate } from "react-router-dom";

const WrapperRouter = ({ isPrivate, children }) => {
    const { state } = useContext(AuthContext);

    if (state.loading) {
        return <div>Carregando</div>;
    }

    if (!state.signed && isPrivate && !state.user) {
        return <Navigate to="/" replace />;
    }

    if (state.signed && !isPrivate) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default WrapperRouter;
