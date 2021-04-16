import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { PostConText } from "../../contexts/PostContext";
import { useContext } from "react";

const ActionsButton = ({ url, _id }) => {
	const { deletePost, findPost, setShowUpdatePost } = useContext(PostConText);

	const choosePost = (postId) => {
		findPost(postId);
		setShowUpdatePost(true);
	};
	return (
		<>
			<Button className="post-button" href={url} target="_blank">
				<img src={playIcon} alt="play" width="32" height="32" />
			</Button>
			<Button className="post-button" onClick={choosePost.bind(this, _id)}>
				<img src={editIcon} alt="edit" width="24" height="24" />
			</Button>
			<Button className="post-button" onClick={deletePost.bind(this, _id)}>
				<img src={deleteIcon} alt="delete" width="24" height="24" />
			</Button>
		</>
	);
};

export default ActionsButton;
