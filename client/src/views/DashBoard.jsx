import { PostConText } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SinglePost from "../components/posts/SinglePost";
import AddPost from "../components/posts/AddPost";
import UpdatePost from "../components/posts/UpdatePost"
import addIcon from "../assets/plus-circle-fill.svg";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";

const DashBoard = () => {
	// context
	const {
		authState: {
			user: { username },
		},
	} = useContext(AuthContext);

	const {
		postState: { post, posts, postsLoading },
		getPosts,
		setShowAddPost,
		showToast: { show, message, type },
		setShowToast,
	} = useContext(PostConText);

	// get all post
	useEffect(() => getPosts(), []);

	let body = null;

	if (postsLoading) {
		body = (
			<div className="d-flex justify-content-center mt-2">
				<Spinner animation="border" variant="info" />
			</div>
		);
	} else if (posts.length === 0) {
		body = (
			<Card className="text-center mx-5 my-5">
				<Card.Header as="h1">Hi {username}</Card.Header>
				<Card.Body>
					<Card.Title>Welcome!</Card.Title>
					<Card.Text>Click the button below to add your first post</Card.Text>
					<Button variant="primary" onClick={setShowAddPost.bind(this, true)}>
						Create
					</Button>
				</Card.Body>
			</Card>
		);
	} else {
		body = (
			<>
				<Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
					{posts.map((post) => (
						<Col key={post._id} className="my-2">
							<SinglePost post={post} />
						</Col>
					))}
				</Row>
				{/* Open Add Post */}
				<OverlayTrigger placement="left" overlay={<Tooltip>Add a new post</Tooltip>}>
					<Button className="btn-floating" onClick={setShowAddPost.bind(this, true)}>
						<img src={addIcon} alt="add-post" width="60" height="60" />
					</Button>
				</OverlayTrigger>
			</>
		);
	}

	return (
		<>
			{body}
			<AddPost />
            {post !== null && <UpdatePost />}
			{/* After post is added, show toast */}
			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</>
	);
};

export default DashBoard;
