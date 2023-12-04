import { useEffect } from 'react';
import { RootState } from '../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../store/postSlice';
import { useParams } from 'react-router-dom';

type Params = {
  postId: string;
};

type Dispatcher = ThunkDispatch<RootState, undefined, AnyAction>;

export default function Post() {
  const params = useParams<Params>();
  const post = useSelector((state: RootState) => state.post.currentPost);
  const dispatch = useDispatch<Dispatcher>();
  useEffect(() => {
    dispatch(getPostById(+params.postId!));
  }, [params.postId!]);

  return <div>{post?.body}</div>;
}
