import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/user";
import UserProvider from "./contexts/user";
import Alunos from "./Alunos";

function App() {
    return (
        <UserProvider>
            <div className="App">
                <header className="App-header"></header>
                <h1>Escola</h1>
                <hr />
                <Alunos />
            </div>
        </UserProvider>
    );
}

export default App;
