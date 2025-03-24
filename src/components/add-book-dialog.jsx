"use client";
import { useState } from "react"; 
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { useBooksContext } from "@/contexts/booksContext";
import { Loader, Loader2 } from "lucide-react";

const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(100),
    description: z.string().max(500).optional(),
});

export default function AddBookDialog() {
    const { addBook } = useBooksContext();
    const [open, setOpen] = useState(false); 
    const [loading,setLoading]=useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            await addBook(data.title, data.description || "");
            form.reset();
            setOpen(false); 
        } catch (error) {
            console.error("Error adding book:", error);
        }
        finally{
            setLoading(false)
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}> 
            <DialogTrigger asChild>
                <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    onClick={() => setOpen(true)} 
                >
                    + Add New Book
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-xl">
                <DialogHeader className="my-4">
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        
                        Add a New Book

                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter book title"
                                            {...field}
                                            value={field.value || ""}
                                            className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md transition-all duration-200"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter description (optional)"
                                            {...field}
                                            value={field.value || ""}
                                            className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md transition-all duration-200 resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-sm" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-200"
                        >
                            {
                            loading && <Loader2 className="animate-spin" size={18} />
                        }
                            Add Book
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}