import styles from './Instructions.module.css';
import { useContext } from 'react';
import { useTestState } from '../../store/sectionState.ts';
import TextareaAutosize from 'react-textarea-autosize';

const Title = () => {
	const testState = useTestState();

	const instructionsChangeHandler = (e) => {
		testState.entered_instructions.set(e.target.value);
	};

	return (
		<div className={styles['control']}>
			<TextareaAutosize
				id="header"
				className={styles['instructions']}
				autoFocus
				minRows={1}
				value={testState.entered_instructions.get()}
				onChange={instructionsChangeHandler}
				placeholder="Instructions"
			/>
		</div>
	);
};

export default Title;
