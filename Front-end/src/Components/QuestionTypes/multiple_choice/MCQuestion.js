import { useContext, useRef, Fragment } from 'react';
import { State, useState, none } from '@hookstate/core';
import { useTestState } from '../../../store/sectionState.ts';
import reactTextareaAutosize from 'react-textarea-autosize';

import styles from './MCQuestion.module.css';
import Button from '../../UI/Button';
import TestContext from '../../../store/test-context';

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

const Question = (props) => {
	const questionState = useState(props.question);
	const questionInputRef = useRef();
	const testState = useTestState();

	const removeQuestion = () => {
		questionState.set(none);
	};
	const onBlurHandler = () => {
		console.log('question state', questionState.entered_question.get());
		console.log(
			'global',
			testState.section[0].question_structure.questions[0].entered_question.get()
		);  
		questionState.entered_question.set(questionInputRef.current.value);
	};

	return (
		<Fragment>
			<label>Question {props.index + 1}</label>
			<textarea ref={questionInputRef} onBlur={onBlurHandler} />
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

const Answer = (props) => {
	const answerState = useState(props.answer);
	const answerInputRef = useRef();

	const onBlurHandler = () => {
		console.log('what the fuck!!!!!!!!!');
		answerState.entered_option.set(answerInputRef.current.value);
	};

	return (
		<Fragment>
			{props.index === 0 ? (
				<Fragment>
					<label>Answer</label>
					<input
						ref={answerInputRef}
						onBlur={onBlurHandler}
						type='text'
					/>
				</Fragment>
			) : (
				<Fragment>
					<label>Option {props.index + 1}</label>
					<input
						ref={answerInputRef}
						onBlur={onBlurHandler}
						type='text'
					/>
				</Fragment>
			)}
		</Fragment>
	);
};

const MCQuestion = (props) => {
	const sectionState = useState(props.question_structure);
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
			{sectionState.questions.map((element, index) => (
				<div key={element.id.value}>
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

const AnswerChoices = (props) => {
	let answerOptionsState = useState(props.answerOptions);

	return (
		<Fragment>
			{answerOptionsState.map((element, index) => (
				<div key={element.id.value}>
					<Answer answer={element} index={index} />
				</div>
			))}
		</Fragment>
	);
};

export default MCQuestion;
