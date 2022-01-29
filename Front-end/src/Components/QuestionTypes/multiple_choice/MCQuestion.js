import { useContext, Fragment } from 'react';
import { State, useState, none } from '@hookstate/core';
import { TestState } from '../../../store/sectionState.ts';
import reactTextareaAutosize from 'react-textarea-autosize';

import styles from './MCQuestion.module.css';
import AnswerChoices from './AnswerChoices';
import Button from '../../UI/Button';
import TestContext from '../../../store/test-context';
import QuestionInput from './QuestionInput';

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
			question:
			answer_options: [{
				id: 
				option: 
			}]
		}]
	}
]
*/

const MCQuestion = (props) => {
	console.log('cunt');
	const testCtx = useContext(TestContext);
	let testState = useState(props.question_structure);
	console.log('cunt', testState);
	const addQuestion = (questionIndex) => {
		testCtx.addQuestion(props.sectionIndex, questionIndex);
	};

	const removeQuestion = (questionIndex) => {
		testCtx.removeQuestion(props.sectionIndex, questionIndex);
	};

	return (
		<Fragment>
			{testState.questions.map((element, index) => (
				<div key={element.id.value}>
					<label>Question {props.questionIndex + 1}</label>
					<textarea type='text' name='question' />
					<AnswerChoices answerOptions={element.answer_options} />
					<Button
						className={styles['rmv-btn']}
						type='Button'
						onClick={() => removeQuestion(index)}
					>
						Remove Question
					</Button>
				</div>
			))}
			<div className='Button-section'>
				<Button
					type='Button'
					onClick={() => addQuestion(props.questions.length)}
				>
					AddQuestion
				</Button>
			</div>
		</Fragment>
	);
};

export default MCQuestion;
