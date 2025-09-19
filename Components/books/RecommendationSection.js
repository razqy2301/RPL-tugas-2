import React from "react";
import { motion } from "framer-motion";
import BookCard from "./BookCard";

export default function RecommendationSection({ 
    title, 
    books, 
    onBookClick, 
    icon: Icon, 
    gradientFrom, 
    gradientTo 
}) {
    if (!books || books.length === 0) return null;

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
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Icon className={`w-8 h-8 bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`} />
                        </motion.div>
                    </div>
                    <h2 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
                        {title} ({books.length})
                    </h2>
                </div>
                <p className="text-gray-600 text-lg">
                    Rekomendasi buku yang mungkin Anda sukai
                </p>
                <div className={`absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r ${gradientFrom.replace('from-', 'from-').replace('-500', '-200')} ${gradientTo.replace('to-', 'to-').replace('-500', '-200')} rounded-full blur-xl opacity-30`} />
                <div className={`absolute -bottom-4 right-10 w-16 h-16 bg-gradient-to-r ${gradientFrom.replace('from-', 'from-').replace('-500', '-300')} ${gradientTo.replace('to-', 'to-').replace('-500', '-300')} rounded-full blur-xl opacity-30`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book, index) => (
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