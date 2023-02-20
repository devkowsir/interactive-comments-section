import { CommentProvider } from './CommentProvider';
import AddComment from './AddComment';
import Comments from './Comments';

function App() {
  return (
    <main className="w-11/12 max-w-3xl mx-auto">
      <h1 className="hidden">View Comments</h1>
      <CommentProvider>
        <Comments />
        <AddComment />
      </CommentProvider>
    </main>
  );
}

export default App;
