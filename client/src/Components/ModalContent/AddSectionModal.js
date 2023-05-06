import { useState, Fragment, useContext } from 'react';
import { State } from '@hookstate/core';
import { useTestState, addMCSection } from '../../store/sectionState.ts';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import styles from './AddSectionModal.module.css';

const SectionModal = (props) => {
	const testState = useTestState();

	const [sectionTitle, setSectionTitle] = useState(false);
	const [sectionInstructions, setSectionInstructions] = useState(false);
	const [numQuestions, setNumQuestions] = useState(1);
	const [numOptions, setNumOptions] = useState(4);
	const [typeSettings, setTypeSettings] = useState('MC');

	const sectionTitleChangeHandler = (event) => {
		event.target.checked === true
			? setSectionTitle(true)
			: setSectionTitle(false);
	};

	const sectionInstructionsChangeHandler = (event) => {
		event.target.checked === true
			? setSectionInstructions(true)
			: setSectionInstructions(false);
	};

	const typeChangeHandler = (event) => {
		const option = parseInt(event.target.value);
		switch (option) {
			case 1:
				setTypeSettings('MC');
				break;
			default:
				setTypeSettings('MC');
				break;
		}
	};

	const numQuestionsChangeHandler = (event) => {
		event.target.value === ''
			? setNumQuestions(0)
			: setNumQuestions(parseInt(event.target.value));
	};

	const numOptionsChangeHandler = (event) => {
		event.target.value === ''
			? setNumOptions(0)
			: setNumOptions(parseInt(event.target.value));
	};

	const onAddSectionHandler = (event) => {
		event.preventDefault();

		//Generating a unique id for the section
		let new_id = 1;
		while (
			testState.section.findIndex(
				// eslint-disable-next-line no-loop-func
				(i) => i.id.get() === new_id
			) !== -1
		) {
			new_id += 1;
		}

		if (typeSettings === 'MC') {
			const questionsArr = [];
			const answersArr = [];

			for (let i = 1; i <= numOptions; i++) {
				answersArr.push({
					id: i,
					entered_option: '',
				});
			}
			for (let i = 1; i <= numQuestions; i++) {
				questionsArr.push({
					id: i,
					correct_answer_id: 1,
					answer_options: answersArr,
				});
			}

			const newSection = {
				id: new_id,
				section_title: sectionTitle,
				entered_section_title: '',
				section_instructions: sectionInstructions,
				entered_section_instructions: '',
				question_type: typeSettings,
				question_structure: {
					num_options: numOptions,
					questions: questionsArr,
				},
			};
			addMCSection(newSection, props.index);
		}
		props.onClose();
	};

	return (
		<Modal>
			<header className={styles.header}>
				<h2>{props.title}</h2>
			</header>
			<form className={styles.content}>
				<div className={styles['form-input']}>
					<label htmlFor='title'>Section Title:</label>

					<input
						onChange={sectionTitleChangeHandler}
						type='checkbox'
						id='title'
						name='title'
						value={sectionTitle}
					/>
				</div>

				<div className={styles['form-input']}>
					<label htmlFor='instructions'>Section Instructions:</label>
					<input
						onChange={sectionInstructionsChangeHandler}
						type='checkbox'
						id='instructions'
						name='instructions'
						value={sectionInstructions}
					/>
				</div>

				<div className={styles['form-input']}>
					<label htmlFor='question-type'>Queston Type:</label>
					<select onChange={typeChangeHandler}>
						<option value='1'>Multiple Choice</option>
						<option value='1'>Multiple Choice</option>
					</select>
				</div>

				{typeSettings === 'MC' && (
					<Fragment>
						<div className={styles['form-input']}>
							<label htmlFor='answer-options'>
								Number of Questions:
							</label>
							<input
								className={styles['number-input']}
								onChange={numQuestionsChangeHandler}
								type='number'
								id='answer-options'
								name='answer-options'
								min='0'
								max='500'
								step='1'
								value={
									numQuestions > 0
										? numQuestions.toString()
										: ''
								}
							/>
						</div>

						<div className={styles['form-input']}>
							<label htmlFor='answer-options'>
								Number of Answer Options:
							</label>
							<input
								className={styles['number-input']}
								onChange={numOptionsChangeHandler}
								type='number'
								id='answer-options'
								name='answer-options'
								min='1'
								max='10'
								step='1'
								value={
									numOptions > 0 ? numOptions.toString() : ''
								}
							/>
						</div>
					</Fragment>
				)}

				<footer className={styles.actions}>
					<Button onClick={props.onClose}>Cancel</Button>
					<Button onClick={onAddSectionHandler}>Add Section</Button>
				</footer>
			</form>
		</Modal>
	);
};

export default SectionModal;
