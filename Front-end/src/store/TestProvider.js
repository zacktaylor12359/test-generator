import { useState, useReducer } from 'react';

import TestContext from './test-context';

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
		const updatedSection = [...section];
		updatedSection.splice(sectionIndex, 0, sectionObject);
		console.log(updatedSection);
		setSection(updatedSection);
	};

	const removeSectionHandler = (sectionIndex) => {
		const updatedSection = [...section];
		updatedSection.splice(sectionIndex, 1);
		setSection(updatedSection);
	};

	const addMCQuestionHandler = (sectionIndex, questionIndex) => {
		const updatedQuestions = [
			...section[sectionIndex].section_structure.questions,
		];
		const newQuestion = [
			{
				question: '',
				answerOptions: [],
			},
		];
		updatedQuestions.splice(questionIndex);
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
	};

	return (
		<TestContext.Provider value={testContext}>
			{props.children}
		</TestContext.Provider>
	);
};

export default TestProvider;
