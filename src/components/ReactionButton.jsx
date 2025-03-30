import { useUpdatedReactionsMutation } from "../api/apiSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButton = ({ blog }) => {
  console.log("blog", blog);
  const [UpdatedReactions] = useUpdatedReactionsMutation();

  const reactionButtons = Object.entries(reactionEmoji)
    .filter(([name]) => name in blog)
    .map(([name, emoji]) => {
      return (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() =>
            UpdatedReactions({ blogID: blog.blogID, reaction: name })
          }
        >
          {emoji} {blog[name]}
        </button>
      );
    });

  return <div>{reactionButtons}</div>;
};

export default ReactionButton;
