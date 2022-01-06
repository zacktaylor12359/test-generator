import CreateTest from './Components/CreateTest/CreateTest';
import MCQuestion from './Components/QuestionTypes/multiple_choice/MCQuestion';
import styles from './App.module.css';
import { Fragment } from 'react';
function App() {
	return (
		// <div className="Title">
		//     <h1>Test Generator</h1>

		//     <button>Create New Test</button>
		//     <button>Upload Test Document</button>
		// </div>

		<Fragment>
			<CreateTest />
		</Fragment>
	);
}

export default App;
