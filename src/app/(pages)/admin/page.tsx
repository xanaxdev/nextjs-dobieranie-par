"use client";

import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "123";

type Match = {
  users: string[];
  score: number;
};

export default function AdminPage() {
  const [input, setInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [finalized, setFinalized] = useState(false);
  const [pairs, setPairs] = useState<Match[]>([]);
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [resetStatus, setResetStatus] = useState<"idle" | "ok" | "fail">(
    "idle"
  );

  const checkPassword = () => {
    if (input === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Błędne hasło");
    }
  };

  const finalize = async () => {
    const res = await fetch("/api/finalize", { method: "POST" });
    if (res.ok) {
      setStatus("done");
      await loadPairs();
    } else setStatus("error");
  };

  const resetAll = async () => {
    const res = await fetch("/api/reset", { method: "POST" });
    if (res.ok) {
      setResetStatus("ok");
      setPairs([]);
      setFinalized(false);
    } else setResetStatus("fail");
  };

  const loadPairs = async () => {
    const res = await fetch("/api/match");
    const data = await res.json();
    setFinalized(data.finalized);
    setPairs(data.pairs || []);
  };

  useEffect(() => {
    if (authenticated) {
      loadPairs();
    }
  }, [authenticated]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {!authenticated ? (
        <div className="max-w-sm w-full space-y-4 text-center">
          <h1 className="text-2xl font-bold">Dostęp administratora</h1>
          <input
            type="password"
            placeholder="Wpisz hasło"
            className="w-full border px-4 py-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={checkPassword}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            Zaloguj
          </button>
        </div>
      ) : (
        <div className="max-w-2xl w-full space-y-6">
          <h1 className="text-3xl font-bold text-center">
            Panel administratora
          </h1>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={finalize}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Zakończ losowanie
            </button>
            <button
              onClick={resetAll}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Zresetuj system
            </button>
          </div>

          {status === "done" && (
            <p className="text-green-600 text-center">Losowanie zakończone!</p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-center">Błąd przy finalizacji!</p>
          )}
          {resetStatus === "ok" && (
            <p className="text-green-600 text-center">System wyczyszczony.</p>
          )}
          {resetStatus === "fail" && (
            <p className="text-red-600 text-center">Błąd podczas resetu!</p>
          )}

          {finalized && pairs.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Zakończone dopasowania
              </h2>
              <div className="space-y-2">
                {pairs.map((pair, idx) => (
                  <div
                    key={idx}
                    className="bg-white border rounded px-4 py-2 shadow flex justify-between items-center"
                  >
                    <span className="text-gray-800 font-medium">
                      {pair.users.join(" 🤝 ")}
                    </span>
                    <span className="text-sm text-gray-500">{pair.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
