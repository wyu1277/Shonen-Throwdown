"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import { useSelector } from "react-redux";

const GameRoom = ({ props }) => {
  const [channels, setChannels] = useState(null);
  const [presence, setPresence] = useState();
  const router = useRouter();
  const [trackingStatus, setTrackingStatus] = useState("open");
  // Player1{
  //   username: props.username;
  //   HP: 15;
  //   Deck: props.deck;
  // }

  const getChannel = async () => {
    const newChannel = await router.query;
    console.log("this is new channel", newChannel);
    setChannels(newChannel.id);
  };

  useEffect(() => {
    getChannel();
    const channel = supabase.channel(`${channels}`, {
      config: { presence: { key: `${props.username}` } },
    });
    channel
      .on("presence", { event: "sync" }, (object) => {
        const state = channel.presenceState();
        setPresence(state);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        let newPresence = newPresences[0];
        console.log(key, newPresence, "IS COMIN IN HOTTTTTTTTTTTTTTT");
        // if (!lobby && !player1) {
        //   setLobby({ key });
        //   setPlayer1(newPresence);
        //   console.log("this is lobby in joinPaths", lobby);
        //   console.log("this is set play in join presence", player1);
        // }
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        console.log(leftPresences, "Has Left");
      })
      .subscribe(async (status) => {
        if (trackingStatus === "closed") {
          const untrackStatus = await channel.untrack();
          // console.log(trackStatus, "TRACKSTATUS LINE 57");
          console.log(untrackStatus, "STATUS/HAS LEFT");
        }

        if (status === "SUBSCRIBED") {
          const trackStatus = await channel.track();
          console.log(trackStatus, "TRACKSTATUS");
          // await channel.untrack();
        }
      });
  }, [channels]);

  useEffect(() => {
    if (presence && Object.values(presence).length > 0) {
      console.log("PRESENCEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", presence);
    }
  }, [presence]);

  const leaveHandler = async () => {
    supabase.removeAllChannels();
    console.log("removed all channels");
    router.push("http://localhost:3000/");
    setTrackingStatus("closed");
    // supabase.subscribe(async (status) => {
    //   if (trackStatus === "ok") {
    //     const untrackStatus = await channel.untrack();
    //     console.log(trackStatus, "TRACKSTATUS LINE 57");
    //     console.log(untrackStatus, "STATUS/HAS LEFT");
    //   }
    // });
  };

  const clickHandler = (e) => {
    e.preventDefault();
  };

  //join room(game.id) if a (roomVacant = true) else createNewRoom()
  //createNewRoom() with `${game.id}` (supabase trigger?)
  //setPlayer1
  //wait for player2
  //newpresence = new join = player2
  //setPlayer2
  //game begins (coin toss?)
  //1st player places card, validate if(null) push card
  //(power>power.current|| fire beats grass = true) setBoardState return game state through broadcast
  //2nd player places card, validate if(null) push card (power>power.current|| fire beats grass = true) setBoardState to new card return game state through broadcast
  //loop until both users deck.length=0
  //send game/match

  return (
    <div>
      <h1>GameRoom</h1>
      <button onClick={leaveHandler}>Leave Room</button>
      <h3>
        Users In Lobby: {/*{lobby ? lobby.join(" , ") : "loading"} */}
        {/* <ul>
          {lobby.map((user) => (
            <li key={user.id}>
              <p>{user.username}</p>
            </li>
          ))}
        </ul> */}
      </h3>
      <div>
        <h4>Player 1: </h4>
        player 1 buttons
        <button onClick={clickHandler} value="1">
          1
        </button>
        <button onClick={clickHandler} value="2">
          2
        </button>
        <button onClick={clickHandler} value="3">
          3
        </button>
      </div>
      <h1>CURRENT CARD: </h1>
      <div>
        <h4>Player 2: </h4>
        player 2 buttons
        <button onClick={clickHandler} value="1">
          1
        </button>
        <button onClick={clickHandler} value="2">
          2
        </button>
        <button onClick={clickHandler} value="3">
          3
        </button>
      </div>
    </div>
  );
};

export default GameRoom;
