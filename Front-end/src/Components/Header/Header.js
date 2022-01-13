import { useContext, Fragment } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './Header.module.css';
import Button from '../UI/Button';
import TestContext from '../../store/test-context';

const Header = () => {
	const testCtx = useContext(TestContext);

	const alignRightBtn = () => {
		testCtx.alignRightBtn();
	};
	const alignLeftBtn = () => {
		testCtx.alignLeftBtn();
	};
	const headerChangeHandler = (e) => {
		testCtx.headerChange(e);
	};

	return (
		<Fragment>
			{testCtx.header_left_alignment ? (
				<Fragment>
					<div className={styles['control']}>
						<TextareaAutosize
							id='header'
							className={`${styles['header']} ${styles['header-left']}`}
							autoFocus
							minRows={1}
							value={testCtx.entered_header}
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
							value={testCtx.entered_header}
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
