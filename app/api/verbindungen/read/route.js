// Importiere Mongoose und dein Modell
import { connectToDB } from '@utils/database';
import Verbindung from '@models/verbindungen'; // Stelle sicher, dass der Pfad zu deinem Modell korrekt ist
import { NextResponse } from 'next/server';

// Stelle eine Verbindung zu MongoDB her (normalerweise in einer separaten Datei)

export const GET = async (request) => {
try {
    await connectToDB();
    const verbindungen = await Verbindung.find();
    return new NextResponse(JSON.stringify(verbindungen), {status: 200});
} catch (error) {
    return new NextResponse("Error in fetchning posts " + error, {status: 500});
}
}