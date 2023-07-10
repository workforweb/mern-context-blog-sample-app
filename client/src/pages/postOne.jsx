import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Spinner from '../components/Spinner';
import BackBtn from '../components/BackBtn';
import TextAreaWithWordCount from '../components/TextAreaWithWordCount';

export default function PostOne() {
  const postContext = useContext(AppContext);
  const { addPost, loading } = postContext;

  const navigate = useNavigate();

  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
  });

  const { title, body } = newPost;

  const onChange = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();

    addPost({ title, body });
    navigate('/');

    setNewPost({ title: '', body: '' });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <BackBtn />
      <div className="container">
        <div className="form-title">Submit posts</div>
        <div className="form-container">
          <form className="form" onSubmit={onSubmit}>
            <div className="row mb-1">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                aria-label="title"
                placeholder="Type title here...."
                className="input-text"
                value={title}
                onChange={onChange}
              />
            </div>
            <div className="row mb-1">
              <label htmlFor="body" className="form-label">
                Body
              </label>

              <TextAreaWithWordCount
                rows={3}
                cols={3}
                htmlForId="body"
                type="text"
                name="body"
                maxLength={200}
                value={body}
                onChange={onChange}
                errorMsg="You have reached the limit!"
                ariaLabel="body"
                placeholder="Write something...."
                className="input-text"
              />
            </div>
            <div className="row">
              <button type="submit" className="input-text btn-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
