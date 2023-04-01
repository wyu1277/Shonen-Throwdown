import { useSelector } from "react-redux";

const OpponentInfo = () => {
  const oppInfo = useSelector((state) => {
    return state.game.player2;
  });

  return (
    <>
      <div>
        <h1> Motherfuckin {oppInfo?.username} </h1>
      </div>
      <button
        onClick={() => {
          console.log(oppInfo);
        }}
      >
        TEST sTATE
      </button>
    </>
  );
};

export default OpponentInfo;
