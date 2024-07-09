import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componnents/common/header/Header";
import Footer from "./componnents/common/footer/Footer";
import Home from "./componnents/layouts/home/Home";
import About from "./pages/about/About";
import Contacts from "./componnents/layouts/contacts/Contacts";
import Navigation from "./componnents/layouts/navbar/Navbar";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="register" element={<Register />} />
          <Route path='login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
