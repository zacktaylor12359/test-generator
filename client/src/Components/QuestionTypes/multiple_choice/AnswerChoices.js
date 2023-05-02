import { State, useState, none } from '@hookstate/core';
import React, { useRef, Fragment } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './AnswerChoices.module.css';

const AnswerChoices = (props) => {
	const { answerOptions, questionID, onChange } = props;
	let answerOptionsState = useState(answerOptions);

	const onChangeAnswer = (id) => {
		onChange(id);
	};

	return (
		<div className={styles['answers-container']}>
			{answerOptionsState.map((element, index) => (
				<div key={element.id.value}>
					{console.log('answerChoice Rendered')}
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
	console.log(props.questionID);
	let answerState = useState(answer);
	const answerInputRef = useRef();

	const answerBlurHandler = () => {
		answerState.entered_option.set(answerInputRef.current.value);
	};

	const answerChangeHandler = (e) => {
		onChangeAnswer(e.target.value);
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
		</div>
	);
};
