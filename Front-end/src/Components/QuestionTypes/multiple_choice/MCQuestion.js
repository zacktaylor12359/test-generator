import { useState, useContext, Fragment } from 'react';
import reactTextareaAutosize from 'react-textarea-autosize';

import styles from './MCQuestion.module.css';
import AnswerChoices from './AnswerChoices';
import Button from '../../UI/Button';
import TestContext from '../../../store/test-context';

/*
MC structure
section [
	section_title:
	section_instructions:
	question_type:
	question_structure: {
		num_options:
		questions: {
			question:
			answer_options:
		}
	}
]
*/

const MCQuestion = (props) => {
	const testCtx = useContext(TestContext);

	const addQuestion = (questionIndex) => {
		testCtx.addQuestion(props.sectionIndex, questionIndex);
	};

	const removeQuestion = (questionIndex) => {
		testCtx.removeQuestion(props.sectionIndex, questionIndex);
	};

	const questionChangeHandler = (questionIndex, e) => {
		testCtx.questionChange(
			props.sectionIndex,
			questionIndex,
			e.target.value
		);
	};

	return (
		<Fragment>
			{props.questions.map((element, index) => (
				<div key={index}>
					<label>Question {index + 1}</label>
					<textarea
						type="text"
						name="question"
						className={styles['question-field']}
						value={element.question || ''}
						onChange={(e) => questionChangeHandler(index, e)}
					/>
					<AnswerChoices
						sectionIndex={props.sectionIndex}
						questionIndex={index}
						answerOptions={element.answer_options}
					/>
					<Button
						className={styles['rmv-btn']}
						type="Button"
						onClick={() => removeQuestion(index)}
					>
						Remove Question
					</Button>
				</div>
			))}
			<div className="Button-section">
				<Button
					type="Button"
					onClick={() => addQuestion(props.questions.length)}
				>
					AddQuestion
				</Button>
			</div>
		</Fragment>
	);
};

export default MCQuestion;
