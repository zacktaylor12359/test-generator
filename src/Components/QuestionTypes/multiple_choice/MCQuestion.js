import styles from './MCQuestion.module.css';
import { useState } from 'react';
import AnswerChoices from './AnswerChoices';

const MCQuestion = (props) => {
	const [compKey, setCompKey] = useState(0);
	const [numOptions, setNumOptions] = useState(4);
	const [question, setQuestion] = useState(['']);

	const handleChange = (index, e) => {
		let newQuestion = [...question];
		newQuestion[index][e.target.name] = e.target.value;
		setQuestion(newQuestion);
	};

	const addQuestion = () => {
		setQuestion([...question, '']);
	};

	const removeQuestion = (index) => {
		let newFormValues = [...question];
		newFormValues.splice(index, 1);
		setQuestion(newFormValues);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		alert(JSON.stringify(question));
		setNumOptions(3);
		setCompKey(compKey + 1);
	};

	return (
		<form onSubmit={handleSubmit} key={compKey}>
			{question.map((element, index) => (
				<div className='form-inline' key={index}>
					<label>Question {index + 1}</label>
					<textarea
						type='text'
						name='question'
						className={styles['question-field']}
						value={element.question || ''}
						onChange={(e) => handleChange(index, e)}
					/>
					<AnswerChoices numChoices={numOptions} />
					{index ? (
						<button
							type='button'
							className='button remove'
							onClick={() => removeQuestion(index)}
						>
							Remove
						</button>
					) : null}
				</div>
			))}
			<div className='button-section'>
				<button
					className='button add'
					type='button'
					onClick={() => addQuestion()}
				>
					Add
				</button>
				<button className='button submit' type='submit'>
					Submit
				</button>
			</div>
		</form>
	);
};

export default MCQuestion;
