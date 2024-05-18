export default function Input({ label, animateError, error, ...props }) {
    const classes = `block w-full bg-gray-200 dark:focus:placeholder-blue-600 dark:bg-gray-800 border-2 rounded py-2 px-3 mb-3 leading-tight focus:outline-none transition ease-in-out duration-150 ${error ? 'placeholder-red-500 border-red-500' : 'text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-600'} ${animateError && error ? 'animate-shake' : ''}`;
    return (
        <div className="group mb-4">
            <label className="block group-focus-within:text-blue-600 text-gray-700 dark:text-gray-400 font-bold mb-2 transition ease-in-out duration-150" htmlFor="name">
                {label}
            </label>
            {
                props.type === 'textarea' ? <textarea className={classes} {...props} /> : <input {...props} className={classes} />
            }
            {
                error && <div className={`flex gap-1.5 items-center w-full text-red-500 ${animateError ? 'animate-shake' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                {error[0]}
            </div>
            }
        </div>
    )
}