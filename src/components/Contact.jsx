import React from 'react';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import qrCodeR from '../assets/imagenes/Contacto/Qr/qr-rafael.svg';
import qrCode from '../assets/imagenes/Contacto/Qr/qr-fabian.svg'; // Ruta al código QR
import mentorImg from '../assets/imagenes/Contacto/rafael-mesa.png'; // Imagen de Rafael Mesa
import expertImg from '../assets/imagenes/Contacto/oscar-rojas.png'; // Imagen de Oscar Fabian Rojas
import nuryChavezImg from '../assets/imagenes/Contacto/nury-chaves.png'; // Imagen de Nury Chavez
import yeisonNavarroImg from '../assets/imagenes/Contacto/yeison-navarro.png'; // Imagen de Yeison Navarro
import lauraZamudioImg from '../assets/imagenes/Contacto/laura-zamudio.png'; // Imagen de Laura Zamudio
import alejandraTicoraImg from '../assets/imagenes/Contacto/alejandra-ticora.png'; // Imagen de Alejandra Ticora
import lauraCastellanosImg from '../assets/imagenes/Contacto/laura-castellanos.png'; // Imagen de Laura Castellanos
import nuryGuzmanImg from '../assets/imagenes/Contacto/yuray-guzman.png'; // Imagen de Nury Guzman
import dannaCanoImg from '../assets/imagenes/Contacto/danna-cano.png'; // Imagen de Danna Cano

