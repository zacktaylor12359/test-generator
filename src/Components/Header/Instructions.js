import styles from './Instructions.module.css';
import { useState, Fragment } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const Title = () => {
	const [enteredInstructions, setEnteredInstructions] = useState('');

	const instructionsChangeHandler = (e) => {
		setEnteredInstructions(e.target.value);
	};

	return (
		<div className={styles['control']}>
			<TextareaAutosize
				id='header'
				className={styles['instructions']}
				autoFocus
				minRows={1}
				value={enteredInstructions}
				onChange={instructionsChangeHandler}
				placeholder='Instructions'
			/>
		</div>
	);
};

export default Title;
