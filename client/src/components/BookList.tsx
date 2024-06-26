
import React, { useState, useCallback } from 'react';

interface Book {
  title: string;
  author: string;
  year: number;
}

interface BookListProps {
  books: Book[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(books.length / booksPerPage)));
  }, [books.length]);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const currentBooks = books.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  return (
    <div className='bg-slate-600'>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td >
                <button onClick={() => onEdit(index + (currentPage - 1) * booksPerPage)} className='bg-green-600 p-2 m-2 rounded-lg'>Edit</button>
                <button onClick={() => onDelete(index + (currentPage - 1) * booksPerPage)} className='bg-red-600 p-2 m-2 rounded-lg'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-between items-center mx-7 p-5'>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className='text-xl'> 👈🏻Previous</button>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(books.length / booksPerPage)} className='text-xl'>Next 👉🏻</button>
      </div>
    </div>
  );
};

export default BookList;
