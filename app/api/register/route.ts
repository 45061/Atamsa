import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.email || !data.password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const dbName = process.env.MONGODB_DBNAME;

    if (!dbName) {
      throw new Error('Por favor, añade la variable MONGODB_DBNAME a tu archivo .env.local');
    }

    const db = client.db(dbName);
    const collection = db.collection('atamsa');

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 es el número de rondas de salting

    const newUser = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newUser);

    return NextResponse.json({ message: 'Usuario registrado con éxito', userId: result.insertedId }, { status: 201 });

  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error desconocido';
    return NextResponse.json({ message: 'Error al registrar el usuario', error: errorMessage }, { status: 500 });
  }
}
