import { Fragment, useRef, useContext } from 'react';
import TestContext from '../../../store/test-context';

const QuestionInput = (props) => {
	const testCtx = useContext(TestContext);
	const questionInputRef = useRef();

	return <Fragment></Fragment>;
};

export default QuestionInput;
