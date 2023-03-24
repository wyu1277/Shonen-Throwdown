import Modal from "@/components/collection/modal";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import styles from "./Collection.module.css";
import { motion } from "framer-motion";
import container from "../../styles/variants";

const Collection = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [data, setData] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [pageMessage, setPageMessage] = useState("Loading...");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageMessage("There are no cards avalible");
    }, 1000);

    if (!user) {
      const loadData = async () => {
        const { data } = await supabase.from("cards").select("*");
        setData(data);
      };
      loadData();
    } else {
      const loadData = async () => {
        const cardIds = await supabase
          .from("collections")
          .select()
          .eq("user_id", user.id);
        console.log(cardIds, "CARDIDS");
        const cardIdArr = cardIds.data.map((card) => card.cards_id);
        const cards = await supabase
          .from("cards")
          .select("*")
          .in("id", cardIdArr);
        // console.log('logged in collection', cardIds.data);
        // console.log('cardIdArr', cardIdArr);
        // console.log('cards', cards.data);
        setData(cards.data);
      };
      loadData();
    }
  }, []);

  const filteredData =
    data &&
    data.filter((card) =>
      card.name.toLowerCase().includes(searchInput.toLowerCase())
    );

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
      className={styles.pageParent}
    >
      <div className={styles.searchParent}>
        <input
          className={styles.searchBar}
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name..."
        />
      </div>
      <div className={styles.cardParent}>
        {filteredData !== undefined ? (
          filteredData.map((card) => (
            <motion.div
              whileHover={{ scale: 1.5 }}
              key={card.id}
              onClick={() => {
                setShowModal(!showModal);
                handleCardClick(card);
              }}
              className={styles.card}
              //   whileTap={{ scale: 0.5, x: window.innerWidth / 2 }}
            >
              <img src={card.image} alt={card.name} className={styles.img} />
            </motion.div>
          ))
        ) : (
          <div className={styles.loading}>
            <h1>{pageMessage}</h1>
          </div>
        )}
      </div>
      <div className={styles.modalParent}>
        {showModal && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Collection;
