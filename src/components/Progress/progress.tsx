import React, {FC} from 'react';
import {ThemeProps} from "../Icon/icon";

export interface ProgressProps {
	percent: number,
	strokeHeight?: number,
	showText?: boolean,
	styles?: React.CSSProperties,
	theme?: ThemeProps
}

const Progress: FC<ProgressProps> = (props) => {
	
	const {
		percent,
		strokeHeight,
		styles,
		theme,
		showText
	} = props
	
	return (
		<div className='doge-progress' style={styles}>
			<div className='doge-progress-outer' style={{height: `${strokeHeight}px`}}>
				<div
					className={`doge-progress-inner color-${theme}`}
					style={{width: `${percent}%`}}>
					{showText && <span className = 'inner-text'>{percent}</span>}
				</div>
			</div>
		</div>
	)
}


Progress.defaultProps = {
	strokeHeight: 15,
	showText: true,
	theme: 'primary'
}

export default Progress;