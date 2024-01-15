// Importiere Mongoose und dein Modell
import { connectToDB } from '@utils/database';
import Verbindung from '@models/verbindungen'; // Stelle sicher, dass der Pfad zu deinem Modell korrekt ist

// Stelle eine Verbindung zu MongoDB her (normalerweise in einer separaten Datei)
connectToDB();

// API-Route für GET-Anfragen
export async function get(req, res) {
    try {
        // Suche alle Verbindungen in der Datenbank
        const verbindungen = await Verbindung.find({});

        // Sende die Daten als JSON zurück
        res.status(200).json(verbindungen);
    } catch (error) {
        // Im Fehlerfall sende einen 500-Statuscode
        res.status(500).json({ error: error.message });
    }
}

// Beachte: Du solltest die Datenbankverbindung in einer separaten Datei verwalten und nicht bei jeder Anfrage neu herstellen.
