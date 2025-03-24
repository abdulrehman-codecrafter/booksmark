"use client";
import { useBooksContext } from "@/contexts/booksContext";
import AddBookDialog from "@/components/add-book-dialog";
import { Trash, Edit, Loader2 } from "lucide-react";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
    const { books, loading, toggleComplete, deleteBook } = useBooksContext();
    const [globalLoading, setGlobalLoading] = useState(false);

    const handleToggleComplete = async (id, completed) => {
        setGlobalLoading(true);
        await toggleComplete(id, completed);
        setGlobalLoading(false);
    };

    const handleDeleteBook = async (id) => {
        setGlobalLoading(true);
        await deleteBook(id);
        setGlobalLoading(false);
    };

    return (
        <div className="p-6 min-h-[100vh] bg-gray-50 relative">
            {globalLoading && (
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-50">
                    <Loader2 className="animate-spin text-[#9e9e9e]" size={50} />
                </div>
            )}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Your Reading List
                </h1>
                <UserButton showName={true} />
                </div>

                <div className="mb-6">
                    <AddBookDialog />
                </div>

                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading ...</p>
                    </div>
                ) : books.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        <p>No books yet. Add some to get started!</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-6">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="shadow-md rounded-lg p-4 bg-white w-full md:w-[48%] lg:w-[30%]"
                            >
                                <h2 className=" text-[16.2px] font-semibold text-gray-800">
                                    {book.title}
                                </h2>
                                <p className="text-gray-500 text-sm mb-3">
                                    {book.description || "No description"}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`py-[2px] text-[13px] w-[90px] rounded-xl flex items-center justify-center gap-1 ${
                                            book.completed
                                                ? "bg-green-100 text-green-600 border border-green-300"
                                                : "bg-red-100 text-red-600 border border-red-300"
                                        }`}
                                    >
                                        {book.completed
                                            ? "Completed"
                                            : "Incomplete"}
                                    </span>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleToggleComplete(book.id, book.completed)}
                                            className="px-3 py-1.5 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBook(book.id)}
                                            className="px-3 py-1.5 bg-red-400 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
