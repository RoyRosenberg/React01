import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchPostsAction } from '../store/postSlice';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useEffect } from 'react';

//To Fix the Typescript error
type Dispatcher = ThunkDispatch<RootState, undefined, AnyAction>;

export default function Posts() {
  const postList = useSelector((state: RootState) => state.post.list);
  const loading = useSelector((state: RootState) => state.post.loading);
  useEffect(() => {
    FetchClick();
  }, []);
  const dispatch = useDispatch<Dispatcher>();
  function FetchClick() {
    dispatch(fetchPostsAction());
  }
  return (
    <>
      <h1>Posts {postList.length}</h1>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={FetchClick}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        Refresh
      </button>
      <table className="table-fixed">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((post, index) => {
            return (
              <tr key={post.id}>
                <td>{index}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
