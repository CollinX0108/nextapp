import { jwtDecode } from 'jwt-decode'; // Asegúrate de que sea la importación por defecto
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    console.log("Token:", token); // Verificar si el token se obtiene
  
    if (!token) {
      console.log("Redirigiendo por falta de token");
      return NextResponse.redirect(new URL('/', request.url));
    }
  
    try {
      const decoded = jwtDecode<{ role: string }>(token);
      console.log("Token decodificado:", decoded); // Verificar el contenido del token

      const { pathname } = new URL(request.url);

      // Verificar roles específicos para rutas específicas
      if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
        console.log("Redirigiendo por rol no autorizado para admin");
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Puedes agregar más verificaciones de rol para otras rutas si es necesario
      // if (pathname.startsWith('/jugador') && decoded.role !== 'jugador') {
      //   console.log("Redirigiendo por rol no autorizado para jugador");
      //   return NextResponse.redirect(new URL('/', request.url));
      // }

    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/jugador/:path*',
    '/entrenador/:path*',
    '/arbitro/:path*',
    '/reservas/:path*'
  ],
};