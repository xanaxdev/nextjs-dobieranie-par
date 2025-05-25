"use client";

import { useEffect, useState } from "react";

type Pair = {
  users: string[];
  score: number;
};

export default function PairsPage() {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [finalized, setFinalized] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPairs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/match");
      const data = await res.json();
      setPairs(data.pairs || []);
      setFinalized(data.finalized || false);
    } catch (err) {
      console.error("Błąd ładowania par:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPairs();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Ładowanie...</p>;
  }

  if (!finalized) {
    return (
      <div className="text-center mt-12 px-4">
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          Dobieranie par trwa
        </h1>
        <p className="text-gray-500 mb-4">
          Pary będą widoczne, gdy losowanie zostanie zakończone.
        </p>
        <button
          onClick={fetchPairs}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Odśwież
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Aktualne dopasowania
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={fetchPairs}
          className="text-sm text-blue-600 hover:underline"
        >
          🔄 Odśwież dane
        </button>
      </div>

      {pairs.length === 0 ? (
        <p className="text-center text-gray-500">Brak sparowanych osób.</p>
      ) : (
        <div className="grid gap-4">
          {pairs.map((pair, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm"
            >
              <span className="text-lg font-medium text-gray-800">
                {pair.users.join(" 🤝 ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
