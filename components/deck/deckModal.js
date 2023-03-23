import React, { useState } from 'react';
import styles from './DeckModal.module.css';
import ReactDom from 'react-dom';
import { motion } from 'framer-motion';
import { useUser } from '@supabase/auth-helpers-react';

let DeckModal = (props) => {
	const user = useUser();
	//   if (!open) return null;
	//   return ReactDom.createPortal(
	//     <motion.div className="backdrop">
	//       <div
	//         className={styles.card}
	//         onClick={() => props.setShowModal(!props.showModal)}
	//       >
	//         <button className={styles.close}>Close</button>
	//         <img src="s" alt="fe" className={styles.img} />
	//       </div>
	//     </motion.div>,
	//     document.getElementById("portal")
	//   );

	return (
		<motion.div className="backdrop">
			<div className={styles.card} onClick={() => props.setShowModal(!props.showModal)}>
				{user ? (
					<button className={styles.removeButton} onClick={() => removeFromDeck(card)}>
						Remove from Deck
					</button>
				) : null}
				<button className={styles.close}>Close</button>
				<img src={props.card.image} alt={props.card.name} className={styles.img} />
			</div>
		</motion.div>
	);
};

export default DeckModal;
