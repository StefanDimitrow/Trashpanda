import React, { useEffect, useState } from "react";
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
import JunkCollection from "./pages/junk-collection/JunkCollection"
import AddJunk from "./pages/add-junk/AddJunk"

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
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="junk-collection" element={<JunkCollection />} />
          <Route path="add-junk" element={<AddJunk />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
