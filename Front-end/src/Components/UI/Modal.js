import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import Card from './Card';
import Backdrop from './Backdrop';

const Modal = (props) => {
	return (
		<Fragment>
			<Backdrop />
			{ReactDOM.createPortal(
				<Card className={styles.modal}>{props.children}</Card>,
				document.getElementById('modal-overlay-root')
			)}
		</Fragment>
	);
};

export default Modal;
