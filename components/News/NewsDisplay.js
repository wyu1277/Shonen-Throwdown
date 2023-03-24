import classes from "./NewsDisplay.module.css";

const NewsDisplay = ({ props }) => {
  return (
    <div className={classes.page}>
      <h1>{props[0].heading}</h1>
      <img src={props[0].image} />
      <h3>Written By: {props[0].author}</h3>
      <p className={classes.body}>{props[0].body}</p>
      <p>Links Placeholder</p>
    </div>
  );
};

export default NewsDisplay;
