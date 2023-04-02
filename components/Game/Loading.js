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
<<<<<<< Updated upstream
=======
    // .on(
    //   "broadcast",
    //   { event: "getUserDeck/" + Router.query.id },
    //   (payload) => {
    //     console.log(payload, "LOADING PAYLOAD BROADCAST");
    //     dispatch(gameActions.setPlayer2Deck(payload.payload.data?.userDeck));
    //     dispatch(gameActions.setPlayer2(payload.payload.data?.player));
    //   }
    // )
    channel.on("presence", { event: "join" }, ({ key, newPresences }) => {
      if (player1id && player1id !== user.id) {
        const setPlayer2 = async () => {
          await supabase
            .from("game")
            .update({ player2: user.id })
            .eq("id", Router.query.id);
        };
        setPlayer2();
      }
      let newPresence = newPresences[0];
      console.log(key, newPresence, "IS COMIN IN HOTTTTTTTTTTTTTTT");
      channel.on("presence", { event: "sync" }, () => {
        console.log("PRESNECE SYNC WHATEVE THE FUCK 1");
        channel
          // .subscribe(async (status) => {
          //   if (status === "SUBSCRIBED") {
          //     const presenceTrackStatus = await channel.track({
          //       player: player,
          //       userDeck: userDeck,
          //     });
          //     console.log(presenceTrackStatus);
          //   }
          // })
          .send({
            type: "broadcast",
            event: "getUserDeck/" + Router.query.id,
            payload: { data: { player, userDeck } },
          });
      });
      channel.on(
        "broadcast",
        { event: "getUserDeck/" + Router.query.id },
        (payload) => {
          console.log(payload, "LOADING PAYLOAD BROADCAST");
          dispatch(gameActions.setPlayer2Deck(payload.payload.data?.userDeck));
          dispatch(gameActions.setPlayer2(payload.payload.data?.player));
        }
      );
    });
    // .on("presence", { event: "join" }, (object) => {
    //   setPresences((presences) => [...presences, object]);
    //   console.log(presences);
    // });
    // .subscribe(async (status) => {
    //   if (trackingStatus === "closed") {
    //     const untrackStatus = await channel.untrack();
    //     // console.log(trackStatus, "TRACKSTATUS LINE 57");
    //     console.log(untrackStatus, "STATUS/HAS LEFT");
    //   }

    //   if (status === "SUBSCRIBED") {
    //     const trackStatus = await channel.track();
    //     console.log(trackStatus, "TRACKSTATUS");
    //     // await channel.untrack();
    //   }
    // });
    setTimeout(() => {
      setLocalLoading(false);
    }, 4000);

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
>>>>>>> Stashed changes

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
