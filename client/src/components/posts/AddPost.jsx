import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useContext, useState } from "react";
import { PostConText } from "../../contexts/PostContext";

const AddPost = () => {
	// context
	const { showAddPost, setShowAddPost, createPost, setShowToast } = useContext(PostConText);

	const closeDialog = () => {
		resetAddPostData();
	};

	// state
	const [newPost, setNewPost] = useState({
		title: "",
		description: "",
		url: "",
		status: "",
	});

	const { title, description, url, status } = newPost;

	const onChangeNewPostForm = (event) => {
		setNewPost({ ...newPost, [event.target.name]: event.target.value });
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		const { success, message } = await createPost(newPost);
		resetAddPostData();
		setShowToast({
			show: true,
			message,
			type: success ? "success" : "danger",
		});
	};

	const resetAddPostData = () => {
		setNewPost({ title: "", description: "", url: "", status: "" });
		setShowAddPost(false);
	};

	return (
		<Modal show={showAddPost} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to post?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Title"
							name="title"
							value={title}
							required
							aria-describedby="title-help"
							onChange={onChangeNewPostForm}
						/>
						<Form.Text id="title-help" muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as="textarea"
							row={3}
							placeholder="Description"
							name="description"
							value={description}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="URL"
							name="url"
							value={url}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as="select"
							name="status"
							value={status}
							onChange={onChangeNewPostForm}
						>
							<option value="To Learn">To Learn</option>
							<option value="Learning">Learning</option>
							<option value="Learned">Learned</option>
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant="primary" type="submit">
						Submit!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default AddPost;
