import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import usePostBook from "../../hooks/api/usePostBook";
import useEditBook from "../../hooks/api/useEditBook";
import { toast } from "react-toastify";

export default function BookForm({ bookToEdit, setBookToEdit, setUpdateHappened }) {
  const { postBook } = usePostBook();
  const { editBook } = useEditBook();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    readAt: "",
  });

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        ...formData,
        title: bookToEdit.title,
        author: bookToEdit.author,
        genre: bookToEdit.genre,
        readAt: bookToEdit.readAt,
      });
    }
  }, []);

  function handleInputChange(e) {
    if (e.target.value[0] === " ") {
      e.target.value = e.target.value.trim();
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function cancelForm() {
    if (bookToEdit) {
      setBookToEdit({});
    } else {
      setFormData({
        title: "",
        author: "",
        genre: "",
        readAt: "",
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (bookToEdit) {
      try {
        const formDataCopy = { ...formData, id: bookToEdit.id };

        const book = await editBook(formDataCopy);

        toast.success(`O livro "${book.title}" foi editado com sucesso!`);

        setBookToEdit({});
        setUpdateHappened(book);
      } catch (err) {
        toast.error(`Ocorreu um erro ao editar: ${err.message}`);
      }
    } else {
      try {
        const book = await postBook(formData);

        toast.success(`Livro "${book.title}" cadastrado com sucesso!`);

        setFormData({
          title: "",
          author: "",
          genre: "",
          readAt: "",
        });
      } catch (err) {
        toast.error(`Ocorreu um erro ao cadastrar o livro: ${err.message}`);
      }
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="title" className="form-label">
        Título:
      </label>
      <input
        id="title"
        className="form-control mb-3"
        name="title"
        type="text"
        value={formData.title}
        onChange={(e) => handleInputChange(e)}
        placeholder="Título do Livro"
        autoFocus
        required
      />

      <label htmlFor="author" className="form-label">
        Autor(a):
      </label>
      <input
        id="author"
        className="form-control mb-3"
        name="author"
        type="text"
        value={formData.author}
        onChange={(e) => handleInputChange(e)}
        placeholder="Autor do Livro"
        required
      />

      <label htmlFor="genre" className="form-label">
        Gênero do livro:
      </label>
      <input
        id="genre"
        className="form-control mb-3"
        name="genre"
        type="text"
        value={formData.genre}
        onChange={(e) => handleInputChange(e)}
        placeholder="Gênero 1, Gênero 2, etc."
        required
      />

      <label htmlFor="readAt" className="form-label">
        Data de leitura:
      </label>
      <input
        id="readAt"
        className="form-control mb-4"
        name="readAt"
        type="date"
        value={formData.readAt}
        onChange={(e) => handleInputChange(e)}
        required
      />

      <div className="d-flex justify-content-center mt-5">
        <Button variant="danger" className="me-5 px-5" onClick={() => cancelForm()} data-cy="cancel">
          Cancelar
        </Button>

        <Button variant="success" className="px-5" type="submit" data-cy="confirm">
          {bookToEdit ? "Atualizar" : "Adicionar"}
        </Button>
      </div>
    </form>
  );
}
