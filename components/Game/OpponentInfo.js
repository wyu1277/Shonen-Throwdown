import { useSelector } from "react-redux";

const OpponentInfo = () => {
  const oppInfo = useSelector((state) => {
    return state.game.player2;
  });

  return (
    <div>
      <h1> Motherfuckin {oppInfo?.username} </h1>
    </div>
  );
};

export default OpponentInfo;
