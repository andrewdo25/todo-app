import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
	apiUrl,
	POSTS_LOADED_SUCCESS,
	POSTS_LOADED_FAIL,
	ADD_POST,
	FIND_POST,
	DELETE_POST,
	UPDATE_POST,
} from "./constant";
import axios from "axios";

export const PostConText = createContext();

const PostConTextProvider = ({ children }) => {
	// state
	const [postState, dispatch] = useReducer(postReducer, {
		post: null,
		posts: [],
		postsLoading: true,
	});

	const [showAddPost, setShowAddPost] = useState(false);
	const [showUpdatePost, setShowUpdatePost] = useState(false);
	const [showToast, setShowToast] = useState({
		show: false,
		message: "",
		type: null,
	});

	// Get all posts
	const getPosts = async () => {
		try {
			const response = await axios.get(apiUrl + "/posts");
			if (response.data.success) {
				dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
			}
		} catch (error) {
			dispatch({ type: POSTS_LOADED_FAIL });
		}
	};

	// create post
	const createPost = async (newPost) => {
		try {
			const response = await axios.post(apiUrl + "/posts", newPost);
			if (response.data.success) {
				dispatch({
					type: ADD_POST,
					payload: response.data.post,
				});
				return response.data;
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: "Server error" };
		}
	};
	// delete post
	const deletePost = async (postId) => {
		try {
			const response = await axios.delete(`${apiUrl}/posts/${postId}`);
			if (response.data.success) dispatch({ type: DELETE_POST, payload: postId });
		} catch (error) {
			console.log(error);
		}
	};

	// find post to update
	const findPost = async (postId) => {
		const post = postState.posts.find((post) => post._id === postId);
		dispatch({
			type: FIND_POST,
			payload: post,
		});
	};

	// update Post
	const updatePost = async (updatedPost) => {
		try {
			const response = await axios.put(apiUrl + "/posts/" + updatedPost._id, updatedPost);
			if (response.data.success) {
				dispatch({
					type: UPDATE_POST,
					payload: updatedPost,
				});
				return response.data;
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: "Server error" };
		}
	};

	// context data
	const postConTextData = {
		getPosts,
		postState,
		showAddPost,
		setShowAddPost,
		showUpdatePost,
		setShowUpdatePost,
		showToast,
		setShowToast,
		createPost,
		updatePost,
		deletePost,
		findPost,
	};

	// return Provider
	return <PostConText.Provider value={postConTextData}>{children}</PostConText.Provider>;
};

export default PostConTextProvider;
