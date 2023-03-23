import React, { useEffect, useState } from "react";
import Messages from "@/components/Messages/Messages";
import supabase from "@/lib/supabase";
import GameRoom from "@/components/GameRoom/GameRoom";
import { useUser } from "@supabase/auth-helpers-react";

const Game = () => {
  const user = useUser();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      setCurrentUser(data);
    };
    getCurrentUser();
  }, []);

  return (
    <div>
      <GameRoom props={currentUser} />
      <Messages props={currentUser} />
    </div>
  );
};

export default Game;
