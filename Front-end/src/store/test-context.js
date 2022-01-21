import { createContext } from 'react';

const TestContext = createContext({
	header: false,
	header_left_alignment: true,
	entered_header: '',
	title: false,
	entered_title: '',
	instructions: false,
	entered_instructions: '',
	section: [],
	addHeader: () => {},
	removeHeader: () => {},
	alignLeftBtn: () => {},
	alignRightBtn: () => {},
	headerChange: (e) => {},
	addTitle: () => {},
	removeTitle: () => {},
	titleChange: (e) => {},
	addInstructions: () => {},
	removeInstructions: () => {},
	instructionsChange: (e) => {},
	addSection: (sectionObject, sectionIndex) => {},
	removeSection: (sectionIndex) => {},
	addQuestion: (sectionIndex, questionIndex) => {},
	removeQuestion: (sectionIndex, questionIndex) => {},
	questionChange: (sectionIndex, questionIndex, newValue) => {},
});

export default TestContext;
