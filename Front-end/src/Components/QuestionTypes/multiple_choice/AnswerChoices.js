import { Fragment, useContext } from 'react';
import TestContext from '../../../store/test-context';
const AnswerChoices = (props) => {
	const testCtx = useContext(TestContext);
	const answerOptionChangeHandler = (answerOptionIndex, e) => {
		console.log('sectionIndex', props.sectionIndex);
		console.log('questionIndex', props.questionIndex);
		console.log('answerOptionIndex', answerOptionIndex);
		console.log('value', e.target.value);
		testCtx.answerOptionChangeMC(
			props.sectionIndex,
			props.questionIndex,
			answerOptionIndex,
			e.target.value
		);
	};

	return (
		<Fragment>
			{props.answerOptions.map((element, index) => (
				<div key={index}>
					{index === 0 ? (
						<Fragment>
							<label>Answer</label>
							<input
								type="text"
								value={element}
								onChange={(e) =>
									answerOptionChangeHandler(index, e)
								}
							/>
						</Fragment>
					) : (
						<Fragment>
							<label>Option {index + 1}</label>
							<input
								type="text"
								value={element}
								onChange={(e) =>
									answerOptionChangeHandler(index, e)
								}
							/>
						</Fragment>
					)}
				</div>
			))}
		</Fragment>
	);
};

export default AnswerChoices;
