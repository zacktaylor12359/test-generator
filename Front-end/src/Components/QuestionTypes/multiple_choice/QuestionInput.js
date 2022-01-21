import { Fragment, useRef, useContext } from 'react';
import TestContext from '../../../store/test-context';

const QuestionInput = (props) => {
	const testCtx = useContext(TestContext);
	const questionInputRef = useRef();

	return (
		<Fragment>
			<label>Question {props.questionIndex + 1}</label>
			<textarea type='text' name='question' ref={questionInputRef} />
		</Fragment>
	);
};

export default QuestionInput;
