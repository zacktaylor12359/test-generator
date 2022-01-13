import styles from './Instructions.module.css';
import { useState, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import TestContext from '../../store/test-context';

const Title = () => {
	const testCtx = useContext(TestContext);

	const instructionsChangeHandler = (e) => {
		testCtx.instructionsChange(e);
	};

	return (
		<div className={styles['control']}>
			<TextareaAutosize
				id='header'
				className={styles['instructions']}
				autoFocus
				minRows={1}
				value={testCtx.entered_instructions}
				onChange={instructionsChangeHandler}
				placeholder='Instructions'
			/>
		</div>
	);
};

export default Title;
