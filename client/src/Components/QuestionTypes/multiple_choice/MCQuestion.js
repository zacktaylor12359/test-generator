import React, { useRef, useMemo, Fragment } from 'react';
import { State, useHookstate, none } from '@hookstate/core';
import { useTestState } from '../../../store/sectionState.ts';
import reactTextareaAutosize from 'react-textarea-autosize';
import { ViewportList } from 'react-viewport-list';

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
	const section_state = useHookstate(question_structure);
	const question_list_ref = useRef(null);

	const onAddQuestionHandler = (index) => {
		let new_id = 1;
		while (
			section_state.questions.findIndex(
				// eslint-disable-next-line no-loop-func
				(i) => i.id.get() === new_id
			) !== -1
		) {
			new_id += 1;
		}
		const answersArr = [];

		for (let i = 1; i <= section_state.num_options.get(); i++) {
			answersArr.push({
				id: i,
				entered_option: '',
			});
		}

		let listBefore = JSON.parse(
			JSON.stringify(section_state.questions.get().slice(0, index + 1))
		);
		let listAfter = JSON.parse(
			JSON.stringify(section_state.questions.get().slice(index + 1))
		);

		const newQuestion = {
			id: new_id,
			entered_question: '',
			correct_answer_id: 1,
			answer_options: answersArr,
		};

		let newList = [...listBefore, newQuestion, ...listAfter];

		section_state.questions.set(newList);
	};

	return (
		<div ref={question_list_ref}>
			<ViewportList
				viewportRef={question_list_ref}
				items={section_state.questions}
			>
				{(item, index) => (
					<div key={item.id.value}>
						<Question
							question={item}
							index={index}
							addQuestion={() => onAddQuestionHandler(index)}
						/>
					</div>
				)}
			</ViewportList>
		</div>
		// {/* <Fragment>
		// 	{section_state.questions.map((element, index) => (
		// 		<div key={element.id.value}>
		// 			<Question
		// 				question={element}
		// 				index={index}
		// 				addQuestion={() => onAddQuestionHandler(index)}
		// 			/>
		// 		</div>
		// 	))}
		// </Fragment> */}
	);
};

export default MCQuestion;

const Question = (props) => {
	const { question, index, addQuestion } = props;

	let questionState = useHookstate(question);
	const questionInputRef = useRef();

	const questionBlurHandler = () => {
		questionState.entered_question.set(questionInputRef.current.value);
	};

	const removeQuestion = () => {
		questionState.set(none);
	};

	const onChangeAnswerHandler = (id) => {
		questionState.correct_answer_id.set(id);
	};

	return (
		<Fragment>
			<div className={styles['control']}>
				<label className={styles['label']} htmlFor='question-field'>
					{index + 1}.
				</label>
				<TextareaAutosize
					id='question-field'
					className={styles['question-field']}
					autoFocus
					ref={questionInputRef}
					onBlur={questionBlurHandler}
					type='text'
				/>
				Last render at: {new Date().toISOString()}
			</div>

			<div className={styles['answer-container']}>
				<AnswerChoices
					answerOptions={question.answer_options}
					questionID={question.id.value}
					onChange={onChangeAnswerHandler}
				/>
			</div>
			<div className='Button-section'>
				<Button type='Button' onClick={() => addQuestion()}>
					AddQuestion
				</Button>

				<Button
					className={styles['rmv-btn']}
					type='Button'
					onClick={() => removeQuestion(index)}
				>
					Remove Question
				</Button>
			</div>
		</Fragment>
	);
};
