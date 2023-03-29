"use client";
import Game from "@/pages/game/[id]";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/router";
import Link from "next/link";

const Channels = () => {
  const [listChannels, setListChannels] = useState([]);

  //useeffect to fetch all game IDs aka channels and set game ID to channel ID
  useEffect(() => {
    const getChannels = async () => {
      const { data } = await supabase.from("game").select("id");
      setListChannels(data);
      console.log("THIS IS DATA IN CHANNELS", data);
      console.log("this is channels in channels", listChannels);
    };
    getChannels();
  }, []);

  // const handleJoin = (e) => {
  //   console.log(e.target.value);

  //set channel to e.target.value
  //ref to new game[id].js where channel = e.target.value
  //   const gameId = e.target.value;
  //   supabase.removeAllChannels();
  //   router.push({
  //     pathname: `/game/[id]`,
  //     query: { id: `${gameId}` },
  //   });
  // };

  return (
    <div>
      Channels:
      <h4>
        <ul>
          {listChannels.map((channel) => (
            <li key={channel.id}>
              <Link href={`/game/${channel.id}`}>
                {/* <Link
                href={{
                  pathname: "/game/[id]",
                  query: { id: channel.id },
                }}
              > */}
                {/* <button onClick={handleJoin} value={channel.id}> */}
                Join: {channel.id}
                {/* </button> */}
              </Link>
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
