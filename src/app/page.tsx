"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4 py-8">
      <div className="text-center space-y-10 max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Dopasuj się z kimś idealnym
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl shadow-lg bg-white p-6 hover:shadow-xl transition"
          >
            <Link href="/submit">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-semibold text-blue-600">
                  Zostań dopasowany
                </span>
                <p className="text-sm text-gray-500 text-center">
                  Wypełnij krótki formularz i znajdź kogoś, kto do Ciebie
                  pasuje.
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl shadow-lg bg-white p-6 hover:shadow-xl transition"
          >
            <Link href="/pairs">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-semibold text-purple-600">
                  Sprawdź dopasowania
                </span>
                <p className="text-sm text-gray-500 text-center">
                  Zobacz listę aktualnych sparowań
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
