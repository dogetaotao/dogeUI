import React, {FC, useState, DragEvent} from 'react';
import classnames from "classnames";


interface DraggerProps {
	onFile: (file: FileList) => void,
}

const Dragger: FC<DraggerProps> = (props) => {
	const {onFile, children} = props
	const [dragOver, setDragOver] = useState(false)
	const className = classnames('doge-upload-dragger', {
		'is-dragover': dragOver
	})
	
	const handleDrop = (e: DragEvent<HTMLElement>) => {
		e.preventDefault()
		setDragOver(false)
		onFile(e.dataTransfer.files)
	}
	
	const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
		e.preventDefault()
		setDragOver(over)
	}
	
	return (
		<div
			className={className}
			onDragOver={e => {
				handleDrag(e, true)
			}}
			onDragLeave={e => {
				handleDrag(e, false)
			}}
			onDrop={handleDrop}
		>
			{children}
		</div>
	)
}

export default Dragger;