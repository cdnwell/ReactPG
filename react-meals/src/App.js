import BgImage from './components/BG/BgImage';

import classes from './App.module.css';
import Header from './components/Template/Header';

function App() {
  return (
    <div className={classes.top_div}>
      <BgImage />
      <Header />
    </div>
  );
}

export default App;
