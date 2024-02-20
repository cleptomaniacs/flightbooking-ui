import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./views/Layout";
import FlightDetails from "./views/FlightDetails";
import Home from "./views/Home";
import { BookFlight } from "./views/BookFlight";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="details" element={<FlightDetails />}></Route>
          <Route path="booking" element={<BookFlight />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
