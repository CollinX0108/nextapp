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

const EliminarJugadorPage = ({ params }: { params: { equipoId: string } }) => {
  const router = useRouter();
  const [equipo, setEquipo] = useState<Equipo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEquipo();
  }, []);

  const fetchEquipo = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipos/${params.equipoId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Error al cargar el equipo');
      
      const data = await response.json();
      setEquipo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarJugador = async (jugadorId: number) => {
    if (!confirm('¿Estás seguro de querer eliminar este jugador del equipo?')) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = Cookies.get('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/equipos/${params.equipoId}/remove-jugador/${jugadorId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar jugador');
      }

      setSuccess('Jugador eliminado exitosamente');
      fetchEquipo(); // Actualizar la lista de jugadores
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between">
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
        <h1 className="text-4xl font-bold mb-8 text-center">
          {equipo ? `Eliminar Jugadores - ${equipo.nombre}` : 'Cargando...'}
        </h1>

        {loading && <p className="text-center text-blue-500">Cargando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {success && <p className="text-center text-green-500">{success}</p>}

        {equipo && (
          <div className="max-w-2xl mx-auto">
            {equipo.jugadores.length > 0 ? (
              <div className="grid gap-4">
                {equipo.jugadores.map((jugador) => (
                  <div
                    key={jugador.id}
                    className="flex justify-between items-center p-4 bg-white shadow rounded"
                  >
                    <div>
                      <p className="font-medium">{jugador.username}</p>
                      <p className="text-gray-500">{jugador.email}</p>
                    </div>
                    {jugador.id !== equipo.dueno.id && (
                      <button
                        onClick={() => handleEliminarJugador(jugador.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        disabled={loading}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No hay jugadores en este equipo</p>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={() => router.push('/jugador/Equipos/ListarEquipos')}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Volver
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EliminarJugadorPage;