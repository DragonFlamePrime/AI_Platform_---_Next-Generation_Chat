import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Memory from "./pages/Memory";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </Layout>
  );
}
