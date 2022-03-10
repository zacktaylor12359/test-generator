import React, { Fragment } from 'react';
import styles from './Backdrop.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<div className={styles.backdrop} onClick={props.onAction} />,
				document.getElementById('backdrop-root')
			)}
		</Fragment>
	);
};

export default Backdrop;
