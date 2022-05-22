import { Route, Routes } from "react-router-dom";
import BarChart from "./Components/BarChart";
import Home from "./Components/Home";


function App() {

  return (
    <div className="App">
<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/barChart" element={<BarChart  height={500} width={500} />}></Route>
</Routes>
    </div>
  );
}

export default App;
