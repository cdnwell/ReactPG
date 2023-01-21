import classes from "./Introduce.module.css";

const Introduce = (props) => {
  const message_tray = props.content;
  const tray_show = message_tray.map((message, idx) => (
    <div key={idx}>
      <span>{message}</span>
      <br />
    </div>
  ));

  return <div className={classes.introduce_box}>{tray_show}</div>;
};

export default Introduce;
