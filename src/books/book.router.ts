import { Hono } from 'hono'
import { getBooksController, getBookByIdController, createBookController, updateBookController, deleteBookController } from './book.controller';
import { zValidator } from '@hono/zod-validator';
import { bookSchema } from '../validators';


export const bookRouter = new Hono()

// get all books
bookRouter
    .get("books", getBooksController)
    .post("books", zValidator('json', bookSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createBookController)

// get state by id
bookRouter
    .get("books/:id", getBookByIdController)
    .put("books/:id", zValidator('json', bookSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateBookController)
    .delete("books/:id", deleteBookController)

