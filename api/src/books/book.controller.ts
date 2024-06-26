import { Context } from "hono";
import { getBookService, getBookByIdService, createBookervice, updateBookervice, deleteBookervice } from "./book.service";

export const getBooksController = async (c: Context) => {
    try {
        const books = await getBookService();
        if (books == null || books.length == 0) {
            return c.text("No books found", 404);
        }
        return c.json(books, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }
};

// get book by id
export const getBookByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const book = await getBookByIdService(id);
        if (book == null) {
            return c.text("book not found", 404);
        }
        return c.json(book, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create book
export const createBookController = async (c: Context) => {
    try {
        const book = await c.req.json();
        const newbook = await createBookervice(book);

        if (!newbook) return c.text("book not created", 400);
        return c.json({ message: newbook }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update book
export const updateBookController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const book = await c.req.json();

        // search for user by id
        const updatedbook = await getBookByIdService(id);
        if (!updatedbook) return c.text("book not found", 404);

        // get data to update
        const res = await updateBookervice(id, book);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete book
export const deleteBookController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for book by id
        const book = await getBookByIdService(id);
        if (!book) return c.text("book not found", 404);

        // delete book
        const res = await deleteBookervice(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};