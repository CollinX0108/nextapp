"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      console.log('Datos de respuesta:', data);

      if (response.ok) {
        console.log('Login successful:', data);

        // Verifica el rol del usuario y redirige a la página correspondiente
        switch (data.user.role?.toLowerCase()) {
          case 'admin':
            router.push('/admin'); 
            break;
          case 'jugador':
            router.push('/jugador'); // Redirige a la página de jugador
            break;
          case 'entrenador':
            router.push('/entrenador'); // Redirige a la página de entrenador
            break;
          case 'arbitro':
            router.push('/arbitro'); // Redirige a la página de árbitro
            break;
          default:
            console.warn('Rol desconocido, redirigiendo a la página de inicio');
            router.push('/'); // Redirige a la página de inicio si el rol es desconocido
        }
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-full h-1/2 bg-blue-500"></div>
      <div className="w-full h-1/2 bg-white"></div>
      <div className="absolute flex justify-center items-center w-full h-full">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h2 className="text-blue-500 text-2xl font-bold mb-4">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Nombre de usuario</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de usuario"
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
            >
              Iniciar Sesión
            </button>
          </form>
          <div className="flex justify-between mt-4">
            <a href="#" className="text-blue-500 text-sm">¿Olvidaste la contraseña?</a>
            <a href="#" className="text-blue-500 text-sm">Registrarse</a>
          </div>
        </div>
      </div>
    </div>
  );
}
