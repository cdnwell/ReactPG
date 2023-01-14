import classes from "./Home.module.css";

const Home = (props) => {
  return <span className={`${props.className} ${classes.home_span}`}>ReactMeals</span>;
};

export default Home;
