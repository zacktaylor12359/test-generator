import { useState, useReducer } from 'react';

import TestContext from './test-context';

/*
MC structure
section[
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

const TestProvider = (props) => {
	const [header, setHeader] = useState(false);
	const [headerAlignLeft, setHeaderAlignLeft] = useState(true);
	const [enteredHeader, setEnteredHeader] = useState('');

	const [title, setTitle] = useState(false);
	const [enteredTitle, setEnteredTitle] = useState('');

	const [instructions, setInstructions] = useState(false);
	const [enteredInstructions, setEnteredInstructions] = useState('');

	const [section, setSection] = useState([]);

	const addHeaderHandler = () => {
		setHeader(true);
	};

	const removeHeaderHandler = () => {
		setHeader(false);
	};

	const alignRightBtnHandler = () => {
		setHeaderAlignLeft(false);
	};

	const alignLeftBtnHandler = () => {
		setHeaderAlignLeft(true);
	};

	const headerChangeHandler = (e) => {
		setEnteredHeader(e.target.value);
	};

	const addTitleHandler = () => {
		setTitle(true);
	};

	const removeTitleHandler = () => {
		setTitle(false);
	};
	const titleChangeHandler = (e) => {
		setEnteredTitle(e.target.value);
	};

	const addInstructionsHandler = () => {
		setInstructions(true);
	};

	const removeInstructionsHandler = () => {
		setInstructions(false);
	};
	const instructionsChangeHandler = (e) => {
		setEnteredInstructions(e.target.value);
	};
	const addSectionHandler = (sectionObject, sectionIndex) => {
		setSection((prevSectionArr) => {
			const updatedSection = [
				...prevSectionArr.slice(0, sectionIndex),
				sectionObject,
				...prevSectionArr.slice(sectionIndex),
			];
			return updatedSection;
		});
	};

	const removeSectionHandler = (sectionIndex) => {
		setSection((prevSectionArr) => {
			const updatedSection = [
				...prevSectionArr.slice(0, sectionIndex),
				...prevSectionArr.slice(sectionIndex + 1),
			];
			return updatedSection;
		});
	};

	const addQuestionHandler = (sectionIndex, questionIndex) => {
		console.log('addQuestionHandler', sectionIndex, questionIndex);
		setSection((prevSectionArr) => {
			const prevQuestionType = prevSectionArr[sectionIndex].question_type;
			const prevSection = prevSectionArr[sectionIndex];
			const prevQuestionStructure =
				prevSectionArr[sectionIndex].question_structure;

			switch (prevQuestionType) {
				case 'MC':
					const prevQuestionArr =
						prevSectionArr[sectionIndex].question_structure
							.questions;
					const prevNumOptions =
						prevSectionArr[sectionIndex].question_structure
							.num_options;
					const updatedSection = [
						...prevSectionArr.slice(0, sectionIndex),
						{
							...prevSection,
							question_structure: {
								...prevQuestionStructure,
								questions: [
									...prevQuestionArr.slice(0, questionIndex),
									{
										question: '',
										answer_options: new Array(
											prevNumOptions
										).fill(''),
									},
									...prevQuestionArr.slice(questionIndex + 1),
								],
							},
						},
						...prevSectionArr.slice(sectionIndex + 1),
					];
					return updatedSection;
				default:
					return prevSectionArr;
			}
		});
	};

	const removeQuestionHandler = (sectionIndex, questionIndex) => {
		console.log(questionIndex);
		setSection((prevSectionArr) => {
			const prevSection = prevSectionArr[sectionIndex];
			const prevQuestionStructure =
				prevSectionArr[sectionIndex].question_structure;
			const prevQuestionArr =
				prevSectionArr[sectionIndex].question_structure.questions;

			const updatedSection = [
				...prevSectionArr.slice(0, sectionIndex),
				{
					...prevSection,
					question_structure: {
						...prevQuestionStructure,
						questions: [
							...prevQuestionArr.slice(0, questionIndex),
							...prevQuestionArr.slice(questionIndex + 1),
						],
					},
				},
				...prevSectionArr.slice(sectionIndex + 1),
			];

			console.log(updatedSection);
			return updatedSection;
		});
	};

	const questionChangeHandler = (sectionIndex, questionIndex, newValue) => {
		setSection((prevSectionArr) => {
			const prevQuestionType = prevSectionArr[sectionIndex].question_type;
			const prevSection = prevSectionArr[sectionIndex];
			const prevQuestionStructure =
				prevSectionArr[sectionIndex].question_structure;

			switch (prevQuestionType) {
				case 'MC':
					const prevQuestionArr =
						prevSectionArr[sectionIndex].question_structure
							.questions;
					const updatedSection = [
						...prevSectionArr.slice(0, sectionIndex),
						{
							...prevSection,
							question_structure: {
								...prevQuestionStructure,
								questions: [
									...prevQuestionArr.slice(0, questionIndex),
									{
										...prevQuestionArr[questionIndex],
										question: newValue,
									},
									...prevQuestionArr.slice(questionIndex + 1),
								],
							},
						},
						...prevSectionArr.slice(sectionIndex + 1),
					];
					console.log(newValue);
					return updatedSection;
				default:
					return prevSectionArr;
			}
		});
	};

	const answerOptionChangeMCHandler = (
		sectionIndex,
		questionIndex,
		answerOptionIndex,
		newValue
	) => {
		setSection((prevSectionArr) => {
			const prevSection = prevSectionArr[sectionIndex];
			const prevQuestionStructure =
				prevSectionArr[sectionIndex].question_structure;
			const prevQuestionArr =
				prevSectionArr[sectionIndex].question_structure.questions;
			const prevAnswerArr =
				prevSectionArr[sectionIndex].question_structure.questions[
					questionIndex
				].answer_options;
			const updatedSection = [
				...prevSectionArr.slice(0, sectionIndex),
				{
					...prevSection,
					question_structure: {
						...prevQuestionStructure,
						questions: [
							...prevQuestionArr.slice(0, questionIndex),
							{
								...prevQuestionArr[questionIndex],
								answer_options: [
									...prevAnswerArr.slice(
										0,
										answerOptionIndex
									),
									newValue,

									...prevAnswerArr.slice(
										answerOptionIndex + 1
									),
								],
							},
							...prevQuestionArr.slice(questionIndex + 1),
						],
					},
				},
				...prevSectionArr.slice(sectionIndex + 1),
			];
			console.log(updatedSection);
			return updatedSection;
		});
	};

	const testContext = {
		header: header,
		header_left_alignment: headerAlignLeft,
		entered_header: enteredHeader,
		title: title,
		entered_title: enteredTitle,
		instructions: instructions,
		entered_instructions: enteredInstructions,
		section: section,
		addHeader: addHeaderHandler,
		removeHeader: removeHeaderHandler,
		alignLeftBtn: alignLeftBtnHandler,
		alignRightBtn: alignRightBtnHandler,
		headerChange: headerChangeHandler,
		addTitle: addTitleHandler,
		removeTitle: removeTitleHandler,
		titleChange: titleChangeHandler,
		addInstructions: addInstructionsHandler,
		removeInstructions: removeInstructionsHandler,
		instructionsChange: instructionsChangeHandler,
		addSection: addSectionHandler,
		removeSection: removeSectionHandler,
		addQuestion: addQuestionHandler,
		removeQuestion: removeQuestionHandler,
		questionChange: questionChangeHandler,
		answerOptionChangeMC: answerOptionChangeMCHandler,
	};

	return (
		<TestContext.Provider value={testContext}>
			{props.children}
		</TestContext.Provider>
	);
};

export default TestProvider;
