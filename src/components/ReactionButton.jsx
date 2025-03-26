import { useSelector, useDispatch } from "react-redux";
import { updateReaction } from "../reducers/blogSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButton = ({ blog }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji)
    .filter(([name]) => name in blog)
    .map(([name, emoji]) => {
      return (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() =>
            dispatch(updateReaction({ blogID: blog.blogID, reaction: name }))
          }
        >
          {emoji} {blog[name]}
        </button>
      );
    });

  return <div>{reactionButtons}</div>;
};

export default ReactionButton;
