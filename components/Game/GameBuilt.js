import React, { useEffect, useState, useContext } from "react";
import Messages from "@/components/Messages/Messages";
import { supabase } from "@/lib/supabase";
import GameRoom from "@/components/GameRoom/GameRoom";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import Channels from "@/components/Channels/Channels";
import { GlobalContext } from "@/lib/GlobalContext";
import GameComponent from "@/components/Game/GameComponent";
import Loading from "@/components/Game/Loading";
import EndModal from "@/components/Game/EndModal";
import Throwaway from "@/components/Game/Throwaway";

const GameBuilt = () => {
  const authUser = useUser();
  const publicUser = useSelector((state) => state.user.user);
  const [conUser, setConUser] = useState(null);
  //const [conDeck, setConDeck] = useState(null)
  const loading = useSelector((state) => {
    return state.load;
  });

  const user = useSelector((state) => {
    return state.user.user;
  });

  const userDeck = useSelector((state) => {
    return state.deck;
  });

  const ended = useSelector((state) => {
    return state.game.ended;
  });

  return (
    <div>
      <GlobalContext.Provider value={publicUser}>
        {/* <GameRoom props={publicUser} /> */}
        {loading && !ended && <Loading />}
        {!loading && <GameComponent user={user} userDeck={userDeck} />}
        {ended && <EndModal />}
        <Throwaway />
        {/* <Messages props={publicUser} /> */}
      </GlobalContext.Provider>
    </div>
  );
};

export default GameBuilt;
