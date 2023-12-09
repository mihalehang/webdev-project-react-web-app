import './App.css';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/index.js';
import Login from './pages/login/index.js';
import Profile from './pages/profile/index.js';
import Register from './pages/register/index.js';
import Search from './pages/search/index.js';
import MovieDetails from './movies/movie-details.js';
import UserTable from './users/table.js';
import UserDetails from './users/details.js';
import { Provider } from 'react-redux';
import store from './store.js';
import CurrentUser from './users/currentUser.js';
import MovieResults from './movies/movie-results.js';
import ProtectedAdminRoute from './users/protectedAdminRoute.js';
import NavigationBar from './components/NavigationBar.js';

function App() {
    return (
        <Provider store={store}>
            <div className="body-background">
                <CurrentUser>
                    <NavigationBar />
                    <div className="body-container">
                        <HashRouter>
                            <Routes>
                                <Route path="/" element={<Navigate to="/TissueBoxd/home" />} />
                                <Route path="/TissueBoxd/home" element={<Home />} />
                                <Route path="/TissueBoxd/login" element={<Login />} />
                                <Route path="/TissueBoxd/profile" element={<Profile />} />
                                <Route path="/TissueBoxd/register" element={<Register />} />
                                <Route path="/TissueBoxd/search" element={<Search />} />
                                <Route path="/TissueBoxd/search/:criteria" element={<MovieResults />} />
                                <Route path="/TissueBoxd/movie/:id" element={<MovieDetails />} />
                                <Route
                                    path="/TissueBoxd/users"
                                    element={
                                        <ProtectedAdminRoute>
                                            <UserTable />
                                        </ProtectedAdminRoute>
                                    }
                                />
                                <Route path="/TissueBoxd/profile/:id" element={<UserDetails />} />
                            </Routes>
                        </HashRouter>
                    </div>
                </CurrentUser>
            </div>
        </Provider>
    );
}

export default App;
