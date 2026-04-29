import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Memory from "./pages/Memory";
import Chat from "./pages/Chat";
import Appearance from "./pages/Appearance";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="memory" element={<Memory />} />
        <Route path="chat/:id" element={<Chat />} />
        <Route path="appearance" element={<Appearance />} />
      </Route>
    </Routes>
  );
}
