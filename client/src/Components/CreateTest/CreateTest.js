import React, {
	useState,
	useCallback,
	Fragment,
	useRef,
	useEffect,
} from 'react';
import { useHookstate } from '@hookstate/core';

import { useTestState } from '../../store/sectionState.ts';
import styles from './CreateTest.module.css';
import Card from '../UI/Card';
import Header from '../Header/Header';
import Title from '../Header/Title';
import Instructions from '../Header/Instructions';
import Button, { SubmitButton } from '../UI/Button';
import MCQuestion from '../QuestionTypes/multiple_choice/MCQuestion';
import AddSectionModal from '../ModalContent/AddSectionModal';
import RemoveSectionModal from '../ModalContent/RemoveSectionModal';
import GenerateTestModal from '../ModalContent/GenerateTestModal';
import { ViewportList } from 'react-viewport-list';

const CreateTest = () => {
	const testState = useTestState();

	//Section states
	//const [section, setSection] = useState([]);
	const [addSectionModal, setAddSectionModal] = useState(false);
	const [removeSectionModal, setRemoveSectionModal] = useState(false);
	const [editSectionIndex, setEditSectionIndex] = useState(-1);
	const [generateTestModal, setGenerateTestModal] = useState(false);

	useEffect(() => {
		console.log('cunt');
		window.scrollTo(0, 0);
	}, []);

	//Header functions
	const removeHeader = () => {
		testState.header.set(false);
	};
	const addHeader = () => {
		testState.header.set(true);
	};

	//Title functions
	const removeTitle = () => {
		testState.title.set(false);
	};
	const addTitle = () => {
		testState.title.set(true);
	};

	//Instruction functions
	const removeInstructions = () => {
		testState.instructions.set(false);
	};
	const addInstructions = () => {
		testState.instructions.set(true);
	};

	//Section functions
	const showAddSectionModal = (sectionIndex) => {
		setEditSectionIndex(sectionIndex);
		setAddSectionModal(true);
	};
	const hideAddSectionModal = () => {
		setEditSectionIndex(-1);
		setAddSectionModal(false);
	};
	const showRemoveSectionModal = useCallback((sectionIndex) => {
		setEditSectionIndex(sectionIndex);
		setRemoveSectionModal(true);
	}, []);

	const hideRemoveSectionModal = () => {
		setEditSectionIndex(-1);
		setRemoveSectionModal(false);
	};

	const showGenerateTestModal = () => {
		setGenerateTestModal(true);
	};

	const hideGenerateTestModal = () => {
		setGenerateTestModal(false);
	};
	//Submit function
	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	alert(JSON.stringify(question));
	// 	setNumOptions(3);
	// 	setCompKey(compKey + 1);
	// };
	return (
		<Fragment>
			<JsonDump state={testState} />
			{addSectionModal && (
				<AddSectionModal
					index={editSectionIndex}
					title='Add New Section'
					onClose={hideAddSectionModal}
				/>
			)}
			{removeSectionModal && (
				<RemoveSectionModal
					index={editSectionIndex}
					title='Remove Section'
					onClose={hideRemoveSectionModal}
				/>
			)}
			{generateTestModal && (
				<GenerateTestModal
					title='Generate Test'
					onClose={hideGenerateTestModal}
				/>
			)}

			<div className={styles['container']}>
				<Card className={styles['test-form']}>
					<form>
						{/*-----------Header UI--------------*/}
						{testState.header.get() ? (
							<Fragment>
								<Header />
								<div className={styles['add-rmv-btn']}>
									<Button
										type='Button'
										onClick={() => removeHeader()}
									>
										Remove Header
									</Button>
								</div>
							</Fragment>
						) : (
							<div className={styles['add-rmv-btn']}>
								<Button
									type='Button'
									onClick={() => addHeader()}
								>
									Add Header
								</Button>
							</div>
						)}

						{/*-----------Title UI--------------*/}

						{testState.title.get() ? (
							<Fragment>
								<Title />
								<div className={styles['add-rmv-btn']}>
									<Button
										type='Button'
										onClick={() => removeTitle()}
									>
										Remove Title
									</Button>
								</div>
							</Fragment>
						) : (
							<div className={styles['add-rmv-btn']}>
								<Button
									type='Button'
									onClick={() => addTitle()}
								>
									Add Title
								</Button>
							</div>
						)}

						{/*-----------Instructions UI--------------*/}
						{testState.instructions.get() ? (
							<Fragment>
								<Instructions />
								<div className={styles['add-rmv-btn']}>
									<Button
										type='Button'
										onClick={() => removeInstructions()}
									>
										Remove Instructions
									</Button>
								</div>
							</Fragment>
						) : (
							<div className={styles['add-rmv-btn']}>
								<Button
									type='Button'
									onClick={() => addInstructions()}
								>
									Add Instructions
								</Button>
							</div>
						)}

						{/*-----------New Section UI--------------*/}
						<SectionList
							testContent={testState.section}
							showRemoveSectionModal={showRemoveSectionModal}
						/>
						<div className={styles['add-rmv-btn']}>
							<Button
								type='Button'
								onClick={() =>
									showAddSectionModal(
										testState.section.length
									)
								}
							>
								Add New Section
							</Button>
						</div>

						{/*-----------Submit Test--------------*/}
						<div className={styles['generate-test-btn']}>
							<SubmitButton
								type='Button'
								onClick={showGenerateTestModal}
							>
								Generate Test
							</SubmitButton>
						</div>
					</form>
				</Card>
			</div>
		</Fragment>
	);
};

export default CreateTest;

const SectionList = (props) => {
	const testContent = useHookstate(props.testContent);
	const viewport_ref = useRef(null);

	// return (
	// 	<React.Fragment>
	// 		<div ref={viewport_ref}>
	// 			<ViewportList viewportRef={viewport_ref} items={testContent}>
	// 				{(item, index) => (
	// 					<div key={item.id.value}>
	// 						<p>Last render at: {new Date().toISOString()}</p>

	// 						<div>
	// 							{item.question_type.value === 'MC' && (
	// 								<MCQuestion
	// 									question_structure={
	// 										item.question_structure
	// 									}
	// 								/>
	// 							)}
	// 						</div>
	// 						<Button
	// 							type='Button'
	// 							onClick={() =>
	// 								props.showRemoveSectionModal(index)
	// 							}
	// 						>
	// 							Remove Section
	// 						</Button>
	// 					</div>
	// 				)}
	// 			</ViewportList>
	// 		</div>

	// 		<button
	// 			onClick={() => {
	// 				window.scrollTo(0, 0);
	// 			}}
	// 		>
	// 			cunt
	// 		</button>
	// 	</React.Fragment>
	// );

	return testContent.map((element, index) => (
		<div key={element.id.value}>
			<p>Last render at: {new Date().toISOString()}</p>

			<div>
				{element.question_type.value === 'MC' && (
					<MCQuestion
						question_structure={element.question_structure}
					/>
				)}
			</div>
			<Button
				type='Button'
				onClick={() => props.showRemoveSectionModal(index)}
			>
				Remove Section
			</Button>
		</div>
	));
};

const JsonDump = (props) => {
	// const state = useHookstate(props.state);
	// Current state: {JSON.stringify(state.value)} <br />
	//return <p>Last render at: {new Date().toISOString()}</p>;
};
