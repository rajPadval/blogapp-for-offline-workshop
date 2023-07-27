import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlogs from "./pages/CreateBlogs";
import Navbar from "./components/Navbar";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlogs />} />
        <Route
          path="*"
          element={
            <h1 className="text-2xl font-bold text-center ">Page not found!</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
