import { State, useState, none } from '@hookstate/core';
import React, { useRef, Fragment } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './AnswerChoices.module.css';

const AnswerChoices = (props) => {
	const { answerOptions, questionID } = props;
	let answerOptionsState = useState(answerOptions);

	return (
		<div className={styles['answers-container']}>
			{answerOptionsState.map((element, index) => (
				<div key={element.id.value}>
					{console.log('answerChoice Rendered')}
					<Answer answer={element} questionID={questionID} />
				</div>
			))}
		</div>
	);
};

export default AnswerChoices;

const Answer = (props) => {
	const { answer, questionID } = props;
	let answerState = useState(answer);
	const answerInputRef = useRef();

	const onAnswerChangeHandler = (e) => {
		console.log(e.target.value);
		answerState.correct_answer_id.set(e.target.value);
		console.log('updated state? ' + answerState.correct_answer_id.get());
	};

	return (
		<div className={styles['control']}>
			<label className={styles['label']} htmlFor='answer-field'>
				<input
					type='radio'
					name={questionID}
					className={styles['radio-button']}
					onChange={onAnswerChangeHandler}
					value={answerState.id.get()}
				/>
			</label>
			<TextareaAutosize
				id='answer-field'
				className={styles['answer-field']}
				autoFocus
				ref={answerInputRef}
				type='text'
			/>
		</div>
	);
};
