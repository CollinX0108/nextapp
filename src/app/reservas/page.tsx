"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

const ReservasPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sport = searchParams.get('sport') || 'default';

  const handleFunctionalityClick = (path: string) => {
    const sport = searchParams.get('sport');
    if (sport) {
      router.push(`/reservas/${path}?sport=${sport}`);
    } else {
      router.push(`/reservas/${path}`);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/');
  };

  // Mapeo de deportes a imágenes específicas para "Editar Reserva"
  const editarReservaImages: Record<string, string> = {
    futbolito: '/futbolito.png',
    volleyball: '/editar_reserva_volley.png',
    tennis: '/editar_reserva_tennis.png',
    futbol: '/editar_reserva_futbol.png',
    basketball: '/editar_reserva_basket.png',
    pingpong: '/editar_reserva_ping.png',
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

      <main className="container mx-auto py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Opciones de Reserva</h1>
        <div className="grid grid-cols-3 gap-16">
          <button onClick={() => handleFunctionalityClick('reservar')} className="focus:outline-none">
            <img src="/reservar.png" alt="Reservar" className="w-40 h-40" />
            <p className="mt-4 text-center text-lg">Reservar</p>
          </button>
          <button onClick={() => handleFunctionalityClick('editar')} className="focus:outline-none">
            <img src={editarReservaImages[sport]} alt="Editar Reserva" className="w-40 h-40" />
            <p className="mt-4 text-center text-lg">Editar Reserva</p>
          </button>
          <button onClick={() => handleFunctionalityClick('cancelar')} className="focus:outline-none">
            <img src="/cancelar_reserva.png" alt="Cancelar Reserva" className="w-40 h-40" />
            <p className="mt-4 text-center text-lg">Cancelar Reserva</p>
          </button>
          <button onClick={() => handleFunctionalityClick('listar')} className="focus:outline-none">
            <img src="/listar_reservas.png" alt="Listar Reservas" className="w-40 h-40" />
            <p className="mt-4 text-center text-lg">Listar Reservas</p>
          </button>
          <button onClick={() => handleFunctionalityClick('buscar')} className="focus:outline-none">
            <img src="/buscar_reserva.png" alt="Buscar Reserva" className="w-40 h-40" />
            <p className="mt-4 text-center text-lg">Buscar Reserva</p>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ReservasPage;