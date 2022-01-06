import styles from './MCQuestion.module.css';
import { useState } from 'react';
import AnswerChoices from './AnswerChoices';
import { Fragment } from 'react';
import Button from '../../UI/Button';

const MCQuestion = (props) => {
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

	return (
		<Fragment>
			{question.map((element, index) => (
				<div key={index}>
					<label>Question {index + 1}</label>
					<textarea
						type='text'
						name='question'
						className={styles['question-field']}
						value={element.question || ''}
						onChange={(e) => handleQuestionChange(index, e)}
					/>
					<AnswerChoices numChoices={numOptions} />
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
				<Button type='Button' onClick={() => addQuestion()}>
					AddQuestion
				</Button>
			</div>
		</Fragment>
	);
};

export default MCQuestion;
