import RecentLike from '../../likes/recentLike';
import RecentUsers from '../../users/recentUsers';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <RecentUsers/>
            <RecentLike/>
        </div>
    );
}
