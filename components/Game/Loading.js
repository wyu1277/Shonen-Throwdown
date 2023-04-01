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
    // .subscribe(async (status) => {
    //   if (status === "SUBSCRIBED") {channel.on("presence", { event: "sync" }, () => {
    channel.send({
      type: "broadcast",
      event: "getUserDeck/" + Router.query.id,
      payload: { data: { player, userDeck } },
    });
    //     const trackStatus = await channel.track();
    //   }
    // })
    // .on("presence", { event: "sync" }, () => {
    //   channel.send({
    //     type: "broadcast",
    //     event: "getUserDeck/" + Router.query.id,
    //     payload: { data: { player, userDeck } },
    //   });
    // })
    channel.on("presence", { event: "sync" }, (object) => {
      const state = channel.presenceState();
      setPresence(state);

      channel.send({
        type: "broadcast",
        event: "getUserDeck/" + Router.query.id,
        payload: { data: { player, userDeck } },
      });
    });
    // .on(
    //   "broadcast",
    //   { event: "getUserDeck/" + Router.query.id },
    //   (payload) => {
    //     console.log(payload, "LOADING PAYLOAD BROADCAST");
    //     dispatch(gameActions.setPlayer2Deck(payload.payload.data?.userDeck));
    //     dispatch(gameActions.setPlayer2(payload.payload.data?.player));
    //   }
    // )
    channel
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
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
            .subscribe(async (status) => {
              if (status === "SUBSCRIBED") {
                const presenceTrackStatus = await channel.track({
                  player: player,
                  userDeck: userDeck,
                });
                console.log(presenceTrackStatus);
              }
            })
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
            dispatch(
              gameActions.setPlayer2Deck(payload.payload.data?.userDeck)
            );
            dispatch(gameActions.setPlayer2(payload.payload.data?.player));
          }
        );
      })
      // .on("presence", { event: "join" }, (object) => {
      //   setPresences((presences) => [...presences, object]);
      //   console.log(presences);
      // });
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
    setTimeout(() => {
      setLocalLoading(false);
    }, 4000);

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (player2) {
      const setPlayer2 = async () => {
        await supabase
          .from("game")
          .update({ player2: player2.id })
          .eq("id", Router.query.id);
      };
      setPlayer2();
    }
  }, [player2]);

  useEffect(() => {
    channel.on("presence", { event: "sync" }, () => {
      channel.send({
        type: "broadcast",
        event: "getUserDeck/" + Router.query.id,
        payload: { data: { player, userDeck } },
      });
    });
  }, [presence]);

  // useEffect(() => {
  //   channel.subscribe();

  //   channel.on("presence", { event: "sync" }, (object) => {
  //     console.log();
  //   });

  //   channel.on();
  // }, []);

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
