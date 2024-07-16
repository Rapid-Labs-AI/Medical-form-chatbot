import React, { useState } from 'react';
import user from '../assets/icons/user.png';
import bot from '../assets/icons/bot.png';
import copy from '../assets/icons/copy.svg';
import ReactMarkdown from 'react-markdown';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Prompt from './prompt';
import Navbar from './Nav';
import convo from '../assets/convo.svg';

function Bubbles() {
    const [copyStatus, setCopyStatus] = useState([]); // To indicate if the text was copied
    const [messages, setMessages] = useState([]); // To store chat messages
    const [loading, setLoading] = useState(false); // To indicate if waiting for response
    const [pdfPath, setPdfPath] = useState('');

    const onCopyText = (index) => {
        const newCopyStatus = [...copyStatus];
        newCopyStatus[index] = true;
        setCopyStatus(newCopyStatus);
        setTimeout(() => {
            const resetCopyStatus = [...copyStatus];
            resetCopyStatus[index] = false;
            setCopyStatus(resetCopyStatus);
        }, 2000); // Reset status after 2 seconds
    };

    const handlePromptSubmit = async (prompt) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages([...messages, { type: 'user', text: prompt, time: timestamp }]);
        setLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/chat?query=${encodeURIComponent(prompt)}`);
            const data = await response.json();
            // console.log(data);
            if (data.response) {
                setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: data.response, time: timestamp }]);
                setPdfPath(data.pdf_path);
            } else {
                setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: 'Error: Unable to fetch response', time: timestamp }]);
            }
        } catch (error) {
            setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: 'Error: Unable to fetch response', time: timestamp }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar pdf_path={pdfPath} />
            <div className="relative min-h-screen flex flex-col">
                <div className="flex-grow main sm:ml-64 xs:mt-16 mb-24 pb-12">
                    <div className="chat_container m-8">
                        {messages.length === 0 && !loading && (
                            <div className="flex justify-center items-center">
                                <img src={convo} alt="" className='h-auto max-w-full' />
                            </div>
                        )}
                        <div className="chat_bubbles">
                            {messages.map((message, index) => (
                                <div className="flex items-start gap-2.5 mb-6" key={index}>
                                    <img className="w-7 h-7 rounded-full" src={message.type === 'user' ? user : bot} alt={message.type} />
                                    <div className="flex flex-col w-full max-w-full leading-1.5 p-4 border-gray-200 bg-white rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                                            <span className="text-lg font-semibold text-gray-900 dark:text-white">...</span>
                                            <CopyToClipboard text={message.text} onCopy={() => onCopyText(index)}>
                                                {copyStatus[index] ? <p>Copied!</p> : <button><img src={copy} alt="copy icon" /></button>}
                                            </CopyToClipboard>
                                        </div>
                                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                                            {message.type === 'bot' ? (
                                                <ReactMarkdown>{message.text}</ReactMarkdown>
                                            ) : (
                                                <p>{message.text}</p>
                                            )}
                                        </p>
                                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                                            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">{message.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex items-start gap-2.5 mb-6">
                                    <img className="w-7 h-7 rounded-full" src={bot} alt="bot" />
                                    <div className="flex flex-col w-full max-w-full leading-1.5 p-4 border-gray-200 bg-white rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                                            <span className="text-lg font-semibold text-gray-900 dark:text-white">...</span>
                                        </div>
                                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white"><i>Waiting for response...</i></p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Prompt onSubmit={handlePromptSubmit} loading={loading} />
            </div>
        </>
    );
}

export default Bubbles;
