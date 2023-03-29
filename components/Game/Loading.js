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

const Loading = () => {
  const [time, setTime] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [presences, setPresences] = useState([]);

  // const router = useRouter();
  const [oppDeck, setOppDeck] = useState();
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

  useEffect(() => {
    const channel = supabase.channel(Router.query.id, {
      config: { presence: { key: player.username } },
    });

    channel
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const trackStatus = await channel.track();
        }
      })
      // .on("presence", { event: "sync" }, () => {
      //   channel.send({
      //     type: "broadcast",
      //     event: "getUserDeck/" + Router.query.id,
      //     payload: { data: { player, userDeck } },
      //   });
      // })
      .on(
        "broadcast",
        { event: "getUserDeck/" + Router.query.id },
        (payload) => {
          console.log(payload, "LOADING PAYLOAD BROADCAST");
          dispatch(gameActions.setPlayer2Deck(payload.payload.data?.userDeck));
          dispatch(gameActions.setPlayer2(payload.payload.data?.player));
        }
      )
      .on("presence", { event: "join" }, (object) => {
        setPresences((presences) => [...presences, object]);
        console.log(presences);
      });
    setTimeout(() => {
      setLocalLoading(false);
    }, 2000);
  }, []);

  // useEffect(() => {
  //   if (player && player2 && userDeck && player2Deck) {
  //     loadActions.setLoading(false);
  //   }
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
