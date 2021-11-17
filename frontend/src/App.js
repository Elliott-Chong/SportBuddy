import "./App.css";
import data from "./facilities_data";
import { useGlobalContext } from "./context";
import Navbar from "./components/Navbar.js";
import Listings from "./components/Listings.js";
import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  const { value } = useGlobalContext();
  return (
    <>
      <main className="p-8 md:px-20 px-5 ">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<MainPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
