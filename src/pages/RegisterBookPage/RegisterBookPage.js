import BookForm from "../../components/BookForm/BookForm";

export default function RegisterBookPage() {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Formulário de Cadastro:</h2>
      <div className="bg-white rounded p-5 w-50">
        <BookForm />
      </div>
    </div>
  );
}
