import useVisible from '@/Hooks/UseVisible';
import { usePage } from '@inertiajs/react';
import React from 'react';

const Toast = () => {
    const { visible, handleClose } = useVisible();
    
    const { flash } = usePage().props;
    if (!flash || !flash.message) return null;
    
    const { color, message } = flash; 

    if(!visible) return null;

    return (
        <div id="toast-default" className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-${color}-600 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed top-5 right-5`} role="alert">
        <div className="text-sm font-thin text-white">{message}</div>
        <button type="button" className={`ml-auto -mx-1.5 -my-1.5 text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-${color}-700 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`} data-dismiss-target="#toast-default" aria-label="Close" onClick={handleClose}>
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>
        </div>
    );
};

export default Toast;
