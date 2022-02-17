import { State, useState, none } from '@hookstate/core';
import React, { useRef, Fragment } from 'react';

const AnswerChoices = (props) => {
	const { answerOptions } = props;
	let answerOptionsState = useState(answerOptions);

	return (
		<Fragment>
			{answerOptionsState.map((element, index) => (
				<div key={element.id.value}>
					{console.log('answerChoice Rendered')}
					<Answer answer={element} index={index} />
				</div>
			))}
		</Fragment>
	);
};

export default AnswerChoices;

const Answer = (props) => {
	const { answer, index } = props;
	let answerState = useState(answer);
	const answerInputRef = useRef();

	const onBlurHandler = () => {
		answerState.entered_option.set(answerInputRef.current.value);
	};

	return (
		<Fragment>
			{index === 0 ? (
				<Fragment>
					<label>Answer</label>
					<input
						ref={answerInputRef}
						onBlur={onBlurHandler}
						type='text'
					/>
				</Fragment>
			) : (
				<Fragment>
					<label>Option {props.index + 1}</label>
					<input
						ref={answerInputRef}
						onBlur={onBlurHandler}
						type='text'
					/>
				</Fragment>
			)}
		</Fragment>
	);
};
