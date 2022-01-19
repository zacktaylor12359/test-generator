import { useState, useContext, Fragment } from 'react';
import styles from './CreateTest.module.css';
import Card from '../UI/Card';
import Header from '../Header/Header';
import Title from '../Header/Title';
import Instructions from '../Header/Instructions';
import Button from '../UI/Button';
import MCQuestion from '../QuestionTypes/multiple_choice/MCQuestion';
import SectionModal from '../ModalContent/AddSectionModal';
import TestProvider from '../../store/TestProvider';
import TestContext from '../../store/test-context';

const CreateTest = () => {
	const testCtx = useContext(TestContext);

	//Section states
	const [section, setSection] = useState([]);
	const [sectionModal, setSectionModal] = useState(false);

	//Header functions
	const removeHeader = () => {
		testCtx.removeHeader();
	};
	const addHeader = () => {
		testCtx.addHeader();
	};

	//Title functions
	const removeTitle = () => {
		testCtx.removeTitle();
	};
	const addTitle = () => {
		testCtx.addTitle();
	};

	//Instruction functions
	const removeInstructions = () => {
		testCtx.removeInstructions();
	};
	const addInstructions = () => {
		testCtx.addInstructions();
	};

	//Section functions
	const removeSection = (index) => {
		testCtx.removeSection(index);
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
					title="Add New Section"
					message="Placeholder"
					onClose={hideSectionModal}
				/>
			)}
			<form>
				<Card className={styles['test-form']}>
					{/*-----------Header UI--------------*/}
					{testCtx.header ? (
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
							<Button type="Button" onClick={() => addHeader()}>
								Add Header
							</Button>
						</div>
					)}

					{/*-----------Title UI--------------*/}

					{testCtx.title ? (
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
							<Button type="Button" onClick={() => addTitle()}>
								Add Title
							</Button>
						</div>
					)}

					{/*-----------Instructions UI--------------*/}
					{testCtx.instructions ? (
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
					{testCtx.section.map((element, index) => (
						<div key={index}>
							{element.section_type === 1 && (
								<MCQuestion section={element} />
							)}
							<Button
								type="Button"
								onClick={() => removeSection(index)}
							>
								Remove Section
							</Button>
						</div>
					))}
					<div className={styles['add-rmv-btn']}>
						<Button
							type="Button"
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
