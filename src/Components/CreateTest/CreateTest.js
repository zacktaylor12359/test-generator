import { useState, Fragment } from 'react';
import styles from './CreateTest.module.css';
import Card from '../UI/Card';
import Header from '../Header/Header';
import Title from '../Header/Title';
import Instructions from '../Header/Instructions';
import TextareaAutosize from 'react-textarea-autosize';

const CreateTest = () => {
	//Header states
	const [header, setHeader] = useState(false);

	//Title states
	const [title, setTitle] = useState(false);

	//Instruction states
	const [instructions, setInstructions] = useState(false);

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

	return (
		<form>
			<Card className={styles['test-form']}>
				{/*-----------Header UI--------------*/}
				{header ? (
					<Fragment>
						<Header />
						<div className={styles['add-rmv-btn']}>
							<button
								type='button'
								onClick={() => removeHeader()}
							>
								Remove Header
							</button>
						</div>
					</Fragment>
				) : (
					<div className={styles['add-rmv-btn']}>
						<button type='button' onClick={() => addHeader()}>
							Add Header
						</button>
					</div>
				)}

				{/*-----------Title UI--------------*/}

				{title ? (
					<Fragment>
						<Title />
						<div className={styles['add-rmv-btn']}>
							<button type='button' onClick={() => removeTitle()}>
								Remove Title
							</button>
						</div>
					</Fragment>
				) : (
					<div class={styles['add-rmv-btn']}>
						<button type='button' onClick={() => addTitle()}>
							Add Title
						</button>
					</div>
				)}

				{/*-----------Instructions UI--------------*/}
				{instructions ? (
					<Fragment>
						<Instructions />
						<div className={styles['add-rmv-btn']}>
							<button
								type='button'
								onClick={() => removeInstructions()}
							>
								Remove Instructions
							</button>
						</div>
					</Fragment>
				) : (
					<div class={styles['add-rmv-btn']}>
						<button type='button' onClick={() => addInstructions()}>
							Add Instructions
						</button>
					</div>
				)}
			</Card>
		</form>
	);
};

export default CreateTest;
