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
import { motion } from "framer-motion";

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
      <div className="container1">
        <div className="textleft">
          <div className="textscroll">
            <img
              src="http://img05.deviantart.net/cef3/i/2015/122/c/4/dragon_ball_z__dbz__nuevo_logo_by_saodvd-d8rx6aw.png"
              className="dbzlogo"
            />
            <p className="dbztext">
              A Saiyan warrior who was sent to Earth as a baby and was raised by
              a kind-hearted human named Grandpa Gohan. Goku possesses
              incredible strength, speed, and martial arts skills, which he uses
              to protect the Earth from various threats. He is known for his
              cheerful and adventurous personality, and his insatiable love for
              food. Goku is also famous for his iconic spiky black hair, his
              trademark orange gi, and his ability to transform into powerful
              Super Saiyan forms when pushed to his limits.
            </p>
          </div>
        </div>
      </div>
      <button onClick={readyHandler} className="ready-btn">
        <div className="goku">
          <p className="ready-text">Are you ready?</p>
        </div>
      </button>
    </div>
  );
};

export default Loading;
