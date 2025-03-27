import useAsync from "../useAsync";

import * as booksApi from "../../services/api/booksApi";

export default function useEditBook() {
  const {
    loading: editBookLoading,
    error: editBookError,
    act: editBook,
  } = useAsync((book) => booksApi.editBook(book), false);

  return {
    editBookLoading,
    editBookError,
    editBook,
  };
}
