import { useContext, useState } from 'react';
import CommentContext from './CommentProvider';
import CommentForm from './CommentForm';
import Modal from './Modal';
import { currentUser } from './data.json';

import { DeleteIcon, EditIcon, MinusIcon, PlusIcon, ReplyIcon } from './assets';

function Comment({
  data: {
    id,
    content,
    createdAt,
    score,
    user: { image: userimage, username },
    replies,
    replyingTo,
  },
} = props) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { dispatchCommentAction } = useContext(CommentContext);

  const replySubmitHandler = (e) => {
    e.preventDefault();

    e.target[0].value && dispatchCommentAction({ type: 'reply', payload: { id, content: e.target[0].value, replyingTo: username } });
    setReplying(false);
  };
  const editSubmitHandler = (e) => {
    e.preventDefault();

    e.target[0].value && dispatchCommentAction({ type: 'edit', payload: { id, content: e.target[0].value } });
    setEditing(false);
  };
  const deleteSubmitHandler = () => {
    dispatchCommentAction({ type: 'delete', payload: { id: id } });
    setDeleting(false);
  };

  return (
    <div className="wrapper my-4">
      <div className="comment relative p-4 sm:p-6 md:relative bg-white rounded-xl">
        <div className="md:ml-16">
          <div className="comment__by flex items-center gap-4 mb-4">
            <img className="w-8" src={userimage.png} alt="commented by amyrobson" />
            <p className="flex gap-2">
              <span className="font-medium text-dark-blue">{username}</span>
              {username === currentUser.username && <span className="bg-moderate-blue text-white px-2 text-[13px] font-medium rounded-sm">you</span>}
              <span className="text-grayish-blue ml-2">{createdAt}</span>
            </p>
          </div>
          <p className="comment__content text-grayish-blue mb-4 md:mb-0">
            {replyingTo && <span className="text-moderate-blue font-medium">@{replyingTo} </span>}
            {content}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="comment__likes flex md:flex-col md:absolute md:top-6 items-center bg-very-light-gray w-fit rounded-lg">
            <button className="pl-4 pr-2 py-2 md:px-4 md:pt-4  fill-light-grayish-blue hover:fill-moderate-blue transition-all" onClick={() => dispatchCommentAction({ type: 'increment-score', payload: { id } })} type="button">
              <PlusIcon />
              <span className="w-0 h-0 p-0 m-0 overflow-hidden">Increase likes</span>
            </button>
            <span className="px-2 md:px-4 py-2 text-moderate-blue font-medium">{score}</span>
            <button className="pl-2 pr-4 py-2 md:px-4 md:pb-4  fill-light-grayish-blue hover:fill-moderate-blue transition-all" onClick={() => dispatchCommentAction({ type: 'decrement-score', payload: { id } })} type="button">
              <MinusIcon />
              <span className="w-0 h-0 p-0 m-0 overflow-hidden">decrease likes</span>
            </button>
          </div>
          <div className="comment__actions flex gap-4 md:absolute md:top-8 md:right-6">
            {username === currentUser.username ? (
              <>
                <button type="button" className=" flex gap-2 items-center text-soft-red hover:text-pale-red font-medium leading-4 fill-soft-red hover:fill-pale-red transition-all" onClick={() => setDeleting((curr) => !curr)}>
                  <DeleteIcon />
                  <span>Delete</span>
                </button>
                <button type="button" className=" flex gap-2 items-center text-moderate-blue hover:text-light-grayish-blue font-medium leading-4 fill-moderate-blue hover:fill-light-grayish-blue transition-all" onClick={() => setEditing((curr) => !curr)}>
                  <EditIcon />
                  <span>Edit</span>
                </button>
              </>
            ) : (
              <button type="button" className=" flex gap-2 items-center text-moderate-blue hover:text-light-grayish-blue font-medium leading-4 fill-moderate-blue hover:fill-light-grayish-blue transition-all" onClick={() => setReplying((curr) => !curr)}>
                <ReplyIcon />
                <span>Reply</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {replying && (
        <div className="mt-2">
          <CommentForm onSubmit={replySubmitHandler} submitBtnText="REPLY" placeholder={`Replying to @${username}`} />
        </div>
      )}
      {editing && (
        <div className="mt-2">
          <CommentForm onSubmit={editSubmitHandler} submitBtnText="UPDATE" value={content} />
        </div>
      )}
      {deleting && (
        <Modal onClose={() => setDeleting(false)}>
          <h5 className="text-xl font-medium text-dark-blue">Delete comment?</h5>
          <p className="my-4 sm:my-6 text-grayish-blue">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <div className="flex justify-between">
            <button type="button" onClick={() => setDeleting(false)} className="px-3 sm:px-6 py-2 sm:py-3 bg-grayish-blue rounded-lg text-lg font-medium text-white">
              NO, CANCEL
            </button>
            <button type="button" onClick={deleteSubmitHandler} className="px-3 sm:px-6 py-2 sm:py-3 bg-soft-red rounded-lg text-lg font-medium text-white">
              YES, DELETE
            </button>
          </div>
        </Modal>
      )}
      {replies?.length > 0 && (
        <div className="flex">
          <div className="w-[2px] shrink-0 h-auto bg-light-gray mx-4 my-4"></div>
          <div>
            {replies.map((reply) => (
              <Comment key={reply.id} data={reply} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
