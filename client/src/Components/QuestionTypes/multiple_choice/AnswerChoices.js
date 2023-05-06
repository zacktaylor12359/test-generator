import { State, useHookstate, none } from '@hookstate/core';
import React, { useRef, Fragment } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './AnswerChoices.module.css';

const AnswerChoices = (props) => {
	const { answerOptions, questionID, onChange } = props;
	let answerOptionsState = useHookstate(answerOptions);

	const onChangeAnswer = (id) => {
		console.log('cunt', id);
		onChange(id);
	};

	return (
		<div className={styles['answers-container']}>
			{answerOptionsState.map((element, index) => (
				<div key={element.id.value}>
					<Answer
						answer={element}
						questionID={questionID}
						onChangeAnswer={onChangeAnswer}
					/>
				</div>
			))}
		</div>
	);
};

export default AnswerChoices;

const Answer = (props) => {
	const { answer, questionID, onChangeAnswer } = props;
	let answerState = useHookstate(answer);
	const answerInputRef = useRef();

	const answerBlurHandler = () => {
		answerState.entered_option.set(answerInputRef.current.value);
	};

	const answerChangeHandler = (e) => {
		let id = parseInt(e.target.value);
		onChangeAnswer(id);
	};

	return (
		<div className={styles['control']}>
			<label className={styles['label']} htmlFor='answer-field'>
				<input
					type='radio'
					name={questionID}
					className={styles['radio-button']}
					onChange={answerChangeHandler}
					value={answerState.id.get()}
				/>
			</label>
			<TextareaAutosize
				id='answer-field'
				className={styles['answer-field']}
				autoFocus
				ref={answerInputRef}
				onBlur={answerBlurHandler}
				type='text'
			/>
			Last render at: {new Date().toISOString()}
		</div>
	);
};
