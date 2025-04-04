
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokeCreationPage } from "@/routes/poke/PokeCreationPage";
import { UserInfoPage } from "@/routes/user/UserInfoPage";
import { Header } from "@/components/layout/Header";

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<PokeCreationPage />} />
                        <Route path="/user" element={<UserInfoPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;