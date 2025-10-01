import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await dbConnect(); // Conectar a la base de datos

    const data = await request.json();

    // Mongoose se encargará de la validación básica definida en el esquema
    // (campos requeridos, email único, etc.)
    
    // El hasheo de la contraseña se hace automáticamente gracias al pre-save hook en el modelo
    const newUser = await User.create(data);

    return NextResponse.json({ message: 'Usuario registrado con éxito', user: newUser }, { status: 201 });

  } catch (e) {
    console.error(e);
    
    let errorMessage = 'Ocurrió un error desconocido';
    let statusCode = 500;

    // Manejo de errores específicos de Mongoose
    if (e instanceof Error) {
        if (e.name === 'ValidationError') {
            errorMessage = (e as any).message; // Proporciona mensajes de validación más detallados
            statusCode = 400;
        } else if ((e as any).code === 11000) { // Error de duplicado (ej. email)
            errorMessage = 'El correo electrónico ya está registrado.';
            statusCode = 409; // Conflict
        } else {
            errorMessage = e.message;
        }
    }
    
    return NextResponse.json({ message: 'Error al registrar el usuario', error: errorMessage }, { status: statusCode });
  }
}