import "./assets/styles/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/general.css";

import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar.js";
import InitialPage from "./pages/InitialPage/InitialPage.js";
import AboutPage from "./pages/AboutPage/AboutPage.js";
import RegisterBookPage from "./pages/RegisterBookPage/RegisterBookPage.js";
import BookListPage from "./pages/BookListPage/BookListPage.js";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <NavBar>
          <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<RegisterBookPage />} />
            <Route path="/booklist" element={<BookListPage />} />
            <Route index path="*" element={<Navigate to="/" />} />
          </Routes>
        </NavBar>
      </BrowserRouter>
    </>
  );
}

export default App;
