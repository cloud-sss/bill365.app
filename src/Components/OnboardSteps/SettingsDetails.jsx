import React from 'react'

function SettingsDetails({ submit_settings,reset_settings }) {
    const handleSubmit = () => { submit_settings() }
    const handleReset = () => { reset_settings() }

    return (
        <div>
            <div className='flex justify-center gap-2 items-center'>
                <button
                    type="reset"
                    onClick={() => handleReset()}
                    className="inline-flex mr-3 bg-white items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-blue-900 border border-blue-900 bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Previous
                </button>
                <button
                    onClick={() => handleSubmit()}
                    type="submit"
                    className="inline-flex bg-blue-900 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Next
                </button>
            </div>
        </div>
    )
}

export default SettingsDetails