import React, {ChangeEvent, FC, useRef, useState} from 'react';
import axios from "axios";
import Dragger from "./dragger";
import UploadList from "./uploadList";

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
	uid: string,
	size: number,
	status?: UploadFileStatus,
	percent?: number,
	raw?: File,
	response?: any,
	error?: any,
	name?: string,
}


export interface UploadProps {
	action: string,
	beforeUpload?: (file: File) => boolean | Promise<File>
	onProgress?: (percentage: number, file: UploadFile) => void,
	onSuccess?: (data: any, file: UploadFile) => void,
	onError?: (err: any, file: UploadFile) => void,
	onChange?: (file: UploadFile) => void,
	defaultFileList?: UploadFile[],
	onRemove?: (file: UploadFile) => void,
	headers?: { [key: string]: any },
	data?: { [key: string]: any }
	name?: string,
	withCredentials?: boolean,
	accept?: string,
	multiple?: boolean,
	drag?: boolean
}

const Upload: FC<UploadProps> = (props) => {
	
	const {
		action,
		onError,
		onProgress,
		onSuccess,
		beforeUpload,
		onChange,
		defaultFileList,
		onRemove,
		name,
		data,
		withCredentials,
		headers,
		accept,
		multiple,
		drag,
		children
	} = props
	
	
	const fileInput = useRef<HTMLInputElement>(null)
	const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
	
	const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
		setFileList(prevList => {
			return prevList.map(file => {
				if (file.uid === updateFile.uid) {
					return {...file, ...updateObj}
				} else {
					return file
				}
			})
		})
	}
	
	const handleClick = () => {
		if (fileInput.current) {
			fileInput.current.click()
		}
	}
	
	const post = (file: File) => {
		let _file: UploadFile = {
			uid: Date.now() + 'upload-file',
			status: 'ready',
			name: file.name,
			size: file.size,
			percent: 0,
			raw: file
		}
		
		setFileList(prevList => {
			return [_file, ...prevList]
		})
		
		const formData = new FormData()
		formData.append(name || 'file', file)
		if (data) {
			Object.keys(data).forEach(key => {
				formData.append(key, data[key])
			})
		}
		axios.post(action, formData, {
			headers: {
				...headers,
				'Content-Type': 'multipart/form-data'
			},
			withCredentials,
			onUploadProgress: (e) => {
				let percentage = Math.round((e.loaded * 100) / e.total) || 0
				console.log(percentage)
				if (percentage < 100) {
					updateFileList(_file, {percent: percentage, status: 'uploading'})
					if (onProgress) {
						console.log(percentage)
						onProgress(percentage, _file)
					}
				}
			}
		}).then(resp => {
			console.log(resp)
			updateFileList(_file, {status: 'success', response: resp.data})
			if (onSuccess) {
				onSuccess(resp, _file)
			}
			if (onChange) {
				onChange(_file)
			}
		}).catch(err => {
			console.log(err)
			updateFileList(_file, {status: 'error', error: err})
			if (onError) {
				onError(err, _file)
			}
			if (onChange) {
				onChange(_file)
			}
		})
	}
	
	const uploadFiles = (files: FileList) => {
		let postFiles = Array.from(files)
		postFiles.forEach(file => {
			if (!beforeUpload) {
				post(file)
			} else {
				const result = beforeUpload(file)
				if (result && result instanceof Promise) {
					result.then(processFile => {
						post(processFile)
					})
				} else if (result) {
					post(file)
				}
			}
		})
	}
	
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files) {
			return
		}
		uploadFiles(files)
		if (fileInput.current) {
			fileInput.current.value = ''
		}
	}
	
	const handleRemove = (file: UploadFile) => {
		setFileList((prevList) => {
			return prevList.filter(item => item.uid !== file.uid)
		})
		if (onRemove) {
			onRemove(file)
		}
	}
	
	return (
		<div className='doge-upload-wrapper'>
			<div
				className='doge-upload-div'
				style={{display: 'inline-block'}}
				onClick={handleClick}
			>
				{drag ?
					<Dragger onFile={(files) => {uploadFiles(files)}}>
						{children}
					</Dragger>
					: children
				}
				
				<input
					className='doge-upload-input'
					style={{display: "none"}}
					ref={fileInput}
					onChange={handleFileChange}
					type="file"
					accept={accept}
					multiple={multiple}
				/>
			</div>
			<UploadList
				fileList={fileList}
				onRemove={handleRemove}
			/>
		</div>
	)
}

Upload.defaultProps = {
	name: 'file'
}

export default Upload;