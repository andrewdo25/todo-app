import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { PostConText } from "../../contexts/PostContext";

const UpdatePost = () => {
	// Contexts
	const {
		postState: { post },
		showUpdatePost,
		setShowUpdatePost,
		updatePost,
		setShowToast,
	} = useContext(PostConText);

	// State
	const [updatedPost, setUpdatedPost] = useState(post);

    // khi click vao post khac thi chon no de update
	useEffect(() => setUpdatedPost(post), [post]);

	const { title, description, url, status } = updatedPost;

	const onChangeUpdatedPostForm = (event) =>
		setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });

	const closeDialog = () => {
        // khi cancel thi no reset lai gia tri o dang dien
		setUpdatedPost(post);
		setShowUpdatePost(false);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		const { success, message } = await updatePost(updatedPost);
		setShowUpdatePost(false);
		setShowToast({ show: true, message: message , type: success ? "success" : "danger" });
	};

	return (
		<Modal show={showUpdatePost}  onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Making progress?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Title"
							name="title"
							required
							aria-describedby="title-help"
							value={title}
							onChange={onChangeUpdatedPostForm}
						/>
						<Form.Text id="title-help" muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Description"
							name="description"
							value={description}
							onChange={onChangeUpdatedPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="URL"
							name="url"
							value={url}
							onChange={onChangeUpdatedPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as="select"
							value={status}
							name="status"
							onChange={onChangeUpdatedPostForm}
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

export default UpdatePost;
