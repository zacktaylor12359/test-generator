import React, { useContext, Fragment } from 'react';
import { useState, none } from '@hookstate/core';

import { useTestState } from '../../store/sectionState.ts';
import styles from './CreateTest.module.css';
import Card from '../UI/Card';
import Header from '../Header/Header';
import Title from '../Header/Title';
import Instructions from '../Header/Instructions';
import Button from '../UI/Button';
import MCQuestion from '../QuestionTypes/multiple_choice/MCQuestion';
import AddSectionModal from '../ModalContent/AddSectionModal';
import TestProvider from '../../store/TestProvider';
import TestContext from '../../store/test-context';

const CreateTest = () => {
	const testCtx = useContext(TestContext);
	const testState = useTestState();

	//Section states
	//const [section, setSection] = useState([]);
	const [sectionModal, setSectionModal] = React.useState(false);

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
	const showSectionModal = () => {
		setSectionModal(true);
	};
	const hideSectionModal = () => {
		setSectionModal(false);
	};
	const removeSection = (section) => {
		section.set(none);
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
			{testState.promised ? (
				<Fragment>
					<p>loading</p>
				</Fragment>
			) : (
				<Fragment>
					{sectionModal && (
						<AddSectionModal
							title='Add New Section'
							message='Placeholder'
							onClose={hideSectionModal}
						/>
					)}
					<form>
						<Card className={styles['test-form']}>
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
							{testState.section.map((element, index) => (
								<div key={element.id.value}>
									{console.log('thing', element.id.value)}
									{element.question_type.value === 'MC' && (
										<MCQuestion
											question_structure={
												element.question_structure
											}
										/>
									)}
									<Button
										type='Button'
										onClick={() => removeSection(element)}
									>
										Remove
									</Button>
								</div>
							))}
							<div className={styles['add-rmv-btn']}>
								<Button
									type='Button'
									onClick={() => showSectionModal()}
								>
									Add New Section
								</Button>
							</div>
						</Card>
					</form>
				</Fragment>
			)}
		</Fragment>
	);
};

export default CreateTest;
