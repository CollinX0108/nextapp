"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

const CrearEquipo = () => {
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleCrearEquipo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = Cookies.get('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipos/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: nombreEquipo }),
      });

      if (response.ok) {
        setMensaje('Equipo creado exitosamente');
        setNombreEquipo('');
      } else {
        const errorData = await response.json();
        setMensaje(`Error: ${errorData.message || 'No se pudo crear el equipo'}`);
      }
    } catch (error) {
      setMensaje('Error de red o servidor');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de navegación */}
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CourtHub</h1>
          <nav className="flex space-x-4">
            <Link href="/jugador" className="hover:underline">Inicio</Link>
            <Link href="/jugador/Equipos" className="hover:underline">Equipos</Link>
            <Link href="/reserva" className="hover:underline">Reserva espacios deportivos</Link>
            <Link href="/torneos" className="hover:underline">Torneos</Link>
            <Link href="/entrenos" className="hover:underline">Entrenos</Link>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Crear Equipo</h2>
        <form onSubmit={handleCrearEquipo} className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <label className="block text-sm font-medium text-gray-700">Nombre del equipo:</label>
          <input
            type="text"
            value={nombreEquipo}
            onChange={(e) => setNombreEquipo(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Crear Equipo
          </button>
        </form>
        {mensaje && <p className="text-center mt-4">{mensaje}</p>}
      </main>
    </div>
  );
};

export default CrearEquipo;
