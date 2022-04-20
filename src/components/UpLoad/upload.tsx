import React, {ChangeEvent, FC, useRef} from 'react';
import axios from "axios";
import Button from "../Button/button";

export interface UploadProps {
	action: string
	onProgress?: (percentage: number, file: File) => void
	onSuccess?: (data: any, file: File) => void
	onError?: (err: any, file: File) => void
}

const Upload:FC<UploadProps> = (props) => {
	
	const {
		action,
		onError,
		onProgress,
		onSuccess,
	} = props
	
	const fileInput = useRef<HTMLInputElement>(null)
	
	const handleClick = () => {
		if(fileInput.current) {
			fileInput.current.click()
		}
	}
	
	const uploadFiles = (files: FileList) => {
		let postFiles = Array.from(files)
		postFiles.forEach(file => {
			const formData = new FormData()
			formData.append(file.name, file)
			axios.post(action, formData, {
				headers: {
					'Content-Type' : 'multipart/form-data'
				},
				onUploadProgress: (e) => {
					let percentage = Math.round((e.loaded * 100)/ e.total) || 0
					if(percentage < 100) {
						if(onProgress) {
							onProgress(percentage, file)
						}
					}
				}
			}).then(resp => {
				console.log(resp)
				if(onSuccess) {
					onSuccess(resp, file)
				}
			}).catch(err => {
				console.log(err)
				if(onError) {
					onError(err, file)
				}
			})
		})
	}
	
	const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if(!files) {
			return
		}
		uploadFiles(files)
		if(fileInput.current) {
			fileInput.current.value = ''
		}
	}
	
	return (
		<div className='doge-uploaded-wrapper'>
			<Button
				btnType='primary'
				onClick={handleClick}
			>uploaded</Button>
			
			<input
				className='doge-upload-input'
				style={{display: "none"}}
				ref={fileInput}
				onChange={handleFileChange}
				type="file"
			/>
		</div>
	)
}

export default Upload;