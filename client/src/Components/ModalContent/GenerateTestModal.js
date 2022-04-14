import styles from './GenerateTestModal.module.css';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
//import { useState, useCallback } from 'React';
import { useTestState } from '../../store/sectionState.ts';

const GenerateTestModal = (props) => {
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);
	const testState = useTestState();

	const onGenerateTestHandler = async () => {
		console.log(JSON.stringify(testState.get()));
		// setIsLoading(true);
		// setError(null);
		// try {
		// 	const response = await fetch('http://localhost:4000', {
		// 		method: 'POST',
		// 		body: JSON.stringify(testState.get()),
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		}
		// 	});
		// } catch {
		// } finally {
		// 	props.onClose();
		// }

		props.onClose();
	};
	return (
		<Modal>
			<header className={styles.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={styles.content}>
				<p>Generate Test?</p>
			</div>
			<footer className={styles.actions}>
				<Button onClick={props.onClose}>Cancel</Button>
				<Button onClick={onGenerateTestHandler}>Confirm</Button>
			</footer>
		</Modal>
	);
};

export default GenerateTestModal;
