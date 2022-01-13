import Modal from './Modal';
import Button from './Button';
import styles from './SectionModal.module.css';

const SectionModal = (props) => {
	return (
		<Modal>
			<header className={styles.header}>
				<h2>{props.title}</h2>
			</header>
			<form className={styles.content}>
				<div className={styles['form-input']}>
					<label for='title'>Section Title:</label>

					<input
						type='checkbox'
						id='title'
						name='title'
						value='Title'
					/>
				</div>

				<div className={styles['form-input']}>
					<label for='instructions'>Section Instructions:</label>
					<input
						type='checkbox'
						id='instructions'
						name='instructions'
						value='Instructions'
					/>
				</div>

				<div className={styles['form-input']}>
					<label for='question-type'>Queston Type:</label>
				</div>
			</form>
			<footer className={styles.actions}>
				<Button onClick={props.onClose}>Okay</Button>
			</footer>
		</Modal>
	);
};

export default SectionModal;
