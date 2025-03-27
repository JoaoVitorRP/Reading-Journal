import api from "./api";

export async function getBooks() {
  const response = await api.get("/");

  return response.data;
}

export async function postBook(book) {
  const response = await api.post("/", book);

  return response.data;
}

export async function editBook(book) {
  const response = await api.put("/", book);

  return response.data;
}

export async function deleteBook(id) {
  const response = await api.delete(`/${id}`);

  return response.data;
}
