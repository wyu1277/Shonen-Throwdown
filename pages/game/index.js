import React, { useEffect, useState } from "react";
import Messages from "@/components/Messages/Messages";
import supabase from "@/lib/supabase";
import GameRoom from "@/components/GameRoom/GameRoom";
import { useUser } from "@supabase/auth-helpers-react";

const Game = () => {
  const user = useUser();
  const [username, setUsername] = useState();

  console.log("this is user ####################### in game", username);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      setUsername(data);
    };
    getUser();
  }, []);

  return (
    <div>
      <GameRoom user={username} />
      <Messages user={username} />
    </div>
  );
};

export default Game;
