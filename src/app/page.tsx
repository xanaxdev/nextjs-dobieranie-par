"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
        Dopasuj się!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-2xl shadow-lg bg-white p-6 text-center hover:shadow-2xl transition cursor-pointer"
        >
          <Link href="/submit">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl md:text-2xl font-semibold text-blue-600">
                Zostań dopasowany
              </span>
              <p className="text-sm text-gray-500">
                Wypełnij prosty formularz, a znajdziemy Ci parę!
              </p>
            </div>
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-2xl shadow-lg bg-white p-6 text-center hover:shadow-2xl transition cursor-pointer"
        >
          <Link href="/pairs">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl md:text-2xl font-semibold text-purple-600">
                Sprawdź dopasowania
              </span>
              <p className="text-sm text-gray-500">
                Zobacz aktualnie dopasowane pary!
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
