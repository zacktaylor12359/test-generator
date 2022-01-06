import TestContext from './test-context';

const TestProvider = (props) => {
	const testContext = {};

	return (
		<TestContext.Provider value={testContext}>
			{props.children}
		</TestContext.Provider>
	);
};

export default TestProvider;
