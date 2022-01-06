import { useState, Fragment } from 'react';
import styles from './CreateTest.module.css';
import Card from '../UI/Card';
import Header from '../Header/Header';
import Title from '../Header/Title';
import Instructions from '../Header/Instructions';
import Button from '../UI/Button';
import MCQuestion from '../QuestionTypes/multiple_choice/MCQuestion';
import SectionModal from '../UI/SectionModal';

const CreateTest = () => {
	//Header states
	const [header, setHeader] = useState(false);

	//Title states
	const [title, setTitle] = useState(false);

	//Instruction states
	const [instructions, setInstructions] = useState(false);

	//Section states
	const [section, setSection] = useState([]);
	const [sectionModal, setSectionModal] = useState(false);

	//Header functions
	const removeHeader = () => {
		setHeader(false);
	};
	const addHeader = () => {
		setHeader(true);
	};

	//Title functions
	const removeTitle = () => {
		setTitle(false);
	};
	const addTitle = () => {
		setTitle(true);
	};

	//Instruction functions
	const removeInstructions = () => {
		setInstructions(false);
	};
	const addInstructions = () => {
		setInstructions(true);
	};

	//Section functions
	const removeSection = (index) => {
		let newFormValues = [...section];
		newFormValues.splice(index, 1);
		setSection(newFormValues);
	};
	const addSection = () => {
		setSection([...section, {}]);
	};
	const showSectionModal = () => {
		setSectionModal(true);
	};
	const hideSectionModal = () => {
		setSectionModal(false);
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
			{sectionModal && (
				<SectionModal
					title='Add New Section'
					message='Placeholder'
					onClose={hideSectionModal}
				/>
			)}
			<form>
				<Card className={styles['test-form']}>
					{/*-----------Header UI--------------*/}
					{header ? (
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
							<Button type='Button' onClick={() => addHeader()}>
								Add Header
							</Button>
						</div>
					)}

					{/*-----------Title UI--------------*/}

					{title ? (
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
							<Button type='Button' onClick={() => addTitle()}>
								Add Title
							</Button>
						</div>
					)}

					{/*-----------Instructions UI--------------*/}
					{instructions ? (
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
					{section.map((element, index) => (
						<div key={index}>
							<MCQuestion />
							<Button
								type='Button'
								onClick={() => removeSection(index)}
							>
								Remove Section
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
	);
};

export default CreateTest;
