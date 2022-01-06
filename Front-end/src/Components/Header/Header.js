import styles from './Header.module.css';
import { useState, Fragment } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '../UI/Button';

const Header = () => {
	const [alignLeft, setAlignLeft] = useState(true);
	const [enteredHeader, setEnteredHeader] = useState('');

	const alignRightBtn = () => {
		setAlignLeft(false);
	};
	const alignLeftBtn = () => {
		setAlignLeft(true);
	};
	const headerChangeHandler = (e) => {
		setEnteredHeader(e.target.value);
	};

	return (
		<Fragment>
			{alignLeft ? (
				<Fragment>
					<div className={styles['control']}>
						<TextareaAutosize
							id='header'
							className={`${styles['header']} ${styles['header-left']}`}
							autoFocus
							minRows={1}
							value={enteredHeader}
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
							value={enteredHeader}
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
