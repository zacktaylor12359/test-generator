import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import styles from './SectionModal.module.css';

const SectionModal = (props) => {
	const [typeSettings, setTypeSettings] = useState('Mulitple Choice');
	const typeChangeHandler = (event) => {
		event.preventDefault();
		if (event.target.value == 'Multiple Choice') {
		}
	};
	return (
		<Modal>
			<header className={styles.header}>
				<h2>{props.title}</h2>
			</header>
			<form className={styles.content}>
				<div className={styles['form-input']}>
					<label htmlFor='title'>Section Title:</label>

					<input
						type='checkbox'
						id='title'
						name='title'
						value='Title'
					/>
				</div>

				<div className={styles['form-input']}>
					<label htmlFor='instructions'>Section Instructions:</label>
					<input
						type='checkbox'
						id='instructions'
						name='instructions'
						value='Instructions'
					/>
				</div>

				<div className={styles['form-input']}>
					<label htmlFor='question-type'>Queston Type:</label>
					<select onChange={typeChangeHandler}>
						<option value='Multiple Choice'>Multiple Choice</option>
					</select>
				</div>
			</form>
			<footer className={styles.actions}>
				<Button onClick={props.onClose}>Okay</Button>
			</footer>
		</Modal>
	);
};

export default SectionModal;
