import { createContext, useReducer } from 'react';
import { comments, currentUser } from './data.json';

const CommentContext = createContext(comments);

const getPosition = (state, id) => {
  let position;
  for (let i = 0; i < state.length; i++) {
    const comment = state[i];
    if (comment.id === id) position = [i];
    else
      for (let j = 0; j < comment.replies.length; j++) {
        const reply = comment.replies[j];
        if (reply.id === id) position = [i, j];
      }
  }
  return position;
};

const reducer = (state, { type, payload }) => {
  const workingState = structuredClone(state);
  let position;
  switch (type) {
    case 'add':
      workingState.push({
        id: Math.floor(Math.random() * 1000000),
        content: payload.content,
        createdAt: Date.parse(new Date()),
        score: 0,
        user: currentUser,
        replies: [],
      });
      return workingState;

    case 'increment-score':
      position = getPosition(workingState, payload.id);

      if (position.length === 1) workingState[position[0]].score++;
      else workingState[position[0]].replies[position[1]].score++;
      return workingState;

    case 'decrement-score':
      position = getPosition(workingState, payload.id);

      if (position.length === 1) workingState[position[0]].score--;
      else workingState[position[0]].replies[position[1]].score--;
      return workingState;

    case 'reply':
      position = getPosition(workingState, payload.id);

      workingState[position[0]].replies.splice(position[1] + 1, 0, {
        id: Math.floor(Math.random() * 1000000),
        content: payload.content,
        createdAt: Date.parse(new Date()),
        score: 0,
        replyingTo: payload.replyingTo,
        user: currentUser,
      });

    case 'edit':
      position = getPosition(workingState, payload.id);

      if (position.length === 1) workingState[position[0]].content = payload.content;
      else workingState[position[0]].replies[position[1]].content = payload.content;

    case 'delete':
      position = getPosition(workingState, payload.id);

      if (position.length === 1) workingState.splice(position[0], 1);
      else workingState[position[0]].replies.splice(position[1], 1);

    default:
      return workingState;
  }
};

export function CommentProvider({ children } = props) {
  const [state, dispatch] = useReducer(reducer, comments);

  return <CommentContext.Provider value={{ commentState: state, dispatchCommentAction: dispatch }}>{children}</CommentContext.Provider>;
}

export default CommentContext;
