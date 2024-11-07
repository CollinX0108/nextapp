"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface Reserva {
  id: string;
  nombreReservante: string;
  correo: string;
  telefono: string;
  cantidadPersonas: number;
  fechaHora: string;
  deporte: string;
}

const BuscarReservaPage = () => {
  const router = useRouter();
  const [reservaId, setReservaId] = useState('');
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleCourtHubClick = () => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const role = decodedToken.role;
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/jugador');
      }
    } else {
      router.push('/');
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSearched(true);
    setReserva(null); // Limpiar resultado anterior

    try {
      const token = Cookies.get('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservas/buscar/${reservaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setReserva(data);
        setError(''); // Limpiar error si existe
      } else if (response.status === 404) {
        setError('No existe una reserva con ese ID');
        setReserva(null);
      } else {
        throw new Error('Error al buscar la reserva');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al buscar la reserva. Por favor, intente nuevamente.');
      setReserva(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLimpiar = () => {
    setReservaId('');
    setReserva(null);
    setError('');
    setSearched(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <button 
            onClick={handleCourtHubClick}
            className="text-2xl font-bold hover:text-gray-200"
          >
            CourtHub
          </button>
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
        <h1 className="text-4xl font-bold mb-8 text-center">Buscar Reserva</h1>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={reservaId}
                onChange={(e) => setReservaId(e.target.value)}
                placeholder="Ingrese el ID de la reserva"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                Buscar
              </button>
            </div>
          </form>

          {loading && (
            <div className="text-center py-4">Buscando...</div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mb-4">
              {error}
            </div>
          )}

          {reserva && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 capitalize">{reserva.deporte}</h2>
              <div className="space-y-2">
                <p><strong>ID:</strong> {reserva.id}</p>
                <p><strong>Reservante:</strong> {reserva.nombreReservante}</p>
                <p><strong>Correo:</strong> {reserva.correo}</p>
                <p><strong>Teléfono:</strong> {reserva.telefono}</p>
                <p><strong>Fecha:</strong> {new Date(reserva.fechaHora).toLocaleString()}</p>
                <p><strong>Personas:</strong> {reserva.cantidadPersonas}</p>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={handleLimpiar}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Nueva Búsqueda
            </button>
            <button
              onClick={() => router.push('/reservas')}
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

export default BuscarReservaPage;