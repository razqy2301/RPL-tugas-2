import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BookPlus, X, Star } from "lucide-react";

const genres = ["Fiksi", "Non-Fiksi", "Romance", "Mystery", "Sci-Fi", "Fantasy", "Biography", "History", "Self-Help", "Horror", "Thriller", "Comedy"];

export default function BookForm({ onSubmit, onCancel, book }) {
    const [formData, setFormData] = useState(book || {
        title: "",
        author: "",
        genre: "",
        cover_url: "",
        rating: 5,
        year_published: new Date().getFullYear(),
        description: "",
        is_trending: false,
        pages: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={onCancel}
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                <Card className="shadow-2xl border-0">
                    <div className="h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400" />
                    
                    <CardHeader className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onCancel}
                            className="absolute right-4 top-4"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                        
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <BookPlus className="w-8 h-8 text-purple-600" />
                            {book ? "Edit Buku" : "Tambah Buku Baru"}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul Buku *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="Masukkan judul buku"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="author">Pengarang *</Label>
                                    <Input
                                        id="author"
                                        value={formData.author}
                                        onChange={(e) => handleInputChange('author', e.target.value)}
                                        placeholder="Nama pengarang"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="genre">Genre *</Label>
                                    <Select
                                        value={formData.genre}
                                        onValueChange={(value) => handleInputChange('genre', value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih genre" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {genres.map((genre) => (
                                                <SelectItem key={genre} value={genre}>
                                                    {genre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="rating">Rating</Label>
                                    <div className="flex items-center gap-2">
                                        <Select
                                            value={formData.rating?.toString()}
                                            onValueChange={(value) => handleInputChange('rating', parseInt(value))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Rating" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <SelectItem key={rating} value={rating.toString()}>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 fill-current text-amber-500" />
                                                            {rating}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year">Tahun Terbit</Label>
                                    <Input
                                        id="year"
                                        type="number"
                                        value={formData.year_published}
                                        onChange={(e) => handleInputChange('year_published', parseInt(e.target.value))}
                                        placeholder="2024"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="pages">Jumlah Halaman</Label>
                                    <Input
                                        id="pages"
                                        type="number"
                                        value={formData.pages}
                                        onChange={(e) => handleInputChange('pages', parseInt(e.target.value))}
                                        placeholder="350"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cover_url">URL Cover</Label>
                                    <Input
                                        id="cover_url"
                                        type="url"
                                        value={formData.cover_url}
                                        onChange={(e) => handleInputChange('cover_url', e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Deskripsi singkat tentang buku..."
                                    rows={3}
                                />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Switch
                                    id="trending"
                                    checked={formData.is_trending}
                                    onCheckedChange={(checked) => handleInputChange('is_trending', checked)}
                                />
                                <Label htmlFor="trending">Buku Trending</Label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onCancel}
                                    className="flex-1"
                                >
                                    Batal
                                </Button>
                                <Button 
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                >
                                    {book ? "Update" : "Simpan"} Buku
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}