import CartProvider from "./components/store/CartProvider";
import "./App.css";
import Background from "./components/template/Background";
import Header from "./components/template/Header";
import Section from "./components/template/Section";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Background />
        <Header />
        <Section />
      </div>
    </CartProvider>
  );
}

export default App;
