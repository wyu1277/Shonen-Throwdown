import React, { useState } from 'react';
import styles from './Modal.module.css';
import ReactDom from 'react-dom';

let Modal = ({ open, card, onClose }) => {
	if (!open) return null;
	return ReactDom.createPortal(
		<div className={styles.card}>
			<button onClick={onClose}>Close</button>
			<img src={card.image} alt={card.name} className={styles.img} />
		</div>,
		document.getElementById('portal')
	);
};

export default Modal;
