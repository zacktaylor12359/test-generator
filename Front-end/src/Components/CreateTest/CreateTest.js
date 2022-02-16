import React, { useContext, Fragment } from 'react';
import { useState, none } from '@hookstate/core';
import { FixedSizeList as List } from 'react-window';

import { useTestState } from '../../store/sectionState.ts';
import styles from './CreateTest.module.css';
import Card from '../UI/Card';
import Header from '../Header/Header';
import Title from '../Header/Title';
import Instructions from '../Header/Instructions';
import Button from '../UI/Button';
import MCQuestion from '../QuestionTypes/multiple_choice/MCQuestion';
import AddSectionModal from '../ModalContent/AddSectionModal';
import RemoveSectionModal from '../ModalContent/RemoveSectionModal';

const CreateTest = () => {
	const testState = useTestState();

	//Section states
	//const [section, setSection] = useState([]);
	const [addSectionModal, setAddSectionModal] = React.useState(false);
	const [removeSectionModal, setRemoveSectionModal] = React.useState(false);
	const [editSectionIndex, setEditSectionIndex] = React.useState(-1);

	const sectionList = testState.promised
		? null
		: testState.section.map((element, index) => {
				return (
					<div key={element.id.value}>
						{element.question_type.value === 'MC' && (
							<MCQuestion
								question_structure={element.question_structure}
							/>
						)}
						<Button
							type="Button"
							onClick={() => showRemoveSectionModal(index)}
						>
							Remove Section
						</Button>
					</div>
				);
		  });

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
	const showRemoveSectionModal = (sectionIndex) => {
		setEditSectionIndex(sectionIndex);
		setRemoveSectionModal(true);
	};
	const hideRemoveSectionModal = () => {
		setEditSectionIndex(-1);
		setRemoveSectionModal(false);
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
					{addSectionModal && (
						<AddSectionModal
							index={editSectionIndex}
							title="Add New Section"
							onClose={hideAddSectionModal}
						/>
					)}
					{removeSectionModal && (
						<RemoveSectionModal
							index={editSectionIndex}
							title="Remove Section"
							onClose={hideRemoveSectionModal}
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
											type="Button"
											onClick={() => removeHeader()}
										>
											Remove Header
										</Button>
									</div>
								</Fragment>
							) : (
								<div className={styles['add-rmv-btn']}>
									<Button
										type="Button"
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
											type="Button"
											onClick={() => removeTitle()}
										>
											Remove Title
										</Button>
									</div>
								</Fragment>
							) : (
								<div className={styles['add-rmv-btn']}>
									<Button
										type="Button"
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
											type="Button"
											onClick={() => removeInstructions()}
										>
											Remove Instructions
										</Button>
									</div>
								</Fragment>
							) : (
								<div className={styles['add-rmv-btn']}>
									<Button
										type="Button"
										onClick={() => addInstructions()}
									>
										Add Instructions
									</Button>
								</div>
							)}

							{/*-----------New Section UI--------------*/}

							{sectionList}
							<div className={styles['add-rmv-btn']}>
								<Button
									type="Button"
									onClick={() =>
										showAddSectionModal(
											testState.section.length
										)
									}
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
