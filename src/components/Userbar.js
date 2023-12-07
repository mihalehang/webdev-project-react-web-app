import { useSelector } from "react-redux";

function Userbar() {
    const { currentUser } = useSelector((state) => state.usersReducer);
    if (currentUser) {
        return (
            <div>
                <div>Current User: @ {currentUser.username}</div>
                <div>Logged In?: Yes</div>
            </div>
        );
    } else {
        return <div>Logged In?: False</div>
    }
}

export default Userbar;