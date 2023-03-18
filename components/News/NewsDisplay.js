const NewsDisplay = ({ props }) => {
  console.log(props[0]);
  return (
    <div>
      <h1>{props[0].heading}</h1>
      <img src={props[0].image} />
      <h3>{props[0].author}</h3>
      <p>{props[0].body}</p>
      <p>Links Placeholder</p>
    </div>
  );
};

export default NewsDisplay;
