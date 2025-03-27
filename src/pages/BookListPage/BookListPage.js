import { useEffect, useState } from "react";
import BookList from "../../components/BookList/BookList";
import useGetBooks from "../../hooks/api/useGetBooks";
import { toast } from "react-toastify";

export default function BookListPage() {
  const [bookList, setBookList] = useState([]);
  const [updateHappened, setUpdateHappened] = useState();

  const { getBooks } = useGetBooks();

  useEffect(() => {
    async function fetchData() {
      try {
        const bookList = await getBooks();

        setBookList(bookList);
      } catch (err) {
        toast.error(`Ocorreu um erro ao buscar a lista de livros: ${err.message}`);
      }
    }

    fetchData();
  }, [updateHappened]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Lista de Livros</h2>
      <BookList bookList={bookList} setUpdateHappened={setUpdateHappened} />
    </div>
  );
}
