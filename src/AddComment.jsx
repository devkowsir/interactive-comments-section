import { useContext } from 'react';
import CommentForm from './CommentForm';
import CommentContext from './CommentProvider';

function AddComment() {
  const { dispatchCommentAction } = useContext(CommentContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const content = e.target[0].value;
    content && dispatchCommentAction({ type: 'add', payload: { content } });
    e.target[0].value = '';
  };

  return <CommentForm onSubmit={submitHandler} submitBtnText="SEND" placeholder="Add a comment..." />;
}

export default AddComment;
