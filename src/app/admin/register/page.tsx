"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function RegisterAdminPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = Cookies.get('token'); // Obtén el token de las cookies
      console.log('Token JWT:', token); // Verifica que el token no sea undefined

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado
        },
        body: JSON.stringify({ ...formData, role: 'admin' }),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        const data = await response.json();
        setError(data.message || 'Error al registrar administrador');
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-full h-1/2 bg-blue-500"></div>
      <div className="w-full h-1/2 bg-white"></div>
      <div className="absolute flex justify-center items-center w-full h-full">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h2 className="text-blue-500 text-2xl font-bold mb-4">Registrar Administrador</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Nombre de usuario
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Nombre de usuario"
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="correo@ejemplo.com"
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Contraseña"
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}