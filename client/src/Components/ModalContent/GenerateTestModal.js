import styles from './GenerateTestModal.module.css';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { useTestState } from '../../store/sectionState.ts';

const GenerateTestModal = (props) => {
	const testState = useTestState();

	const onGenerateTestHandler = () => {
		console.log(testState.get());
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
