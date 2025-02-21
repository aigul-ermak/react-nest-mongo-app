import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getPostById, updatePostById} from "../api/api.ts";
import {Button, Container, TextField, Typography} from "@mui/material";

const EditPostPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({title: "", shortDescription: "", content: ""});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                setPost(data);
            } catch (err) {
                setError("Failed to load post.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePostById(id, post);
            navigate(-1);
        } catch (err) {
            setError("Failed to update post.");
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Edit Post
            </Typography>

            {loading ? <Typography>Loading...</Typography> : error ? <Typography color="error">{error}</Typography> : (
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Short Description"
                        name="shortDescription"
                        value={post.shortDescription}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />

                    <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                        Save Changes
                    </Button>
                </form>
            )}
        </Container>
    );
};

export default EditPostPage;
