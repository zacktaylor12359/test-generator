import { createContext } from 'react';

const TestContext = createContext({
	header: '',
	headerAlignment: '',
	title: '',
	instructions: '',
	section: [
		{
			section_type: '',
			section_title: '',
			section_instructions: '',
			section_structure: {},
		},
	],
});

export default TestContext;
