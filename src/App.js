import "./App.css";
import LandingPage from "./Component/Landing/Landing";
import New from "./Component/New/New";
import EmployeeList from "./Component/Employee/Emp";
import Graphs from "./Component/Graph/Graph";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/new" element={<New />} />
          <Route exact path="/chart" element={<Graphs />} />
          <Route exact path="/employee" element={<EmployeeList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
