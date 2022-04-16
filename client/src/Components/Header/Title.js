import styles from './Title.module.css';
import { useTestState } from '../../store/sectionState.ts';

const Title = () => {
	const testState = useTestState();

	const titleChangeHandler = (e) => {
		testState.entered_title.set(e.target.value);
	};

	return (
		<div className={styles['control']}>
			<input
				type="text"
				className={styles['title']}
				placeholder="Title"
				value={testState.entered_title.value}
				onChange={titleChangeHandler}
			/>
		</div>
	);
};

export default Title;
