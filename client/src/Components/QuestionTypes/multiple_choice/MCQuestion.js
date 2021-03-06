import React, { useRef, useMemo, Fragment } from 'react';
import { State, useState, none } from '@hookstate/core';
import { useTestState } from '../../../store/sectionState.ts';
import reactTextareaAutosize from 'react-textarea-autosize';

import styles from './MCQuestion.module.css';
import Button from '../../UI/Button';
import AnswerChoices from './AnswerChoices';
import TextareaAutosize from 'react-textarea-autosize';

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
			<div className="Button-section">
				<Button type="Button" onClick={addQuestion}>
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

	const onChangeAnswerHandler = (id) => {
		questionState.correct_answer_id.set(id);
	};

	return (
		<Fragment>
			<div className={styles['control']}>
				<label className={styles['label']} htmlFor="question-field">
					{index + 1}.
				</label>
				<TextareaAutosize
					id="question-field"
					className={styles['question-field']}
					autoFocus
					ref={questionInputRef}
					type="text"
				/>
			</div>

			<div className={styles['answer-container']}>
				<AnswerChoices
					answerOptions={question.answer_options}
					questionID={question.id.value}
					onChange={onChangeAnswerHandler}
				/>
			</div>
			<Button
				className={styles['rmv-btn']}
				type="Button"
				onClick={() => removeQuestion(props.index)}
			>
				Remove Question
			</Button>
		</Fragment>
	);
};
