import "./App.css";
import data from "./facilities_data";
import { useGlobalContext } from "./context";
import Navbar from "./components/Navbar.js";
import Listings from "./components/Listings.js";

function App() {
  const { value } = useGlobalContext();
  return (
    <main className="p-8 px-20 sm:px-10 sm:p-6">
      <Navbar />
      <Listings />
      {/* <ul>
        {data.map((facility) => {
          return <li className="text-blue-700 font-poppins">{facility}</li>;
        })}
      </ul> */}
    </main>
  );
  return (
    <>
      <h1 className="font-poppins font-bold text-siena text-5xl">
        Sport Buddy
      </h1>
      <ul>
        {data.map((facility) => {
          return <li className="text-blue-700 font-poppins">{facility}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
