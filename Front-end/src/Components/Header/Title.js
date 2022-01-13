import styles from './Title.module.css';
import { useContext } from 'react';
import TestContext from '../../store/test-context';

const Title = () => {
	const testCtx = useContext(TestContext);

	const titleChangeHandler = (e) => {
		testCtx.titleChange(e);
	};

	return (
		<div className={styles['control']}>
			<input
				type='text'
				placeholder='Title'
				value={testCtx.entered_title}
				onChange={titleChangeHandler}
			/>
		</div>
	);
};

export default Title;
