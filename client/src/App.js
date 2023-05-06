import CreateTest from './Components/CreateTest/CreateTest';
//import { ExampleComponent } from './Components/hookState.tsx';
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

		<CreateTest />
	);
}

export default App;

// import { useRef } from 'react';
// import { loremIpsum } from 'lorem-ipsum';
// import { ViewportList } from 'react-viewport-list';
// import './App.module.css';

// const items = new Array(100000).fill(null).map(() => ({
// 	title: loremIpsum({
// 		units: 'paragraph',
// 		paragraphLowerBound: 1,
// 		paragraphUpperBound: 10,
// 	}),
// }));

// const App = () => {
// 	const ref = useRef(null);

// 	return (
// 		<div className='list' ref={ref}>
// 			<ViewportList viewportRef={ref} items={items}>
// 				{(item, index) => (
// 					<div
// 						key={index}
// 						className={`item${index % 2 === 0 ? '' : ' odd'}`}
// 					>
// 						{`${index + 1} ${item.title}`}
// 					</div>
// 				)}
// 			</ViewportList>
// 		</div>
// 	);
// };

// export default App;

// import { useEffect, useRef, useState } from 'react';
// import { ViewportList } from 'react-viewport-list';
// import './styles.css';

// export default function App() {
// 	return (
// 		<div className='App'>
// 			<VirtualList />
// 		</div>
// 	);
// }

// const items = [
// 	{ id: 1, firstName: 'John', surname: 'Smith' },
// 	{ id: 2, firstName: 'Another', surname: 'Person' },
// 	{ id: 3, firstName: 'Third', surname: 'Person' },
// 	{ id: 4, firstName: 'John', surname: 'Smith' },
// 	{ id: 5, firstName: 'Another', surname: 'Person' },
// 	{ id: 6, firstName: 'Third', surname: 'Person' },
// 	{ id: 7, firstName: 'John', surname: 'Smith' },
// 	{ id: 8, firstName: 'Another', surname: 'Person' },
// 	{ id: 9, firstName: 'Third', surname: 'Person' },
// 	{ id: 10, firstName: 'John', surname: 'Smith' },
// 	{ id: 11, firstName: 'Another ', surname: 'Person' },
// 	{ id: 12, firstName: 'Third', surname: 'Person' },
// 	{ id: 13, firstName: 'Another', surname: 'Person' },
// 	{ id: 14, firstName: 'Third', surname: 'Person' },
// 	{ id: 15, firstName: 'John', surname: 'Smith' },
// 	{ id: 16, firstName: 'Another ', surname: 'Person' },
// 	{ id: 17, firstName: 'Third', surname: 'Person' },
// 	{ id: 18, firstName: 'Third', surname: 'Person' },
// 	{ id: 19, firstName: 'John', surname: 'Smith' },
// 	{ id: 20, firstName: 'Another ', surname: 'Person' },
// 	{ id: 21, firstName: 'Third', surname: 'Person' },
// 	{ id: 22, firstName: 'Third', surname: 'Person' },
// 	{ id: 23, firstName: 'Third', surname: 'Person' },
// 	{ id: 24, firstName: 'John', surname: 'Smith' },
// 	{ id: 25, firstName: 'Another ', surname: 'Person' },
// 	{ id: 26, firstName: 'Third', surname: 'Person' },
// ];

// function VirtualList() {
// 	const [loadedItems, setItems] = useState([]);
// 	const ref = useRef(null);

// 	//simulate api call
// 	useEffect(() => {
// 		const id = setTimeout(() => {
// 			setItems(items);
// 		}, 2000);
// 		return () => clearTimeout(id);
// 	}, []);

// 	return (
// 		<div className='scroll-container' ref={ref}>
// 			<ViewportList
// 				getItemBoundingClientRect={(elm) =>
// 					elm.firstChild?.getBoundingClientRect()
// 				}
// 				overflowAnchor='none'
// 				renderSpacer={(props) => (
// 					<div
// 						{...props}
// 						style={{ ...props.style, gridColumn: '1 / -1' }}
// 					/>
// 				)}
// 				scrollThreshold={2000}
// 				items={loadedItems}
// 			>
// 				{(item) => (
// 					<div key={item.id} className='item'>
// 						<div className='cell'>{item.firstName}</div>
// 						<div className='cell'>{item.surname}</div>
// 					</div>
// 				)}
// 			</ViewportList>
// 		</div>
// 	);
// }
