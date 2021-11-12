import "./App.css";
import data from "./facilities_data";

function App() {
  return (
    <>
      <ul>
        {data.map((facility) => {
          return <li>{facility}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
