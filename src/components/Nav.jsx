import { useEffect } from 'react';
import React from "react";
import { initFlowbite } from 'flowbite'
import Logo from '../assets/logo2.png'
import Thumbanil from '../assets/Thumbnail/thumbnail.png'
import Dustbin from '../assets/icons/dustbin.svg'
import { Link } from 'react-router-dom';
import axios from 'axios';
// Ensure Axios sends cookies with every request
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;

// function Nav({ downloadToken }) {
function Nav({ pdf_path }) {
  
  useEffect(() => {
    initFlowbite();
  }, []);

  const handleClearConversation = (e) => {
    e.preventDefault();
    window.location.reload(); // This will refresh the page
  }
  // const downloadFile = () => {
  //   const link = document.createElement('a');
  //   link.href = 'https://patientintakeforms.s3.amazonaws.com/Patient%20Intake%20Form%201_ohwGRQy.pdf';
  //   link.download = 'PatientIntakeForm.pdf';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }
  

  // const handleDownload = async (e) => {
  //   e.preventDefault(); // Prevent the default link behavior
  //   if (!downloadToken) {
  //     console.error('No download token available');
  //     return;
  //   }
  // }

  //   try {
  //     const response = await axios.get('http://127.0.0.1:8000/download-pdf/', {
  //       params: {
  //         token: downloadToken,
  //       },
  //       responseType: 'blob',
  //       withCredentials: true,
  //     });

  //     const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'file.pdf'); // Specify the file name
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (error) {
  //     console.error('Error downloading the PDF', error);
  //   }
  // };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200  ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  "
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/chat" className="flex ms-2 md:me-24">
                <img
                  src={Logo}
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-lg text-gray-600 font-semibold sm:text-xl whitespace-nowrap ">
                  Jupiter Technologies
                </span>
              </Link>
            </div>
            <div className="upload-btn flex items-center">
              <Link to="/upload" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Upload</Link>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0  "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 flex overflow-y-auto bg-white ">
          <ul className="space-y-2 font-medium flex flex-col justify-between">
            <li>
              <div className="pdf_thumbnail relative bg-slate-100 p-2 shadow-lg">
                <a href={pdf_path} target='_blank'>
                {/* <Link to="" onClick={handleDownload}> */}
                  <img src={Thumbanil} alt="" className="w-64 border" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg">Open</span>
                  </div>
                </a>
              </div>


            </li>
            <li>
              <hr />
              <div className="clear_convo pt-3 px-3 flex items-baseline ">
                <span className='mr-2'><img src={Dustbin} alt="" className='' /></span>
                <span><Link to="" id='clear-convo-btn' onClick={handleClearConversation} className=''>Clear Conversation</Link></span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Nav;
