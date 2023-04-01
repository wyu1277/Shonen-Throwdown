const getChannel = async () => {
    const newChannel = await Router.query;
    console.log("this is new channel", newChannel);
    setChannels(newChannel.id);
  };