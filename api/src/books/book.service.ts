import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TIBook, TSIBook, bookTable } from "../drizzle/schema";

// GET Book
export const getBookService = async (): Promise<TSIBook[] | null> => {
  const book = await db.query.bookTable.findMany();
  return book;
};

// GET book BY ID
export const getBookByIdService = async (id: number): Promise<TSIBook | undefined> => {
  const book = await db.query.bookTable.findFirst({
    where: eq(bookTable.id, id)
  });
  return book;
}

// CREATE book
export const createBookervice = async (book: TIBook) => {
  await db.insert(bookTable).values(book)
  return "book created successfully";
}

//  UPDATE book
export const updateBookervice = async (id: number, book: TIBook) => {
  await db.update(bookTable).set(book).where(eq(bookTable.id, id));
  return "book updated successfully";
}

// DELETE book
export const deleteBookervice = async (id: number) => {
  await db.delete(bookTable).where(eq(bookTable.id, id));
  return "book deleted successfully";
}