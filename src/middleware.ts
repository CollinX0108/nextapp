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
  
      if (decoded.role !== 'admin') {
        console.log("Redirigiendo por rol no autorizado");
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  
    return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};