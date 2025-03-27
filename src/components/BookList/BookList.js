import dayjs from "dayjs";
import { useState } from "react";
import BookForm from "../BookForm/BookForm";
import { Button } from "react-bootstrap";
import useDeleteBook from "../../hooks/api/useDeleteBook";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function BookList({ bookList, setUpdateHappened }) {
  const [bookToEdit, setBookToEdit] = useState({});

  const { deleteBook } = useDeleteBook();

  function deleteBookFromList(book) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger me-3",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `Você tem certeza que quer excluir o livro "${book.title}" da sua lista?`,
        text: "Não será possível reverter essa ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteBook(book.id);

            setUpdateHappened(book.id);

            swalWithBootstrapButtons.fire({
              title: "Apagado com sucesso!",
              text: `O livro "${book.title}" foi removido da sua lista.`,
              icon: "success",
            });
          } catch (err) {
            toast.error(`Ocorreu um erro ao excluir o livro "${book.title}", tente novamente.`);
          }
        }
      });
  }

  function openEditForm(book) {
    if (bookToEdit?.id === book.id) {
      setBookToEdit({});
    } else {
      setBookToEdit(book);
    }
  }

  return (
    <ul className="w-100 d-flex flex-column align-items-center">
      {bookList.map((book, index) => {
        return (
          <div className="bg-white rounded p-4 m-4 w-50 d-flex flex-column" key={book.id}>
            <div className="fit-content rounded-circle border border-dark fs-4 mb-2">
              <b className="p-2">{index + 1}</b>
            </div>

            <div className="w-100 d-flex">
              <div className="w-100">
                <p className="d-flex justify-content-between fs-4">
                  <b className="me-4">Título: </b>
                  <span>{book.title}</span>
                </p>
                <p className="d-flex justify-content-between fs-6">
                  <b className="me-4">Autor: </b>
                  <span>{book.author}</span>
                </p>
                <p className="d-flex justify-content-between fs-6">
                  <b className="me-4">Gênero: </b>
                  <span>{book.genre}</span>
                </p>
                <p className="d-flex justify-content-between fs-6">
                  <b className="me-4">Data de Leitura: </b>
                  <span>{dayjs(book.readAt).format("DD/MM/YYYY")}</span>
                </p>
              </div>

              <div className="d-flex flex-column align-items-end ps-5">
                <Button
                  variant="warning"
                  className="w-100 mb-3 d-flex justify-content-between"
                  onClick={() => openEditForm(book)}
                >
                  Editar <i className="bi bi-pencil-fill ms-2"></i>
                </Button>

                <Button
                  variant="danger"
                  className="w-100 mb-3 d-flex justify-content-between"
                  onClick={() => deleteBookFromList(book)}
                >
                  Excluir <i className="bi bi-trash-fill ms-2"></i>
                </Button>
              </div>
            </div>

            {bookToEdit.id === book.id && (
              <div className="w-100">
                <hr />
                <BookForm bookToEdit={bookToEdit} setBookToEdit={setBookToEdit} setUpdateHappened={setUpdateHappened} />
              </div>
            )}
          </div>
        );
      })}
    </ul>
  );
}
