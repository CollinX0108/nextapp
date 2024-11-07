"use client";

import React from 'react';
import Link from 'next/link';

const TeamsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CourtHub</h1>
          <nav className="flex space-x-4">
            <a href="#" className="hover:underline">Inicio</a>
            <Link href="/jugador/Equipos/CrearEquipo" legacyBehavior>
              <a className="hover:underline">Equipos</a>
            </Link>
            <a href="#" className="hover:underline">Reserva espacios deportivos</a>
            <a href="#" className="hover:underline">Torneos</a>
            <a href="#" className="hover:underline">Entrenos</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <h2 className="text-4xl font-bold text-center mb-16">Equipos</h2>

        {/* Contenedor de botones en cuadrícula */}
        <div className="grid grid-cols-3 gap-8 text-center">
          {/* Crear equipo */}
          <Link href="/jugador/Equipos/CrearEquipo" legacyBehavior>
            <a className="flex flex-col items-center space-y-4 focus:outline-none">
              <img src="/crear_equipo.PNG" alt="Crear equipo" className="w-64 h-64" />
              <p className="text-lg font-semibold">Crear equipo</p>
            </a>
          </Link>

          {/* Administrar equipos */}
          <button className="flex flex-col items-center space-y-4 focus:outline-none">
            <img src="/eliminar_jugador.png" alt="Eliminar Jugador" className="w-64 h-64" />
            <p className="text-lg font-semibold">Eliminar Jugador</p>
          </button>

          {/* Unirse a un equipo */}
          <button className="flex flex-col items-center space-y-4 focus:outline-none">
            <img src="/añadir_jugador.PNG" alt="Añadir Jugador" className="w-64 h-64" />
            <p className="text-lg font-semibold">Añadir Jugador</p>
          </button>

          {/* Listar equipos */}
          <button className="flex flex-col items-center space-y-4 focus:outline-none">
            <img src="/listar_equipos.png" alt="Listar equipos" className="w-64 h-64" />
            <p className="text-lg font-semibold">Listar equipos</p>
          </button>

          {/* Buscar equipo */}
          <button className="flex flex-col items-center space-y-4 focus:outline-none">
            <img src="/buscar_equipo.png" alt="Buscar equipo" className="w-64 h-64" />
            <p className="text-lg font-semibold">Buscar equipo</p>
          </button>

          {/* Eliminar equipo */}
          <button className="flex flex-col items-center space-y-4 focus:outline-none">
            <img src="/eliminar_equipo.png" alt="Eliminar equipo" className="w-64 h-64" />
            <p className="text-lg font-semibold">Eliminar equipo</p>
          </button>
        </div>
      </main>
    </div>
  );
};

export default TeamsPage;
