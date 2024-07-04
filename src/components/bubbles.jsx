import React, { useState } from 'react';
import user from '../assets/icons/user.png';
import bot from '../assets/icons/bot.png';
import copy from '../assets/icons/copy.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Prompt from './prompt'
import Navbar from './Nav'
function Bubbles() {
    const [textToCopy, setTextToCopy] = useState(''); // Set initial text
    const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied

    const onCopyText = () => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
    };

    return (
        <>
        <Navbar />
        <div className="relative min-h-screen flex flex-col">
        <div className="flex-grow main sm:ml-64 xs:mt-16 mb-24 pb-12">
          <div className="chat_container m-8">
            <div className="chat_bubbles">
                {/* User */}
                <div className="flex items-start gap-2.5 mb-6">
                    <img className="w-7 h-7 rounded-full" src={user} alt="user image" />
                    <div className="flex flex-col w-full max-w-full leading-1.5 p-4 border-gray-200 bg-white rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">...</span>
                            {/* <button><img src={copy} alt="copy icon" /></button> */}
                            <CopyToClipboard text={textToCopy} onCopy={onCopyText}>
                                {copyStatus ? <p>Copied!</p> : <button><img src={copy} alt="copy icon" /></button>}
                            </CopyToClipboard>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                            What is the patient history of John Doe?
                        </p>
                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">11:46</span>
                        </div>
                    </div>
                </div>
                {/* Bot */}
                <div className="flex items-start gap-2.5 mb-6">
                    <img className="w-7 h-7 rounded-full" src={bot} alt="bot image" />
                    <div className="flex flex-col w-full max-w-full leading-1.5 p-4 border-gray-200 bg-white rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">...</span>
                            <button><img src={copy} alt="copy icon" /></button>
                            {/* <CopyToClipboard text={textToCopy} onCopy={onCopyText}>
                                {copyStatus ? <p>Copied!</p> : <button><img src={copy} alt="copy icon" /></button>}
                            </CopyToClipboard> */}
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                            John Doe (Patient ID: P001) has a medical history that includes an appendectomy in 2010. He has had no hospitalizations in the last five years
                        </p>
                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">11:46</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        <Prompt />
        </div>
        </>
    );
}

export default Bubbles;
