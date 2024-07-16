import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

function Upload() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            alert('Only PDF files are allowed');
            return;
        }
        setFile(selectedFile);
        setFileName(selectedFile.name);
        console.log("File selected:", selectedFile);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'application/pdf',
        multiple: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("File uploaded successfully");
            console.log("File uploaded successfully:", response.data);
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            alert("Error uploading file");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload_screen_main_container p-6">
            <div className="upload_page">
                <div className="grid_container">
                    <div className="flex items-center lg:min-h-screen justify-center flex-wrap gap-16 md:gap-24 lg:gap-32">
                        <div className="logo flex justify-center lg:basis-1/4 basis-full">
                            <img src={Logo} className='lg:max-w-full max-w-72 h-auto' alt='Logo' />
                        </div>
                        <div className="upload_form_container lg:basis-1/2 basis-full">
                            <form onSubmit={handleSubmit}>
                                <div className="upload_form bg-white py-8 px-12 rounded-lg">
                                    <div className="title_container mb-4">
                                        <div className="title flex items-center justify-between">
                                            <h5 className='text-2xl mb-0.5 font-semibold'>Upload a file</h5>
                                            <div>
                                                <p className='text-xs font-normal text-gray-600'>Don't want to upload files?</p>
                                            </div>
                                        </div>
                                        <div className="subtitle flex justify-between items-center">
                                            <div>
                                                <p className='text-xs font-normal text-gray-600'>PDF formats only</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    <Link to="/chat" className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                        AI Search
                                                        <svg className="w-4 h-4 ml-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                        </svg>
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center w-full">
                                        <div {...getRootProps({className: 'dropzone flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'})}>
                                            <input {...getInputProps()} />
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-blue-400 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-bold">Drop your file here</span></p>
                                                <p className="text-xs text-gray-500 font-semibold dark:text-gray-400">or <span className='text-blue-500'>Browse</span> from your computer</p>
                                                {fileName ?
                                                 <p className="mt-2 text-xs text-blue-400 dark:text-gray-400">{fileName}</p>
                                                :
                                                    <p className="mt-2 text-xs text-blue-300 dark:text-gray-400">No file selected</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="upload-btn flex justify-center mt-5">
                                    {uploading ? 
                                    <button type='submit'
                                    className="w-full h-12 px-6 text-white transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline" disabled={uploading}>
                                       Uploading...
                                   </button>
                                   :
                                   <button type='submit'
                                     className="w-full h-12 px-6 text-white transition-colors duration-150 bg-slate-300 rounded-lg focus:shadow-outline focus:bg-blue-700 hover:bg-blue-500" disabled={uploading}>
                                        Upload
                                    </button>
                                    }
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;
