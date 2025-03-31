
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokeCreationPage } from "./pages/PokeCreationPage";
import { UserInformationPage } from "./pages/UserInformationPage";
import { Header } from "./components/layout/Header";

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<PokeCreationPage />} />
                        <Route path="/user" element={<UserInformationPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;