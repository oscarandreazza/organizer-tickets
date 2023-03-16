import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import Root from "./Routes";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
