import { useState, useContext, Fragment } from 'react';

import styles from './MCQuestion.module.css';
import AnswerChoices from './AnswerChoices';
import Button from '../../UI/Button';
import TestContext from '../../../store/test-context';

const MCQuestion = (props) => {
	const testCtx = useContext(TestContext);

	const [numOptions, setNumOptions] = useState(4);
	const [question, setQuestion] = useState([{ question: '' }]);

	const handleQuestionChange = (index, e) => {
		let newQuestion = [...question];
		newQuestion[index][e.target.name] = e.target.value;
		setQuestion(newQuestion);
	};

	const addQuestion = () => {
		setQuestion([...question, { question: '' }]);
	};

	const removeQuestion = (index) => {
		let newFormValues = [...question];
		newFormValues.splice(index, 1);
		setQuestion(newFormValues);
	};

	console.log(props.section);
	return (
		<Fragment>
			{props.section.section_structure.questions.map((element, index) => (
				<div key={index}>
					<label>Question {index + 1}</label>
					<textarea
						type="text"
						name="question"
						className={styles['question-field']}
						value={element.question || ''}
						onChange={(e) => handleQuestionChange(index, e)}
					/>
					<AnswerChoices answerOptions={element.answerOptions} />
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
				<Button type="Button" onClick={() => addQuestion()}>
					AddQuestion
				</Button>
			</div>
		</Fragment>
	);
};

export default MCQuestion;
