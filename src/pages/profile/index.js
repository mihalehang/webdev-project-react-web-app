import Account from "../../users/account";
import "./index.css";

export default function Profile() {
    return (
        <div className="profile-container mx-3">
            <h1>Profile</h1>
            <Account/>
        </div>
    );
}