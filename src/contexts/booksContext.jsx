"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useReducer } from "react";
import { useUser } from "@clerk/nextjs";

const BooksContext = createContext(undefined);

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_BOOKS":
            return { ...state, books: action.payload, loading: false };
        case "ADD_BOOK":
            return { ...state, books: [...state.books, action.payload] };
        case "UPDATE_BOOK":
            return {
                ...state,
                books: state.books.map((book) =>
                    book.id === action.payload.id ? action.payload : book
                ),
            };
        case "DELETE_BOOK":
            return {
                ...state,
                books: state.books.filter((book) => book.id !== action.payload),
            };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

const initialState = {
    books: [],
    loading: true,
};

export default function BooksProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user } = useUser();
    const fetchBooks = async () => {
        if (!user) return;
        try {
            const res = await axios.get("/api/books");
            dispatch({ type: "SET_BOOKS", payload: res.data });
        } catch (err) {
            console.error("Error fetching books:", err);
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    const addBook = async (title, description) => {
        try {
            const res = await axios.post("/api/books", { title, description });
            dispatch({ type: "ADD_BOOK", payload: res.data });
        } catch (err) {
            console.error("Error adding book:", err);
            throw err;
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            const res = await axios.patch(`/api/books/${id}`, {
                completed: !completed,
            });
            dispatch({ type: "UPDATE_BOOK", payload: res.data });
        } catch (err) {
            console.error("Error updating book:", err);
            throw err;
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`/api/books/${id}`);
            dispatch({ type: "DELETE_BOOK", payload: id });
        } catch (err) {
            console.error("Error deleting book:", err);
            throw err;
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [user]);

    return (
        <BooksContext.Provider
            value={{
                books: state.books,
                loading: state.loading,
                dispatch,
                addBook,
                toggleComplete,
                deleteBook,
            }}
        >
            {children}
        </BooksContext.Provider>
    );
}

export const useBooksContext = () => useContext(BooksContext);
