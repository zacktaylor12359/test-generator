import { Fragment } from 'react';
import { useTestState } from '../../store/sectionState.ts';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './Header.module.css';
import Button from '../UI/Button';

const Header = () => {
	const testState = useTestState();

	const alignBtn = () => {
		testState.header_left_alignment.set(() => {
			return !testState.header_left_alignment.get();
		});
	};
	const headerChangeHandler = (e) => {
		testState.entered_header.set(e.target.value);
	};

	return (
		<div
			className={
				testState.header_left_alignment.get() == true
					? `${styles['header-controls']} ${styles['header-left-controls']}`
					: `${styles['header-controls']} ${styles['header-right-controls']}`
			}
		>
			<div className={styles['control']}>
				<TextareaAutosize
					id="header"
					className={styles['header']}
					autoFocus
					minRows={1}
					value={testState.entered_header.get()}
					onChange={headerChangeHandler}
					placeholder="Header"
				/>
			</div>
			<Button
				type="button"
				className={styles['align-btn']}
				onClick={alignBtn}
			>
				Toggle Alignment
			</Button>
			<div className={styles['control']}></div>
		</div>
	);
};

export default Header;
