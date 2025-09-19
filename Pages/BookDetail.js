
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Book } from "@/entities/Book";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Calendar, BookOpen, Edit, Sparkles, Users, TrendingUp } from "lucide-react";
import { createPageUrl } from "@/utils";

import BookCard from "../components/books/BookCard";
import BookForm from "../components/books/BookForm";
import RecommendationSection from "../components/books/RecommendationSection";

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

export default function BookDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [allBooks, setAllBooks] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Get book ID from URL params
    const urlParams = new URLSearchParams(location.search);
    const bookId = urlParams.get('id');

    const loadBookDetail = useCallback(async () => {
        try {
            const books = await Book.list();
            const foundBook = books.find(b => b.id === bookId);
            setBook(foundBook);
        } catch (error) {
            console.error('Error loading book:', error);
        }
        setLoading(false);
    }, [bookId]); // bookId is a dependency for loadBookDetail

    const loadAllBooks = useCallback(async () => {
        try {
            const books = await Book.list('-created_date');
            setAllBooks(books);
        } catch (error) {
            console.error('Error loading books:', error);
        }
    }, []); // No external dependencies, so an empty array

    useEffect(() => {
        if (bookId) {
            loadBookDetail();
            loadAllBooks();
        }
    }, [bookId, loadBookDetail, loadAllBooks]); // Add memoized functions to dependencies

    const handleEditBook = async (bookData) => {
        try {
            await Book.update(book.id, bookData);
            setBook({ ...book, ...bookData });
            setShowEditForm(false);
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleBookClick = (selectedBook) => {
        navigate(createPageUrl('BookDetail') + `?id=${selectedBook.id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 via-green-50 via-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <BookOpen className="w-12 h-12 text-purple-600" />
                </motion.div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 via-green-50 via-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-600 mb-2">Buku tidak ditemukan</h2>
                    <Button onClick={() => navigate(createPageUrl('BookCollection'))}>
                        Kembali ke Koleksi
                    </Button>
                </div>
            </div>
        );
    }

    const gradientClass = genreColors[book.genre] || "from-gray-400 to-gray-500";
    const sameGenreBooks = allBooks.filter(b => b.id !== book.id && b.genre === book.genre).slice(0, 6);
    const sameAuthorBooks = allBooks.filter(b => b.id !== book.id && b.author === book.author).slice(0, 6);

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 via-green-50 via-blue-50 via-indigo-50 to-purple-50">
            {/* Header dengan gradien pelangi */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-600 to-purple-600 opacity-90" />
                <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} opacity-20`} />
                
                <div className="relative px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <Button
                                variant="outline"
                                onClick={() => navigate(createPageUrl('BookCollection'))}
                                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali
                            </Button>
                            <div className="h-6 w-px bg-white/30" />
                            <h1 className="text-2xl md:text-3xl font-bold text-white">Detail Buku</h1>
                        </motion.div>

                        {/* Book Detail Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8"
                        >
                            <div className={`h-2 bg-gradient-to-r ${gradientClass} rounded-full mb-6`} />
                            
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                            {book.title}
                                        </h2>
                                        {book.is_trending && (
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <TrendingUp className="w-8 h-8 text-orange-500" />
                                            </motion.div>
                                        )}
                                    </div>
                                    <p className="text-xl text-gray-700 font-medium mb-6">
                                        oleh {book.author}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mb-6">
                                        <Badge className={`bg-gradient-to-r ${gradientClass} text-white border-0 shadow-sm text-base px-4 py-2`}>
                                            {book.genre}
                                        </Badge>
                                        
                                        {book.rating && (
                                            <Badge variant="outline" className="border-amber-300 text-amber-700 text-base px-4 py-2">
                                                <Star className="w-4 h-4 mr-2 fill-current" />
                                                {book.rating}/5
                                            </Badge>
                                        )}

                                        {book.is_trending && (
                                            <Badge className="bg-gradient-to-r from-orange-400 to-red-400 text-white border-0 shadow-sm text-base px-4 py-2">
                                                <Sparkles className="w-4 h-4 mr-2" />
                                                Trending
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    onClick={() => setShowEditForm(true)}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Buku
                                </Button>
                            </div>

                            {book.description && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Deskripsi</h3>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        {book.description}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                                {book.year_published && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Tahun Terbit</p>
                                            <p className="font-semibold text-lg">{book.year_published}</p>
                                        </div>
                                    </div>
                                )}
                                
                                {book.pages && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Jumlah Halaman</p>
                                            <p className="font-semibold text-lg">{book.pages} halaman}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Pengarang</p>
                                        <p className="font-semibold text-lg">{book.author}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-12">
                {/* Rekomendasi berdasarkan genre */}
                {sameGenreBooks.length > 0 && (
                    <RecommendationSection
                        title={`Buku ${book.genre} Lainnya`}
                        books={sameGenreBooks}
                        onBookClick={handleBookClick}
                        icon={Sparkles}
                        gradientFrom="from-purple-500"
                        gradientTo="to-pink-500"
                    />
                )}

                {/* Rekomendasi berdasarkan penulis */}
                {sameAuthorBooks.length > 0 && (
                    <RecommendationSection
                        title={`Buku Lain dari ${book.author}`}
                        books={sameAuthorBooks}
                        onBookClick={handleBookClick}
                        icon={Users}
                        gradientFrom="from-blue-500"
                        gradientTo="to-green-500"
                    />
                )}
            </div>

            {/* Edit Form Modal */}
            <AnimatePresence>
                {showEditForm && (
                    <BookForm
                        book={book}
                        onSubmit={handleEditBook}
                        onCancel={() => setShowEditForm(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
