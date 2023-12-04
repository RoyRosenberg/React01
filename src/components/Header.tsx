import { User, authenticate } from '../api/authenticate';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import {
  authenticateAction,
  authenticatedAction,
  authorizeAction,
  authorizedAction,
} from '../users/userSlice';
import { authorize } from '../api/authorize';
import { NavLink } from 'react-router-dom';

export function Header() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch();
  async function handleSignInClick() {
    dispatch(authenticateAction());
    const authenticatedUser = await authenticate();
    dispatch(authenticatedAction(authenticatedUser));
    if (authenticatedUser !== undefined) {
      dispatch(authorizeAction());
      const authorizedPermissions = await authorize(authenticatedUser.id);
      dispatch(authorizedAction(authorizedPermissions));
    }
  }
  return (
    <header
      className="flex justify-between items-center
    border-b-2 border-gray-100 py-6"
    >
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            <NavLink
              to="/"
              className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              Users
            </NavLink>
            <NavLink
              to="/posts"
              className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Posts
            </NavLink>
          </div>
        </div>
      </div>

      {user ? (
        <span className="ml-auto font-bold">{user.name} has signed in</span>
      ) : (
        <button
          onClick={handleSignInClick}
          className="whitespace-nowrap inline-flex itemscenter
    justify-center ml-auto px-4 py-2 w-36
    border border-transparent rounded-md
    shadow-sm text-base font-medium text-white
    bg-indigo-600 hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? '...' : 'Sign in'}
        </button>
      )}
    </header>
  );
}
