import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
	return (
		<div className={styles.loadingParent}>
			<div className={styles.loading}>Loading</div>
		</div>
	);
};

export default Loading;
