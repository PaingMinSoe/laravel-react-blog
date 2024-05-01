import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="min-h-[calc(100vh-160px)] flex justify-center items-center ">
            <div className="text-center shadow-md p-10 border border-gray-600 rounded space-y-2">
                <h1 className="text-3xl font-bold">404 Not Found :(((</h1>
                <p>You can go back to where you come from tho...</p>
                <button className="inline-flex items-center px-3 py-1.5 font-semibold shadow rounded-md text-white bg-blue-600 hover:bg-blue-800 transition ease-in-out duration-150" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </div>
    )
}