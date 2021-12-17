import styles from './Title.module.css';
import { useState, Fragment } from 'react';

const Title = () => {
	const [enteredTitle, setEnteredTitle] = useState('');

	const titleChangeHandler = (e) => {
		setEnteredTitle(e.target.value);
	};

	return (
		<div className={styles['control']}>
			<input
				type='text'
				placeholder='Title'
				value={enteredTitle}
				onChange={titleChangeHandler}
			/>
		</div>
	);
};

export default Title;
