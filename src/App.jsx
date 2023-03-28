import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import Root from "./Routes";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer />
                <Root />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
