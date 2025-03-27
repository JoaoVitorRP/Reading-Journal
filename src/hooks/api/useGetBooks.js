import useAsync from "../useAsync";

import * as booksApi from "../../services/api/booksApi";

export default function useGetBooks() {
  const { loading: getBooksLoading, error: getBooksError, act: getBooks } = useAsync(() => booksApi.getBooks(), false);

  return {
    getBooksLoading,
    getBooksError,
    getBooks,
  };
}
