import { Fragment, useState } from 'react';
const AnswerChoices = (props) => {
	console.log(props.numChoices);
	let tempOptionValues = [];
	let tempChoice = props.numChoices;
	for (let i = 0; i < props.numChoices; i++) {
		tempOptionValues.push('');
	}

	const [optionValues, setOptionValues] = useState(tempOptionValues);

	console.log(optionValues);
	return (
		<Fragment>
			{props.answerOptions.map((element, index) => (
				<div key={index}>
					{index === 0 ? (
						<label>Answer</label>
					) : (
						<label>Option {index + 1}</label>
					)}
				</div>
			))}
		</Fragment>
	);
};

export default AnswerChoices;
