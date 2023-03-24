import React, { useEffect, useState } from "react";
import Messages from "@/components/Messages/Messages";
import supabase from "@/lib/supabase";
import GameRoom from "@/components/GameRoom/GameRoom";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import Channels from "@/components/Channels/Channels";

const Lobby = () => {
  const user = useUser();
  const publicUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      const publicUser = await getUser();
      console.log("this is data", data);
      console.log("public userrrrrrrrrrrrrrrrrrrrrr", publicUser);
      return publicUser;
    };
    getUser();
  }, []);

  console.log("this is public", publicUser);

  return (
    <div>
      <Channels props={publicUser} />
    </div>
  );
};

export default Lobby;
