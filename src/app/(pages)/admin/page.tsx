"use client";

import { useState } from "react";

const ADMIN_PASSWORD = "123456987";

export default function AdminPage() {
  const [input, setInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  const checkPassword = () => {
    if (input === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Błędne hasło");
    }
  };

  const finalize = async () => {
    const res = await fetch("/api/finalize", { method: "POST" });
    if (res.ok) setStatus("done");
    else setStatus("error");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
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
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold mb-4">Panel administratora</h1>
          <button
            onClick={finalize}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
          >
            Zakończ losowanie
          </button>
          {status === "done" && (
            <p className="text-green-600 mt-2">
              Losowanie zakończone! Pary są już widoczne.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 mt-2">Wystąpił błąd podczas zapisu.</p>
          )}
        </div>
      )}
    </div>
  );
}
