import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./views/Layout";
import FlightDetails from "./views/FlightDetails";
import Home from "./views/Home";
import { BookFlight } from "./views/BookFlight";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import AuthProvider from "./hooks/AuthProvider";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="details" element={<FlightDetails />}></Route>
            <Route path="booking" element={<BookFlight />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
