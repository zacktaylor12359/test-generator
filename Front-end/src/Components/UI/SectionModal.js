import Modal from './Modal';
import Button from './Button';
import styles from './SectionModal.module.css';

const SectionModal = (props) => {
	return (
		<Modal>
			<header className={styles.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={styles.content}>
				<p>{props.message}</p>
			</div>
			<footer className={styles.actions}>
				<Button onClick={props.onClose}>Okay</Button>
			</footer>
		</Modal>
	);
};

export default SectionModal;
