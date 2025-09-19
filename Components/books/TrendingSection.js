
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";
import BookCard from "./BookCard";

export default function TrendingSection({ trendingBooks, onBookClick }) {
    if (!trendingBooks || trendingBooks.length === 0) {
        return null;
    }

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
        >
            <div className="relative mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-8 h-8 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent" />
                        </motion.div>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                        Buku Trending ({trendingBooks.length})
                    </h2>
                    <TrendingUp className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent" />
                </div>
                <p className="text-gray-600 text-lg">
                    Buku-buku yang sedang populer dan banyak dibaca
                </p>
                <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full blur-xl opacity-40" />
                <div className="absolute -bottom-4 right-10 w-16 h-16 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 rounded-full blur-xl opacity-40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingBooks.map((book, index) => (
                    <motion.div
                        key={book.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <BookCard book={book} onClick={onBookClick} />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
