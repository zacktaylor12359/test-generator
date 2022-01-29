import { Fragment, useContext } from 'react';
import { useState } from '@hookstate/core';
import TestContext from '../../../store/test-context';
const AnswerChoices = (props) => {
	let answerOptionsState = useState(props.answerOptions);

	return (
		<Fragment>
			{answerOptionsState.map((element, index) => (
				<div key={element.id.value}>
					{index === 0 ? (
						<Fragment>
							<label>Answer</label>
							<input type='text' />
						</Fragment>
					) : (
						<Fragment>
							<label>Option {index + 1}</label>
							<input type='text' />
						</Fragment>
					)}
				</div>
			))}
		</Fragment>
	);
};

export default AnswerChoices;
