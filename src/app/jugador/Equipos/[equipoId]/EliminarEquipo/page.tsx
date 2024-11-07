"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const EliminarEquipoPage = ({ params }: { params: { equipoId: string } }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEliminarEquipo = async () => {
    if (!confirm('¿Estás seguro de querer eliminar este equipo? Esta acción no se puede deshacer.')) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = Cookies.get('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/equipos/${params.equipoId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar equipo');
      }

      setSuccess('Equipo eliminado exitosamente');
      setTimeout(() => {
        router.push('/jugador/Equipos/ListarEquipos');
      }, 2000);
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
        <h1 className="text-4xl font-bold mb-8 text-center">Eliminar Equipo</h1>

        {loading && <p className="text-center text-blue-500">Procesando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {success && <p className="text-center text-green-500">{success}</p>}

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-red-600 mb-8">
            ¡Advertencia! Esta acción eliminará permanentemente el equipo y no se puede deshacer.
          </p>

          <div className="mt-8">
            <button
              onClick={() => router.push('/jugador/Equipos/ListarEquipos')}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 mr-4"
            >
              Cancelar
            </button>
            <button
              onClick={handleEliminarEquipo}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              disabled={loading}
            >
              Eliminar Equipo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EliminarEquipoPage;