import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Chat = () => {
  const user = useSelector((state)=>{
    return state.user.user
  })

  const deck = useSelector((state)=>{
    return state.deck
  })

  const channel = supabase.channel("testchannel1", {
    config: { presence: { key: 'state' } },
  });

  useEffect(() => {
    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const presencesTrackStatus = await channel.track({ 
            key: user.username,
            deck: deck 
        });
        console.log('this is presence Track', presencesTrackStatus)
      }
    });
    channel
        .on("presence", { event: "join" }, ({ key, newPresences }) => {
          let newPresence = newPresences[0];
          console.log(key, newPresence, "IS COMIN IN HOTTTTTTTTTTTTTTT");
        })
        .on("presence", { event: "sync" }, () => {
          const state = channel.presenceState();
          console.log("presence state", state);
          const decks = state.state.map((user)=>user.deck)
          console.log('this is decks in presence', decks)
        });
  }, []);

  const message =  () => {
     channel.send({
      type: "broadcast",
      event: "supa",
      payload: { org: "supanase"},
    });
  };

  return (
    <div>
      <h1>Testing</h1>
      <button onClick={() => message()}>Test</button>
    </div>
  );
};

export default Chat;
