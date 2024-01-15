// Verwendet in einer Next.js-Komponente
"use client";
// pages/verbindungen/index.jsx

import React, { useEffect, useState } from 'react';

export default function VerbindungenPage() {
  const [verbindungen, setVerbindungen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({ ort: '', verbindungsart: '', status: '' });
  const [orte, setOrte] = useState([]);
  const [verbindungsarten, setVerbindungsarten] = useState([]);
  const [statusOptionen, setStatusOptionen] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/verbindungen/read');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const uniqueOrte = Array.from(new Set(data.map(item => item.ort)));
      const uniqueVerbindungsarten = Array.from(new Set(data.map(item => item.verbindungsart)));
      const uniqueStatusOptionen = Array.from(new Set(data.map(item => item.status)));

      setOrte(uniqueOrte);
      setVerbindungsarten(uniqueVerbindungsarten);
      setStatusOptionen(uniqueStatusOptionen);
      setVerbindungen(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredVerbindungen = verbindungen.filter(verbindung =>
    (filter.ort === '' || verbindung.ort === filter.ort) &&
    (filter.verbindungsart === '' || verbindung.verbindungsart === filter.verbindungsart) &&
    (filter.status === '' || verbindung.status === filter.status)
  );

  if (isLoading) return <p>Lade...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold text-center mb-4">Verbindungen</h1>
      <div className="flex flex-col md:flex-row justify-center mb-4 gap-2">
        {/* Ort Dropdown */}
        <select
          name="ort"
          value={filter.ort}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Ort wählen</option>
          {orte.map((ort, index) => (
            <option key={index} value={ort}>{ort}</option>
          ))}
        </select>

        {/* Verbindungsart Dropdown */}
        <select
          name="verbindungsart"
          value={filter.verbindungsart}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Verbindungsart wählen</option>
          {verbindungsarten.map((verbindungsart, index) => (
            <option key={index} value={verbindungsart}>{verbindungsart}</option>
          ))}
        </select>

        {/* Status Dropdown */}
        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Status wählen</option>
          {statusOptionen.map((status, index) => (
            <option key={index} value={status}>{status}</option>
))}
</select>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{filteredVerbindungen.map((verbindung, index) => (
<div key={index} className="rounded-lg bg-gray-300 p-4">
<p className="text-center font-semibold">{verbindung.name}</p>
{/* Weitere Details hier, falls benötigt */}
</div>
))}
</div>
</div>
);
}

