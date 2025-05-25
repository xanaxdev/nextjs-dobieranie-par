"use client";

import { useEffect, useState } from "react";
import { questions } from "@/lib/questions/questions";

export function useSubmitForm() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0); // 0 = imię, potem pytania

  const [nameTaken, setNameTaken] = useState(false);
  const [suggestedName, setSuggestedName] = useState<string | null>(null);

  const isComplete =
    !!name.trim() && Object.keys(answers).length === questions.length;
  const currentQuestion =
    step > 0 && step <= questions.length ? questions[step - 1] : null;

  // 🔍 Sprawdź czy imię istnieje
  useEffect(() => {
    if (!name.trim()) return;

    const timeout = setTimeout(async () => {
      const res = await fetch(
        `/api/check-name?name=${encodeURIComponent(name)}`
      );
      const data = await res.json();

      if (data.exists) {
        setNameTaken(true);
        const suffix = Math.floor(100 + Math.random() * 900);
        setSuggestedName(`${name}${suffix}`);
      } else {
        setNameTaken(false);
        setSuggestedName(null);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [name]);

  const handleChange = (questionId: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const goNext = () => {
    if (step === 0 && (!name.trim() || nameTaken)) return;
    if (step > 0 && !answers[currentQuestion!.id]) return;
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (isSubmitting || !isComplete) return;
    setIsSubmitting(true);

    try {
      const payload = {
        name,
        answers: questions.map((q) => ({
          questionId: q.id,
          value: Array.isArray(answers[q.id])
            ? answers[q.id].join(",")
            : answers[q.id],
        })),
      };

      await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Błąd wysyłania:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    nameTaken,
    suggestedName,
    answers,
    submitted,
    isSubmitting,
    step,
    currentQuestion,
    handleChange,
    handleSubmit,
    goNext,
    isComplete,
    questions,
  };
}
