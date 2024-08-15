// src/App.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componnents/common/header/Header";
import Footer from "./componnents/common/footer/Footer";
import Home from "./componnents/layouts/home/Home";
import About from "./pages/about/About";
import Contacts from "./pages/contacts/Contacts";
import Navigation from "./componnents/layouts/navbar/Navbar";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import Profile from "./pages/profile/Profile";
import JunkCollection from "./pages/junk-collection/JunkCollection";
import AddJunk from "./pages/add-junk/AddJunk";
import LookingToBuy from "./pages/buyJunk/BuyJunk";
import PrivateRoute from "./services/guards/PrivateRoute";
import PublicRoute from "./services/guards/PublicRoute";
import { AuthProvider } from "./services/guards/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<PublicRoute element={Home} />} />
          <Route path="about" element={<PublicRoute element={About} />} />
          <Route path="contacts" element={<PublicRoute element={Contacts} />} />
          <Route path="register" element={<PublicRoute element={Register} restricted={true} />} />
          <Route path="login" element={<PublicRoute element={Login} restricted={true} />} />
          <Route path="profile" element={<PrivateRoute element={Profile} />} />
          <Route path="junk-collection" element={<PrivateRoute element={JunkCollection} />} />
          <Route path="add-junk" element={<PrivateRoute element={AddJunk} />} />
          <Route path="looking-to-buy" element={<PrivateRoute element={LookingToBuy} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;




