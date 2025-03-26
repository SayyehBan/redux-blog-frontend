import { useDispatch } from "react-redux";
import { reactionAdded } from "../reducers/blogSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButton = ({ blog }) => {
  const dispatch = useDispatch();

  // فیلتر کردن ری‌اکشن‌هایی که در داده‌های سرور وجود دارند
  const reactionButtons = Object.entries(reactionEmoji)
    .filter(([name]) => name in blog) // فقط ری‌اکشن‌هایی که در blog هستند
    .map(([name, emoji]) => {
      return (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() =>
            dispatch(reactionAdded({ blogID: blog.blogID, reaction: name }))
          }
        >
          {emoji} {blog[name]}
        </button>
      );
    });

  return <div>{reactionButtons}</div>;
};

export default ReactionButton;
