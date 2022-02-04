import { none } from '@hookstate/core';

import Modal from '../UI/Modal';
import styles from './RemoveSectionModal.module.css';
import Button from '../UI/Button';
import { useTestState } from '../../store/sectionState.ts';

const RemoveSectionModal = (props) => {
	const testState = useTestState();

	const removeSectionHandler = () => {
		testState.section[props.index].set(none);
		props.onClose();
	};
	console.log(props.index);
	return (
		<Modal>
			<header className={styles.header}>
				<h2>{props.title}</h2>
			</header>

			<form className={styles.content}>
				<p>Are you sure you want to remove this section?</p>

				<footer className={styles.actions}>
					<Button onClick={props.onClose}>Cancel</Button>
					<Button onClick={removeSectionHandler}>
						Remove Section
					</Button>
				</footer>
			</form>
		</Modal>
	);
};

export default RemoveSectionModal;
