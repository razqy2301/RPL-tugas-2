import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, BookOpen, TrendingUp } from "lucide-react";

const genreColors = {
    "Fiksi": "from-purple-400 to-pink-400",
    "Non-Fiksi": "from-blue-400 to-cyan-400",
    "Romance": "from-pink-400 to-rose-400",
    "Mystery": "from-gray-500 to-slate-600",
    "Sci-Fi": "from-cyan-400 to-blue-500",
    "Fantasy": "from-violet-400 to-purple-500",
    "Biography": "from-green-400 to-emerald-400",
    "History": "from-amber-400 to-orange-400",
    "Self-Help": "from-teal-400 to-green-400",
    "Horror": "from-red-500 to-red-600",
    "Thriller": "from-orange-500 to-red-500",
    "Comedy": "from-yellow-400 to-orange-400"
};

export default function BookCard({ book, onClick }) {
    const gradientClass = genreColors[book.genre] || "from-gray-400 to-gray-500";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => onClick?.(book)}
            className="cursor-pointer"
        >
            <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0">
                <div className={`h-2 bg-gradient-to-r ${gradientClass}`} />
                
                <CardHeader className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <h3 className="font-bold text-xl text-gray-900 mb-2 leading-tight">
                                {book.title}
                            </h3>
                            <p className="text-gray-600 font-medium mb-3">oleh {book.author}</p>
                        </div>
                        {book.is_trending && (
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <TrendingUp className="w-6 h-6 text-orange-500" />
                            </motion.div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge 
                            className={`bg-gradient-to-r ${gradientClass} text-white border-0 shadow-sm`}
                        >
                            {book.genre}
                        </Badge>
                        
                        {book.rating && (
                            <Badge variant="outline" className="border-amber-300 text-amber-700">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                {book.rating}
                            </Badge>
                        )}
                    </div>

                    {book.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                            {book.description}
                        </p>
                    )}
                </CardHeader>

                <CardContent className="px-6 pb-6">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        {book.year_published && (
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {book.year_published}
                            </div>
                        )}
                        
                        {book.pages && (
                            <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                {book.pages} hal
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}