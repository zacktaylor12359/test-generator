import React, { useRef, useMemo, Fragment } from 'react';
import { State, useState, none } from '@hookstate/core';
import { useTestState } from '../../../store/sectionState.ts';
import reactTextareaAutosize from 'react-textarea-autosize';

import styles from './MCQuestion.module.css';
import Button from '../../UI/Button';
import AnswerChoices from './AnswerChoices';

/*
MC structure
section [
	id: 
	section_title:
	section_instructions:
	question_type:
	question_structure: {
		num_options:
		questions: [{
			id:
			entered_question:
			answer_options: [{
				id: 
				option: 
			}]
		}]
	}
]
*/

const MCQuestion = (props) => {
	const { question_structure } = props;
	let sectionState = useState(question_structure);
	let questionsState = useState(question_structure.questions);
	const addQuestion = () => {
		let new_id = 1;
		while (
			sectionState.questions.findIndex(
				// eslint-disable-next-line no-loop-func
				(i) => i.id.get() === new_id
			) !== -1
		) {
			new_id += 1;
		}
		const answersArr = [];

		for (let i = 1; i <= sectionState.num_options.get(); i++) {
			answersArr.push({
				id: i,
				entered_option: '',
			});
		}
		const newQuestion = {
			id: new_id,
			question: '',
			answer_options: answersArr,
		};

		sectionState.questions[sectionState.questions.length].set(newQuestion);
	};

	return (
		<Fragment>
			{questionsState.map((element, index) => (
				<div key={element.id.value}>
					{console.log('question Rendered')}
					<Question question={element} index={index} />
				</div>
			))}
			<div className='Button-section'>
				<Button type='Button' onClick={addQuestion}>
					AddQuestion
				</Button>
			</div>
		</Fragment>
	);
};

export default MCQuestion;

const Question = (props) => {
	const { question, index } = props;
	let questionState = useState(question);
	const questionInputRef = useRef();

	const removeQuestion = () => {
		questionState.set(none);
	};
	const onBlurHandler = () => {
		questionState.entered_question.set(questionInputRef.current.value);
	};

	return (
		<Fragment>
			<label>Question {index + 1}</label>
			<input ref={questionInputRef} onBlur={onBlurHandler} type='text' />

			<AnswerChoices answerOptions={props.question.answer_options} />
			<Button
				className={styles['rmv-btn']}
				type='Button'
				onClick={() => removeQuestion(props.index)}
			>
				Remove Question
			</Button>
		</Fragment>
	);
};
