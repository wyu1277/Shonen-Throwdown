import GameComponent from "@/components/Game/GameComponent";
import Loading from "@/components/Game/Loading";
import { useSelector } from "react-redux";

const GamePlay = () => {
  const loading = useSelector((state) => {
    return state.load;
  });
  return (
    <div className="game-container">
      {loading && <Loading />}
      {!loading && <GameComponent />}
    </div>
  );
};

export default GamePlay;