export default function Contact() {
  return (
    <div className="container mx-auto p-6 text-white">
      {/* Título fuera del área de scroll */}
      <h1 className="text-4xl text-center mb-4">Equipo de trabajo</h1>

      {/* Contenedor desplazable */}
      <div className="max-h-[80vh] overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Rafael Mesa */}
          <div className="flex flex-col items-center">
            <img src={mentorImg} alt="Rafael Mesa" className="w-32 h-32 rounded-full mb-2" />
            <div className="bg-white text-center rounded-full p-1 px-4 mt-1 flex items-center space-x-4">
              <a href="https://linkedin.com/in/rafael-mesa" className="text-blue-500">
                <FaLinkedin size={32} />
              </a>
              <div className="flex flex-col text-black">
                <h2 className="text-xl font-bold">Rafael Mesa</h2>
                <p>Mentor</p>
              </div>
              <div className="flex space-x-2 items-center">
                <img src={qrCodeR} alt="QR Code" className="w-20 h-20" />
                <a href="https://wa.me/573204162492" className="text-green-500">
                  <FaWhatsapp size={32} />
                </a>
              </div>
            </div>
          </div>

          {/* Oscar Fabian Rojas */}
          <div className="flex flex-col items-center">
            <img src={expertImg} alt="Oscar Fabian Rojas" className="w-32 h-32 rounded-full mb-2" />
            <div className="bg-white text-center rounded-full p-1 px-4 mt-1 flex items-center space-x-4">
              <a href="https://linkedin.com/in/oscar-fabian-rojas" className="text-blue-500">
                <FaLinkedin size={32} />
              </a>
              <div className="flex flex-col text-black">
                <h2 className="text-xl font-bold">Oscar Fabian Rojas</h2>
                <p>Ingeniero Experto</p>
              </div>
              <div className="flex space-x-2 items-center">
                <img src={qrCode} alt="QR Code" className="w-20 h-20" />
                <a href="https://wa.me/573118189614" className="text-green-500">
                  <FaWhatsapp size={32} />
                </a>
              </div>
            </div>
          </div>

          {/* Nury Chavez */}
          <div className="flex flex-col items-center">
            <img src={nuryChavezImg} alt="Nury Chavez" className="w-32 h-32 rounded-full mb-2" />
            <div className="bg-white text-center rounded-full p-1 px-4 mt-1 flex items-center space-x-4">
              <a href="http://www.linkedin.com/in/nury-yazmine-chaves-mart%C3%ADn-b0707b1a5" className="text-blue-500">
                <FaLinkedin size={32} />
              </a>
              <div className="flex flex-col text-black">
                <h2 className="text-xl font-bold">Nury Chavez</h2>
                <p>Instructor Investigador SENA</p>
              </div>
            </div>
          </div>

          {/* Yeison Navarro */}
          <div className="flex flex-col items-center">
            <img src={yeisonNavarroImg} alt="Yeison Navarro" className="w-32 h-32 rounded-full mb-2" />
            <div className="bg-white text-center rounded-full p-1 px-4 mt-1 flex items-center space-x-4">
              <a href="https://www.linkedin.com/in/yeison-leonardo-navarro-cardona-0665712a0/" className="text-blue-500">
                <FaLinkedin size={32} />
              </a>
              <div className="flex flex-col text-black">
                <h2 className="text-xl font-bold">Yeison Navarro</h2>
                <p>Programador</p>
              </div>
            </div>
          </div>

          {/* Laura Zamudio */}
          <div className="flex flex-col items-center">
            <img src={lauraZamudioImg} alt="Laura Zamudio" className="w-32 h-32 rounded-full mb-2" />
            <div className="bg-white text-center rounded-full p-1 px-4 mt-1 flex items-center space-x-4">
              <a href="https://www.linkedin.com/in/laura-zamudio-ch%C3%A1vez-b7b07638/" className="text-blue-500">
                <FaLinkedin size={32} />
              </a>
              <div className="flex flex-col text-black">
                <h2 className="text-xl font-bold">Laura Zamudio</h2>
                <p>Diseñadora Multimedia</p>
              </div>
            </div>
          </div>

          {/* Alejandra Ticora */}
          <div className="flex flex-col items-center">
            <img src={alejandraTicoraImg} alt="Alejandra Ticora" className="w-32 h-32 rounded-full mb-2" />
            <div className="bg-white text-center rounded-full p-1 px-4 mt-1 flex items-center space-x-4">
              <a href="https://linkedin.com/in/alejandra-ticora" className="text-blue-500">
                <FaLinkedin size={32} />
              </a>
              <div className="flex flex-col text-black">
                <h2 className="text-xl font-bold">Alejandra Ticora</h2>
                <p>Diseñadora Gráfica</p>
              </div>
            </div>
          </div>

          {/* Laura Castellanos */}
          <div className="flex flex-col items-center">
            <img src={lauraCastellanosImg} alt="Laura Castellanos" className="w-32 h-32 rounded-full mb-2" />
            <div className="bg-white text-center rounded-full p-1 px-4 mt-1 flex items-center space-x-4">
              <a href="https://linkedin.com/in/laura-castellanos" className="text-blue-500">
                <FaLinkedin size={32} />
              </a>
              <div className="flex flex-col text-black">
                <h2 className="text-xl font-bold">Laura Castellanos</h2>
                <p>Aprendiz SENA - Técnico Apoyo Administrativo en Salud</p>
              </div>
            </div>
          </div>

          {/* Nury Guzmán */}
          <div className="flex flex-col items-center">
            <img src={nuryGuzmanImg} alt="Yuray Guzmán" className="w-32 h-32 rounded-full mb-2" />
            <div className="bg-white text-center rounded-full p-1 px-4 mt-1 flex items-center space-x-4">
              <a href="https://linkedin.com/in/nury-guzman" className="text-blue-500">
                <FaLinkedin size={32} />
              </a>
              <div className="flex flex-col text-black">
                <h2 className="text-xl font-bold">Yuray Guzmán</h2>
                <p>Aprendiz SENA - Semillero de Investigación</p>
              </div>
            </div>
          </div>

          {/* Danna Cano */}
          <div className="flex flex-col items-center">
            <img src={dannaCanoImg} alt="Danna Cano" className="w-32 h-32 rounded-full mb-2" />
            <div className="bg-white text-center rounded-full p-1 px-4 mt-1 flex items-center space-x-4">
              <a href="https://linkedin.com/in/danna-cano" className="text-blue-500">
                <FaLinkedin size={32} />
              </a>
              <div className="flex flex-col text-black">
                <h2 className="text-xl font-bold">Danna Cano</h2>
                <p>Aprendiz SENA - Semillero de Investigación</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
