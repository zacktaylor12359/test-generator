import React from 'react';
import { useHookstate, hookstate } from '@hookstate/core';
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

interface TestState {
	header: boolean;
	header_left_alignment: boolean;
	entered_header: string;
	title: boolean;
	entered_title: string;
	instructions: boolean;
	entered_instructions: string;
	section: MCSection[];
}

interface MCSection {
	id: number;
	section_title: boolean;
	entered_section_title: string;
	section_instructions: boolean;
	entered_section_instructions: string;
	question_type: string;
	question_structure: {
		num_options: number;
		questions: [
			{
				id: number;
				entered_question: string;
				correct_answer_id: number;
				answer_options: [
					{
						id: number;
						entered_option: string;
					}
				];
			}
		];
	};
}

const state = hookstate<TestState>({
	header: false,
	header_left_alignment: true,
	entered_header: '',
	title: false,
	entered_title: '',
	instructions: false,
	entered_instructions: '',
	section: [],
});

export const useTestState = () => {
	return useHookstate(state);
};

export const addMCSection = (section: MCSection, index: number) => {
	state.section[index].set(section);
};
