"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

const ReservarPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deporteSeleccionado = searchParams.get('sport') || '';

  const [formData, setFormData] = useState({
    nombreReservante: '',
    correo: '',
    telefono: '',
    cantidadPersonas: 1,
    fechaHora: '',
    deporte: deporteSeleccionado
  });

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

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      deporte: deporteSeleccionado
    }));
  }, [deporteSeleccionado]);

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservas/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push(`/reservas?sport=${formData.deporte}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la reserva');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear la reserva. Por favor, intente nuevamente.');
    }
  };

  const deporteImages: Record<string, string> = {
    futbolito: '/futbolito.PNG',
    volleyball: '/editar_reserva_volley.png',
    tennis: '/editar_reserva_tennis.png',
    futbol: '/editar_reserva_futbol.png',
    basketball: '/editar_reserva_basket.png',
    pingpong: '/editar_reserva_ping.png',
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
        <h1 className="text-4xl font-bold mb-8 text-center">Realizar Reserva</h1>
        
        {formData.deporte && (
          <div className="flex justify-center mb-8">
            <img 
              src={deporteImages[formData.deporte]} 
              alt={formData.deporte} 
              className="w-32 h-32"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre del Reservante
            </label>
            <input
              type="text"
              value={formData.nombreReservante}
              onChange={(e) => setFormData({...formData, nombreReservante: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={formData.correo}
              onChange={(e) => setFormData({...formData, correo: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              placeholder="+573001234567"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cantidad de Personas
            </label>
            <input
              type="number"
              min="1"
              value={formData.cantidadPersonas}
              onChange={(e) => setFormData({...formData, cantidadPersonas: parseInt(e.target.value)})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Fecha y Hora
            </label>
            <input
              type="datetime-local"
              value={formData.fechaHora}
              onChange={(e) => setFormData({...formData, fechaHora: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Deporte
            </label>
            <select
              value={formData.deporte}
              onChange={(e) => setFormData({...formData, deporte: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Seleccione un deporte</option>
              <option value="futbol">Fútbol</option>
              <option value="basketball">Basketball</option>
              <option value="volleyball">Volleyball</option>
              <option value="tennis">Tennis</option>
              <option value="pingpong">Ping Pong</option>
              <option value="futbolito">Futbolito</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => router.push(`/reservas?sport=${formData.deporte}`)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Realizar Reserva
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReservarPage;