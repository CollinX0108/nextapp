"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const UserMain: React.FC = () => {
  const router = useRouter();

  const handleRegisterAdmin = () => {
    router.push('/admin/register');
  };

  const handleLogout = () => {
    Cookies.remove('token'); // Elimina el token de las cookies
    router.push('/'); // Redirige a la página de inicio
  };

  const handleSportClick = (sport: string) => {
    router.push(`/reservas?sport=${sport}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-2xl font-bold">CourtHub</h1>
          <nav className="flex space-x-4">
            <a href="#" className="hover:underline">Equipos</a>
            <a href="#" className="hover:underline">Reserva espacios deportivos</a>
            <a href="#" className="hover:underline">Torneos</a>
            <a href="#" className="hover:underline">Entrenos</a>
          </nav>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <h2 className="text-6xl font-bold text-center mb-16">Nuestros deportes</h2>

        {/* Sección de botones de deportes */}
        <div className="grid grid-cols-3 gap-8 text-center text-gray-500 mb-16">
          <button onClick={() => handleSportClick('futbolito')} className="text-lg hover:text-black">Futbolito</button>
          <button onClick={() => handleSportClick('volleyball')} className="text-lg hover:text-black">Volleyball</button>
          <button onClick={() => handleSportClick('tennis')} className="text-lg hover:text-black">Tennis</button>
          <button onClick={() => handleSportClick('futbol')} className="text-lg hover:text-black">Futbol</button>
          <button onClick={() => handleSportClick('basketball')} className="text-lg hover:text-black">Basketball</button>
          <button onClick={() => handleSportClick('pingpong')} className="text-lg hover:text-black">PingPong</button>
        </div>

        {/* Sección de íconos como botones */}
        <div className="grid grid-cols-3 gap-16 mt-40">
          <button onClick={() => handleSportClick('futbol')} className="text-center focus:outline-none">
            <img src="/futbol.png" alt="Futbol" className="mx-auto w-52 h-52" />
            <p className="mt-4 font-bold">Futbol</p>
          </button>
          <button onClick={() => handleSportClick('pingpong')} className="text-center focus:outline-none">
            <img src="/pingpong.png" alt="PingPong" className="mx-auto w-52 h-52" />
            <p className="mt-4 font-bold">PingPong</p>
          </button>
          <button onClick={() => handleSportClick('futbolito')} className="text-center focus:outline-none">
            <img src="/futbolito.PNG" alt="Futbolito" className="mx-auto w-52 h-52" />
            <p className="mt-4 font-bold">Futbolito</p>
          </button>
        </div>
      </main>

      {/* Botón para registrar un nuevo administrador */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleRegisterAdmin}
          className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          Registrar Admin
        </button>
      </div>
    </div>
  );
};

export default UserMain;