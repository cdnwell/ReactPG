import { Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./components/layout/Layout";
import Book from "./pages/Book";
import Main from "./pages/Main";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/book" exact element={<Book />} />
      </Routes>
    </Layout>
  );
}

export default App;
