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

const Loading = () => {
  const [time, setTime] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [presence, setPresence] = useState([]);
  const [trackingStatus, setTrackingStatus] = useState([]);

  // const router = useRouter();

  const user = useUser();
  const dispatch = useDispatch();

  const player = useSelector((state) => {
    return state.user.user;
  });

  const player2 = useSelector((state) => {
    return state.game.player2;
  });
  const userDeck = useSelector((state) => {
    return state.deck;
  });

  const player2Deck = useSelector((state) => {
    return state.game.player2Deck;
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
  console.log("pls be a string", Router.query.id);

  useEffect(() => {
    channel
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          console.log(status, "CHANNEL STATUS ");
          const trackStatus = await channel.track({ key: user.username });
          console.log(trackStatus, "TRACK STATUS");
        }
      })
      .on(
        "broadcast",
        { event: "getUserDeck/" + Router.query.id },
        (payload) => {
          console.log(payload, "LOADING PAYLOAD BROADCAST");
          dispatch(gameActions.setPlayer2Deck(payload.payload.data?.userDeck));
          dispatch(gameActions.setPlayer2(payload.payload.data?.player));
        }
      )
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setPresence(state);
        console.log("presence state", state);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        let newPresence = newPresences[0];
        console.log(key, newPresence, "IS COMIN IN HOTTTTTTTTTTTTTTT");
      });
    setTimeout(() => {
      setLocalLoading(false);
    }, 2000);
  }, []);

  const playGame = () => {
    console.log(player, "PLAYER");
    console.log(player2, "PLAYER2");
    console.log(userDeck, "USERDECK");
    console.log(player2Deck, "PLAYER2DECK");
    console.log(loading, "LOADING STATUS");
    dispatch(loadActions.setLoading(false));

    if (player && player2 && userDeck > 0 && player2Deck > 0) {
    }
  };

  return (
    <div>
      {localLoading ? (
        <div>LOADING...</div>
      ) : (
        <button onClick={playGame}>Click to Play!</button>
      )}
    </div>
  );
};

export default Loading;
