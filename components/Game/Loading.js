"use client";
import { userActions } from "@/store/slices/userSlice";
import { gameActions } from "@/store/slices/gameSlice";
import { useUser } from "@supabase/auth-helpers-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadActions } from "@/store/slices/loadSlice";
import { supabase } from "@/lib/supabase";
import { searchUser } from "@/store/slices/userSlice";
import { fetchDeckCards } from "@/store/slices/deckSlice";
import Router from "next/router";
import { v4 as uuidv4 } from "uuid";
import Throwaway from "./Throwaway";
import OpponentInfo from "./OpponentInfo";

let player2info = null;
let player2Deck2 = null;

const Loading = () => {
  // const [throwaway, setThrowaway] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [presence, setPresence] = useState([]);
  const [trackingStatus, setTrackingStatus] = useState([]);

  // const router = useRouter();

  const user = useUser();
  const dispatch = useDispatch();

  const player = useSelector((state) => {
    return state.user.user;
  });

  const userDeck = useSelector((state) => {
    return state.deck;
  });

  const loading = useSelector((state) => {
    return state.load;
  });

  useEffect(() => {
    if (!player) dispatch(searchUser(user.id));
    if (userDeck.length === 0) dispatch(fetchDeckCards(user.id));
  }, []);

  const channel = supabase.channel(Router.query.id, {
    config: { presence: { key: player.username } },
  });

  const player1id = async () => {
    let { data } = await supabase
      .from("game")
      .select("player1")
      .eq("id", Router.query.id)
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
        event: "getUserInfo/" + Router.query.id,
        payload: { player, userDeck },
      });
    });

    channel.on("presence", { event: "join" }, ({ newPresences }) => {
      console.log("joined");
      channel.send({
        type: "broadcast",
        event: "getUserInfo/" + Router.query.id,
        payload: { player, userDeck },
      });
    });

    channel.on(
      "broadcast",
      { event: "getUserInfo/" + Router.query.id },
      (payload) => {
        console.log(payload.payload, "get payload");
        console.log(payload.payload.player);
        console.log(payload.payload.userDeck);
        dispatch(gameActions.setPlayer2(payload.payload.player));
        dispatch(gameActions.setPlayer2Deck(payload.payload.userDeck));
      }
    );
  }, [user]);

  const playGame = () => {
    dispatch(loadActions.setLoading(false));
  };

  const readyHandler = async () => {
    await channel.send({
      type: "broadcast",
      event: "readyUp" + Router.query.id,
      payload: { data: player, userDeck },
    });
  };

  return (
    <div>
      {localLoading ? (
        <div>LOADING...</div>
      ) : (
        <button onClick={playGame}>Click to Play!</button>
      )}

      <Throwaway player2info={player2info} player2Deck={player2Deck2} />
      <h1>YOUR OPPONENT: </h1>
      <OpponentInfo />
    </div>
  );
};

export default Loading;
