import { currentUser } from './data.json';

function CommentForm({ onSubmit, submitBtnText, placeholder, value } = props) {
  return (
    <form className="grid gap-4 grid-cols-3 items-center bg-white p-4 rounded-lg" onSubmit={onSubmit}>
      <textarea className="col-span-3 px-6 py-3 rounded-lg border-light-gray border text-[17px]" rows="3" placeholder={placeholder} defaultValue={value} />
      <img className="col-span-2 max-w-[2rem]" src={currentUser.image.png} alt="user profile" />
      <button className="px-6 py-3 bg-moderate-blue text-white rounded-lg font-medium" type="submit">
        {submitBtnText}
      </button>
    </form>
  );
}

export default CommentForm;
