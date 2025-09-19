
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book } from "@/entities/Book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookPlus, Search, Filter, BookOpen, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom"; // Added import
import { createPageUrl } from "@/utils"; // Added import

import BookCard from "../components/books/BookCard";
import TrendingSection from "../components/books/TrendingSection";
import BookForm from "../components/books/BookForm";

export default function BookCollectionPage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterGenre, setFilterGenre] = useState("all");
    // const [selectedBook, setSelectedBook] = useState(null); // Removed, as detail view will be a new page

    const navigate = useNavigate(); // Added useNavigate hook

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        setLoading(true);
        try {
            const fetchedBooks = await Book.list('-created_date');
            setBooks(fetchedBooks);
        } catch (error) {
            console.error('Error loading books:', error);
        }
        setLoading(false);
    };

    const handleSubmit = async (bookData) => {
        try {
            if (editingBook) {
                await Book.update(editingBook.id, bookData);
            } else {
                await Book.create(bookData);
            }
            setShowForm(false);
            setEditingBook(null);
            loadBooks();
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    const handleEditBook = (book) => {
        setEditingBook(book);
        setShowForm(true);
    };

    const handleBookClick = (book) => {
        navigate(createPageUrl('BookDetail') + `?id=${book.id}`);
    };

    const trendingBooks = books.filter(book => book.is_trending);
    
    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = filterGenre === "all" || book.genre === filterGenre;
        return matchesSearch && matchesGenre;
    });

    const genres = [...new Set(books.map(book => book.genre))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 via-green-50 via-blue-50 via-indigo-50 to-purple-50">
            {/* Header dengan gradien rainbow */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-600 to-purple-600 opacity-90" />
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-red-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob" />
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000" />
                <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-green-300 to-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000" />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000" />
                
                <div className="relative px-6 py-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <div className="flex justify-center mb-4">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 via-blue-200 to-purple-200 rounded-full blur-lg opacity-60" />
                                    <BookOpen className="w-16 h-16 text-white relative z-10" />
                                </motion.div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                                Koleksi Buku Saya
                            </h1>
                            <p className="text-xl text-white/95 max-w-2xl mx-auto drop-shadow-md">
                                Jelajahi dunia literatur dalam koleksi personal yang penuh warna
                            </p>
                            <div className="mt-6">
                                <Badge variant="outline" className="bg-white/20 text-white border-white/40 backdrop-blur-sm text-base font-medium px-4 py-2 shadow-lg">
                                    Total {books.length} Buku dalam Koleksi
                                </Badge>
                            </div>
                        </motion.div>

                        {/* Search dan Filter */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto"
                        >
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    placeholder="Cari judul atau pengarang..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/95 backdrop-blur-sm border-0 shadow-xl text-lg focus:ring-2 focus:ring-white/50"
                                />
                            </div>
                            
                            <Select value={filterGenre} onValueChange={setFilterGenre}>
                                <SelectTrigger className="w-full md:w-48 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Semua Genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Genre</SelectItem>
                                    {genres.map(genre => (
                                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                onClick={() => setShowForm(true)}
                                className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:bg-white/90 shadow-xl border-0 px-8 font-semibold"
                                style={{ backgroundColor: 'white', color: '#7c3aed' }}
                            >
                                <BookPlus className="w-5 h-5 mr-2" />
                                Tambah Buku
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Trending Books Section */}
                <TrendingSection 
                    trendingBooks={trendingBooks}
                    onBookClick={handleBookClick}
                />

                {/* All Books Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                        <h2 className="text-3xl font-bold text-gray-900">
                            Semua Koleksi ({filteredBooks.length} buku)
                        </h2>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-gray-200 rounded-lg h-64"></div>
                                </div>
                            ))}
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                                {searchTerm || filterGenre !== "all" ? "Tidak ada buku yang cocok" : "Belum ada koleksi"}
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {searchTerm || filterGenre !== "all" ? "Coba ubah pencarian atau filter" : "Mulai tambahkan buku pertama ke koleksi Anda"}
                            </p>
                            {!searchTerm && filterGenre === "all" && (
                                <Button
                                    onClick={() => setShowForm(true)}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                >
                                    <BookPlus className="w-5 h-5 mr-2" />
                                    Tambah Buku Pertama
                                </Button>
                            )}
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredBooks.map((book, index) => (
                                    <motion.div
                                        key={book.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <BookCard 
                                            book={book} 
                                            onClick={handleBookClick}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.section>
            </div>

            {/* Book Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <BookForm
                        book={editingBook}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingBook(null);
                        }}
                    />
                )}
            </AnimatePresence>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animation-delay-6000 {
                    animation-delay: 6s;
                }
            `}</style>
        </div>
    );
}
