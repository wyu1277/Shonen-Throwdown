import React, { useEffect, useState } from "react";
import Messages from "@/components/Messages/Messages";
import supabase from "@/lib/supabase";
import GameRoom from "@/components/GameRoom/GameRoom";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";

const Game = () => {
  const user = useUser();
  const publicUser = useSelector((state) => state.user.user);

  return (
    <div>
      <GameRoom props={publicUser} />
      <Messages props={publicUser} />
    </div>
  );
};

export default Game;
