import useAsync from "../useAsync";

import * as booksApi from "../../services/api/booksApi";

export default function useDeleteBook() {
  const {
    loading: deleteBookLoading,
    error: deleteBookError,
    act: deleteBook,
  } = useAsync((book) => booksApi.deleteBook(book), false);

  return {
    deleteBookLoading,
    deleteBookError,
    deleteBook,
  };
}
