import React, { useEffect, useState } from "react";
import Messages from "@/components/Messages/Messages";
import supabase from "@/lib/supabase";
import GameRoom2 from "@/components/GameRoom2/GameRoom2";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";

const Game = () => {
  const user = useUser();
  const [currentUser, setCurrentUser] = useState();
  const publicUser = useSelector((state) => state.user.user);

  return (
    <div>
      <GameRoom2 props={publicUser} />
      <Messages props={publicUser} />
    </div>
  );
};

export default Game;
