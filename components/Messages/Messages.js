import React, { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

const Messages = () => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("messages").select("*");
      setChat(data);
    };
    getData();
  }, []);

  // supabase
  //   .channel("test")
  //   .on("broadcast", { event: "supa" }, (payload) => console.log(payload))
  //   .subscribe();

  // supabase.channel("test").subscribe((status) => {
  //   if (status === "SUBSCRIBED") {
  //     channel.send({
  //       type: "broadcast",
  //       event: "supa",
  //       payload: { org: "supabase" },
  //     });
  //   }
  // });

  // supabase
  //   .channel("any")
  //   .on("broadcast", { event: "*", table: "messages" }, (payload) =>
  //     console.log(payload)
  //   )
  //   .subscribe();

  useEffect(() => {
    const channel = supabase.channel("test");
    const messages = supabase
      .channel("test")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          setChat((current) => [...current, payload.new]);
        }
      )
      .on("presence", { event: "join" }, () => {
        const state = channel.presenceState();
        console.log(state);
      })

      .subscribe();
  });

  // useEffect(() => {
  //   const channel = supabase.channel("test");
  //   supabase
  //     .channel("test")
  //     .on("presence", { event: "sync" }, () => {
  //       const state = channel.presenceState("id");
  //       console.log(state);
  //     })
  //     .subscribe();
  // });

  return (
    <ul>
      {chat.map((message) => (
        <li key={message.id}>
          <h4>{message.created_at}</h4>
          <h2>Message:</h2>
          <p>{message.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default Messages;
