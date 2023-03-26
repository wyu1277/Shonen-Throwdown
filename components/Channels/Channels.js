import Game from "@/pages/game/[id]";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/router";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const router = useRouter();

  //useeffect to fetch all game IDs aka channels and set game ID to channel ID
  useEffect(() => {
    const getChannels = async () => {
      const { data } = await supabase.from("game").select("*");
      setChannels(data);
      console.log(data);
      console.log("this is data in channels", channels);
    };
    getChannels();
  }, []);

  const handleJoin = (e) => {
    console.log(e.target.value);

    //set channel to e.target.value
    //ref to new game[id].js where channel = e.target.value
    const gameId = e.target.value;
    supabase.removeAllChannels();
    router.push({
      pathname: `/game/[id]`,
      query: { id: `${gameId}` },
    });
  };

  return (
    <div>
      Channels:
      <h4>
        <ul>
          {channels.map((channel) => (
            <li key={channel.id}>
              <button onClick={handleJoin} value={channel.id}>
                Join: {channel.id}
              </button>
            </li>
          ))}
        </ul>
      </h4>
      {/*create room will cause trigger to create new game row and create route user to newly created game[id].js set player1 to user who created and wait for player 2*/}
      <button>Create Room</button>
    </div>
  );
};
export default Channels;
