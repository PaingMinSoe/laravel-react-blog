import { useAuth } from "../contexts/AuthContext"
import AvatarImage from "../assets/avatar.jpg"

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="w-full mt-10 grid grid-cols[30%_70%]">
            {user && <div className="w-full">
                <img src={AvatarImage} className="w-80 h-80 rounded-full" alt={user.name} />
            </div>}
            <div>
                
            </div>
        </div>
    )
}