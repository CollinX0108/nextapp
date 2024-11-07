"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

const ListarReservasPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sport = searchParams.get('sport') || '';
  
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = Cookies.get('token');
        const decodedToken = JSON.parse(atob(token!.split('.')[1]));
        const isAdmin = decodedToken.role === 'admin';
        
        // Usar diferente endpoint según el rol
        const endpoint = isAdmin ? 'listar' : 'mis-reservas';
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservas/${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const reservasFiltradas = sport 
            ? data.filter((reserva: Reserva) => reserva.deporte === sport)
            : data;
          setReservas(reservasFiltradas);
        } else {
          throw new Error('Error al cargar las reservas');
        }
      } catch (error) {
        setError('Error al cargar las reservas');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [sport]);

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

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
        <h1 className="text-4xl font-bold mb-8 text-center">Mis Reservas</h1>
        
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {reservas.length === 0 ? (
          <div className="text-center text-gray-600">
            No tienes reservas {sport && `para ${sport}`}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reservas.map((reserva) => (
              <div key={reserva.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                <h2 className="text-xl font-bold mb-2 capitalize">{reserva.deporte}</h2>
                <p className="text-gray-600 mb-1">Reservante: {reserva.nombreReservante}</p>
                <p className="text-gray-600 mb-1">Correo: {reserva.correo}</p>
                <p className="text-gray-600 mb-1">Teléfono: {reserva.telefono}</p>
                <p className="text-gray-600 mb-1">Fecha: {new Date(reserva.fechaHora).toLocaleString()}</p>
                <p className="text-gray-600 mb-1">Personas: {reserva.cantidadPersonas}</p>
                <div className="mt-4 text-sm text-gray-500">
                  ID Reserva: {reserva.id}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push(`/reservas?sport=${sport}`)}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Volver
          </button>
        </div>
      </main>
    </div>
  );
};

export default ListarReservasPage;