import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import FooterMobile from './components/FooterMobile';
import Help from './components/Help';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="priciple-class min-h-screen flex flex-col justify-between relative">
        {/* Fondo giratorio */}
        <div className="rotating-bg">
          <img src={require("./assets/imagenes/contenedor_Azu.png")} alt="Rotating Background" />
        </div>

        <div className="mobile-class"><FooterMobile /></div>
        <div id="m-5 particles-js"></div>

        <div className="contenedor flex-grow flex flex-col">
          <Header className="text-center" />
          <div className="flex flex-grow justify-center items-start">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/help" element={<Help />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          <div className="flex justify-center mb-6">
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
