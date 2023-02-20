import { useContext } from 'react';
import Comment from './Comment';
import CommentContext from './CommentProvider';

function Comments() {
  const { commentState } = useContext(CommentContext);

  return (
    <>
      {commentState.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
    </>
  );
}

export default Comments;
