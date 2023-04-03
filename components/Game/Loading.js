"use client";
import { gameActions } from "@/store/slices/gameSlice";
import { useUser } from "@supabase/auth-helpers-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadActions } from "@/store/slices/loadSlice";
import { supabase } from "@/lib/supabase";
import { searchUser } from "@/store/slices/userSlice";
import { fetchDeckCards } from "@/store/slices/deckSlice";
import Router, { useRouter } from "next/router";
import Throwaway from "./Throwaway";
import { useRef } from "react";

let player2info = null;
let player2Deck2 = null;

const Loading = () => {
  const router = useRouter;
  const audioRef = useRef(null);
  const [localLoading, setLocalLoading] = useState(false);

  const user = useUser();
  const dispatch = useDispatch();

  const player = useSelector((state) => {
    return state.user.user;
  });

  const userDeck = useSelector((state) => {
    return state.deck;
  });

  const channelID = typeof window !== "undefined" && Router.query.id;

  useEffect(() => {
    if (!player) dispatch(searchUser(user.id));
    if (userDeck.length === 0) dispatch(fetchDeckCards(user.id));
  }, []);

  const channel = supabase.channel(channelID, {
    config: { presence: { key: player?.username } },
  });

  const player1id = async () => {
    let { data } = await supabase
      .from("game")
      .select("player1")
      .eq("id", channelID)
      .single();
    console.log("player1id", data);
    return data;
  };
  player1id();

  useEffect(() => {
    channel.subscribe(async (status) => {
      await channel.track();
    });

    channel.on("presence", { event: "sync" }, (status) => {
      console.log("sync");
      channel.send({
        type: "broadcast",
        event: "getUserInfo/" + channelID,
        payload: { player, userDeck },
      });
    });

    channel.on("presence", { event: "join" }, ({ newPresences }) => {
      console.log("joined");
      channel.send({
        type: "broadcast",
        event: "getUserInfo/" + channelID,
        payload: { player, userDeck },
      });
    });

    channel.on("broadcast", { event: "readyUp/" + channelID }, (payload) => {
      console.log(payload.payload, "READY UP PAYLOAD");
      dispatch(gameActions.setPlayer1(player));
      dispatch(gameActions.setPlayer2(payload.payload.player));
      dispatch(gameActions.setPlayer2Deck(payload.payload.userDeck));
    });
  }, [user]);

  const readyHandler = () => {
    channel.send({
      type: "broadcast",
      event: "readyUp/" + channelID,
      payload: { player, userDeck },
    });
    console.log(audioRef, "AUDIO REF");

    dispatch(loadActions.setLoading(false));
    if (player1id && player1id !== user.id) {
      const setPlayer2 = async () => {
        await supabase
          .from("game")
          .update({ player2: user.id })
          .eq("id", channelID);
      };
      setPlayer2();
    }
  };

  return (
    <div className="load-container">
      <audio src="/audio/cut.wav" ref={audioRef} />

      {localLoading && <div>LOADING...</div>}

      <Throwaway player2info={player2info} player2Deck={player2Deck2} />

      <button onClick={readyHandler} className="ready-btn">
        <div className="goku"></div>
      </button>
    </div>
  );
};

export default Loading;
