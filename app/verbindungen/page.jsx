// Verwendet in einer Next.js-Komponente
"use client";
import React, { useEffect, useState } from 'react';

const VerbindungenPage = () => {
    const [verbindungen, setVerbindungen] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVerbindungen = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/verbindungen/read');
                if (!response.ok) throw new Error('Daten konnten nicht geladen werden');
                const data = await response.json();
                setVerbindungen(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchVerbindungen();
    }, []);

    if (isLoading) return <div>Laden...</div>;
    if (error) return <div>Fehler: {error}</div>;

    return (
        <div>
            {verbindungen.map((verbindung, index) => (
                <div key={index}>{verbindung.name}</div> // Angenommen, 'name' ist ein Feld im Verbindung-Objekt
            ))}
        </div>
    );
};

export default VerbindungenPage;
