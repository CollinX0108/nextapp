"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const CrearEquipoPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    // Puedes agregar más campos si son necesarios
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = Cookies.get('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipos/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Equipo creado exitosamente');
        setFormData({ nombre: '' }); // Resetear el formulario
        // Opcional: redirigir después de un tiempo
        setTimeout(() => {
          router.push('/jugador/Equipos');
        }, 2000);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Error al crear el equipo');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
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

      <main className="container mx-auto py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Crear Nuevo Equipo</h1>

        {loading && (
          <div className="mb-4 text-blue-500">Creando equipo...</div>
        )}

        {error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}

        {success && (
          <div className="mb-4 text-green-500">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre del Equipo
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => router.push('/jugador/Equipos')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
            >
              Crear Equipo
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CrearEquipoPage;