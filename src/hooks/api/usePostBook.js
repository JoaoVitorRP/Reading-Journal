import useAsync from "../useAsync";

import * as booksApi from "../../services/api/booksApi";

export default function usePostBook() {
  const {
    loading: postBookLoading,
    error: postBookError,
    act: postBook,
  } = useAsync((book) => booksApi.postBook(book), false);

  return {
    postBookLoading,
    postBookError,
    postBook,
  };
}
