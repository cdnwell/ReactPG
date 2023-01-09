import { useState } from 'react';
import './App.css';
import InputBox from './components/InputBox/InputBox';
import OutputBox from './components/OutputBox/OutputBox';

const ITEMS_LIST = [
  { id : Math.random().toString() , content : 'Max (10 Years)' },
  { id : Math.random().toString() , content : 'Tommy (32 Years)'},
  { id : Math.random().toString() , content : 'Jane (24 Years)'}
];

function App() {
  const [items, setItems] = useState(ITEMS_LIST);

  const addItemsHandler = item => {
    setItems( prevItems => [item, ...prevItems] );
  }

  return (
    <>
      <InputBox onAddItems={addItemsHandler} />
      <OutputBox items={items}/>
    </>
  );
}

export default App;
