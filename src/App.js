import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Emplisting from "./Emplisting";
import EmpCreate from "./EmpCreate";
import EmpEdit from "./EmpEdit";
import EmpSearch from "./EmpSearch";

function App() {
  return (
    <div className="App">
      <h1> Simple Address Book Manager</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Emplisting />}></Route>
          <Route path="/contact/create" element={<EmpCreate />}></Route>
          <Route path="/contact/edit/:empid" element={<EmpEdit />}></Route>
          <Route path="/contact/search" element={<EmpSearch />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
