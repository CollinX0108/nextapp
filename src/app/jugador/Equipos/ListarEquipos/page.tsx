"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface Equipo {
  id: number;
  nombre: string;
  dueno: User;
  jugadores: User[];
}

const ListarEquiposPage = () => {
  const router = useRouter();
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEquipos();
  }, []);

  const fetchEquipos = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipos/mis-equipos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Error al cargar equipos');
      
      const data = await response.json();
      setEquipos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleEquipoClick = (equipoId: number) => {
    if (!equipoId || isNaN(equipoId)) {
      setError('ID de equipo inválido');
      return;
    }
    router.push(`/jugador/Equipos/${equipoId}/EliminarJugador`);
  };

  const handleEliminarEquipo = (equipoId: number) => {
    if (!equipoId || isNaN(equipoId)) {
      setError('ID de equipo inválido');
      return;
    }
    router.push(`/jugador/Equipos/${equipoId}/EliminarEquipo`);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CourtHub</h1>
          <nav className="flex space-x-4">
            <a href="/jugador" className="hover:underline">Inicio</a>
            <a href="/jugador/Equipos" className="hover:underline">Equipos</a>
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
        <h1 className="text-4xl font-bold mb-8 text-center">Mis Equipos</h1>

        {loading && <p className="text-center text-blue-500">Cargando equipos...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="max-w-2xl mx-auto">
          {equipos.length > 0 ? (
            <div className="grid gap-4">
              {equipos.map((equipo) => (
                <div
                  key={equipo.id}
                  className="p-4 bg-white shadow rounded hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-semibold">{equipo.nombre}</h3>
                  <p className="text-gray-600 mt-2">
                    Dueño: {equipo.dueno.username}
                  </p>
                  <div className="mt-4">
                    <p className="font-medium">Jugadores:</p>
                    <ul className="list-disc list-inside mt-2">
                      {equipo.jugadores.map((jugador) => (
                        <li key={jugador.id} className="text-gray-600">
                          {jugador.username}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEquipoClick(equipo.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Gestionar Jugadores
                    </button>
                    {equipo.dueno.id === parseInt(Cookies.get('userId') || '0') && (
                      <button
                        onClick={() => handleEliminarEquipo(equipo.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Eliminar Equipo
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-4">No tienes equipos creados</p>
              <button
                onClick={() => router.push('/jugador/Equipos/CrearEquipo')}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Crear Equipo
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/jugador/Equipos')}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Volver
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListarEquiposPage;