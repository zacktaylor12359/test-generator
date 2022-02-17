import { Fragment } from 'react';
import { useTestState } from '../../store/sectionState.ts';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './Header.module.css';
import Button from '../UI/Button';

const Header = () => {
	const testState = useTestState();

	const alignRightBtn = () => {
		testState.header_left_alignment.set(false);
	};
	const alignLeftBtn = () => {
		testState.header_left_alignment.set(true);
	};
	const headerChangeHandler = (e) => {
		testState.entered_header.set(e.target.value);
	};

	return (
		<Fragment>
			{testState.header_left_alignment.get() ? (
				<Fragment>
					<div className={styles['control']}>
						<TextareaAutosize
							id='header'
							className={`${styles['header']} ${styles['header-left']}`}
							autoFocus
							minRows={1}
							value={testState.entered_header.get()}
							onChange={headerChangeHandler}
							placeholder='Header'
						/>
					</div>
					<div className={styles['btn-container']}>
						<Button
							type='button'
							className={styles['align-btn']}
							onClick={alignRightBtn}
						>
							Align Header Right
						</Button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<div className={`${styles['control']}`}>
						<TextareaAutosize
							id='header'
							className={`${styles['header']} ${styles['header-right']}`}
							autoFocus
							minRows={1}
							placeholder='Header'
							value={testState.entered_header.get()}
							onChange={headerChangeHandler}
						/>
					</div>
					<div className={styles['btn-container']}>
						<Button
							type='button'
							className={styles['align-btn']}
							onClick={alignLeftBtn}
						>
							Align Header Left
						</Button>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Header;
