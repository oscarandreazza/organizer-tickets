import { Routes, Route } from "react-router-dom";
import WrapperRouter from "./WrapperRoute";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

import Dashboard from "../pages/Dashboard";

export default function Root() {
    return (
        <Routes>
            <Route
                exact
                path="/"
                element={
                    <WrapperRouter>
                        <Signin />
                    </WrapperRouter>
                }
            />
            <Route
                exact
                path="/register"
                element={
                    <WrapperRouter>
                        <Signup />
                    </WrapperRouter>
                }
            />
            <Route
                exact
                path="/dashboard"
                element={
                    <WrapperRouter isPrivate>
                        <Dashboard />
                    </WrapperRouter>
                }
            />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
}
