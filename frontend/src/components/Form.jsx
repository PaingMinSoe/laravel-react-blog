export default function Form({classes, children, ...props}) {
    return (
        <form className={`bg-white px-6 py-8 rounded border dark:border-gray-700 border-gray-300 shadow-lg text-black dark:bg-gray-800 dark:text-white w-full ${classes}`} {...props}>
            {children}
        </form>
    )
}