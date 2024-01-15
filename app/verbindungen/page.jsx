// Verwendet in einer Next.js-Komponente
"use client";
// pages/verbindungen/index.jsx
// pages/verbindungen/index.jsx

import React, { useEffect, useState } from 'react';

export default function VerbindungenPage() {
  const [verbindungen, setVerbindungen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/verbindungen/read');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      console.log(text); // Überprüfe die rohe Antwort
      const data = JSON.parse(text);
      setVerbindungen(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) return <p>Lade...</p>;

  return (
    <div>
      <h1>Verbindungen</h1>
      <div className="grid grid-cols-1 gap-4">
        {verbindungen.map((verbindung, index) => (
          <div key={index} className="rounded-lg bg-gray-300 p-4">
            {/* Zeige die Daten der Verbindung an. Passt die Felder entsprechend deinem Schema an. */}
            <p>{verbindung.name}</p>
            <p>{verbindung.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
