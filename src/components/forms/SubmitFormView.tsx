"use client";

import Link from "next/link";

type Question = {
  id: number;
  question: string;
  type: "single" | "multiple" | "text";
  options?: string[];
};

type SubmitFormViewProps = {
  name: string;
  setName: (val: string) => void;
  nameTaken: boolean;
  suggestedName: string | null;
  answers: Record<number, string | string[]>;
  currentQuestion: Question | null;
  handleChange: (id: number, val: string | string[]) => void;
  handleSubmit: () => void;
  goNext: () => void;
  step: number;
  submitted: boolean;
  isSubmitting: boolean;
  questions: Question[];
};

export default function SubmitFormView({
  name,
  setName,
  nameTaken,
  suggestedName,
  answers,
  currentQuestion,
  handleChange,
  handleSubmit,
  goNext,
  step,
  submitted,
  isSubmitting,
  questions,
}: SubmitFormViewProps) {
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Właśnie szukamy dla Ciebie pary!
        </h1>
        <p className="text-gray-700 mb-6">
          Możesz już sprawdzić swoje dopasowanie.
        </p>
        <Link
          href="/pairs"
          className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
        >
          Zobacz dopasowania
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Zostań dopasowany</h1>

      {/* Krok 0 – imię */}
      {step === 0 && (
        <>
          <label className="block mb-2 font-medium">Jak masz na imię?</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
          />
          {nameTaken && (
            <p className="text-red-600 text-sm mb-2">
              Imię zajęte. Proponujemy: <strong>{suggestedName}</strong>
            </p>
          )}
          <button
            onClick={goNext}
            disabled={!name.trim() || nameTaken}
            className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            Dalej
          </button>
        </>
      )}

      {/* Krok 1..n – pytania */}
      {step > 0 && step <= questions.length && currentQuestion && (
        <>
          <p className="text-lg font-semibold mb-4">
            {currentQuestion.question}
          </p>

          {currentQuestion.type === "single" &&
            currentQuestion.options?.map((opt) => (
              <label key={opt} className="block mb-2">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  checked={answers[currentQuestion.id] === opt}
                  onChange={() => handleChange(currentQuestion.id, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}

          {currentQuestion.type === "multiple" &&
            currentQuestion.options?.map((opt) => (
              <label key={opt} className="block mb-2">
                <input
                  type="checkbox"
                  checked={(answers[currentQuestion.id] as string[])?.includes(
                    opt
                  )}
                  onChange={(e) => {
                    const prev =
                      (answers[currentQuestion.id] as string[]) || [];
                    const updated = e.target.checked
                      ? [...prev, opt]
                      : prev.filter((v) => v !== opt);
                    handleChange(currentQuestion.id, updated);
                  }}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}

          {currentQuestion.type === "text" && (
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows={3}
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
            />
          )}

          <button
            onClick={goNext}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            Dalej
          </button>
        </>
      )}

      {/* Podsumowanie */}
      {step > questions.length && (
        <>
          <p className="text-lg font-semibold mb-4">Wszystko gotowe!</p>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            {isSubmitting ? "Wysyłanie..." : "Wyślij"}
          </button>
        </>
      )}
    </div>
  );
}
