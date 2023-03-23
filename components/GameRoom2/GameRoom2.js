import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";

const GameRoom = ({ props }) => {
  const [lobby, setLobby] = useState();
  const router = useRouter();
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [game, setGame] = useState();

  // Player1{
  //   username: props.username;
  //   HP: 15;
  //   Deck: props.deck;

  // }

  useEffect(() => {
    const channel = supabase.channel("beta-test", {
      config: { presence: { key: props.username } },
    });
    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        console.log("this is state", state);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        let newPresence = newPresences[0];
        console.log(key, newPresence, "IS COMIN IN HOTTTTTTTTTTTTTTT");
        if (!lobby && !player1) {
          setLobby(key);
          setPlayer1(newPresence);
        }
        setLobby((current) => [...current, key.new]);
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        console.log(leftPresences, "Has Left");
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const status = await channel.track(props);
          console.log(status);
          await channel.untrack();
        }
      });
  }, []);

  const leaveHandler = () => {
    supabase.removeAllChannels();
    console.log("removed all channels");
    router.push("http://localhost:3000/");
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setGame(e.target.value);
    console.log(player1);
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
        Users In Lobby:{lobby}
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
        <button onClick={clickHandler} value={props.decks}>
          1
        </button>
        <button onClick={clickHandler} value="2">
          2
        </button>
        <button onClick={clickHandler} value="3">
          3
        </button>
      </div>
      <h1>CURRENT CARD: {game}</h1>
      <div>
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
