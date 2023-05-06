import React, { useState } from 'react';
import { useHookstate, State } from '@hookstate/core';

interface Node {
	name: string;
	children?: Node[];
}

export const ExampleComponent = () => {
	const [thing, setThing] = useState(false);
	const state = useHookstate<Node[] | undefined>([
		{
			name: 'Node 1',
			children: [{ name: 'Node 1.1' }, { name: 'Node 1.2' }],
		},
		{
			name: 'Node 2',
		},
	]);
	return (
		<>
			<button
				onClick={() => {
					setThing(true);
				}}
			>
				Cunt
			</button>
			{thing && <NodeListEditor />}
		</>
	);
};

function NodeNameEditor(props: { nameState: State<string> }) {
	// scoped state is optional for performance
	// could have used props.nameState everywhere instead
	const state = useHookstate(props.nameState);
	return (
		<>
			<p>
				<input
					value={state.get()}
					onChange={(e) => state.set(e.target.value)}
				/>{' '}
				Last render at: {new Date().toISOString()}
			</p>
		</>
	);
}

function NodeListEditor() {
	// scoped state is optional for performance
	// could have used props.nodes everywhere instead
	//const state = useHookstate(props.nodes);

	let thing: String[][] = [];
	for (let i = 0; i < 5000; i++) {
		for (let j = 0; j < 5; j++) {
			thing[i][j] = 'cunt';
		}
	}
	return (
		<div style={{ paddingLeft: 20 }}>
			{thing.map((element, index) => thing[index].map(() => <input />))}
		</div>
	);
}

function JsonDump(props: { state: State<Node[] | undefined> }) {
	// scoped state is optional for performance
	// could have used props.state everywhere instead
	const state = useHookstate(props.state);
	return (
		<p>
			Current state: {JSON.stringify(state.value)} <br />
			Last render at: {new Date().toISOString()}
		</p>
	);
}
