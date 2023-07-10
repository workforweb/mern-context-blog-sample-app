import { useContext } from 'react';
import AppContext from '../context/AppContext';
import Spinner from '../components/Spinner';
import BackBtn from '../components/BackBtn';
import { useGlobalContext } from '../context/GlobalState';

export default function GetOne() {
  // const postContext = useContext(AppContext);
  // // const { post, loading } = postContext;
  // const { loading } = postContext;
  const { loading } = useGlobalContext();

  const post = JSON.parse(window.localStorage.getItem('post'));

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <BackBtn />
      <div className="full-post">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </>
  );
}
