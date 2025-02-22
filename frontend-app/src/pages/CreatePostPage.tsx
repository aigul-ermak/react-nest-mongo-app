import * as React from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createPost} from "../api/api.ts";
import {Container, Typography, TextField, Button, Box} from "@mui/material";

const CreatePostPage = () => {
    const {id} = useParams(); // Blog ID from URL
    const navigate = useNavigate();
    const [post, setPost] = useState({title: "", shortDescription: "", content: ""});
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPost({...post, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createPost(id ?? "", post);
            navigate(`/blogs/${id}/posts`);
        } catch (err) {
            setError("Failed to create post.");
        }
    };

    return (
        <Container maxWidth="md"
                   sx={{
            marginTop: 4,
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
        }}>
            <Typography variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                            marginBottom: 3,
                        }}
            >
                Create a New Post
            </Typography>

            {error && <Typography
                color="error"
                align="center"
                sx={{
                    marginBottom: 2,
                }}
            >{error} </Typography>}

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{
                        marginBottom: 2,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Short Description"
                    name="shortDescription"
                    value={post.shortDescription}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{
                        marginBottom: 3,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                        },
                    }}
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
                    sx={{
                        marginBottom: 3,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                        },
                    }}
                />

                <Box textAlign="center" mt={3}>
                    <Button type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                borderRadius: 1,
                                paddingY: 1.5,
                                fontSize: "1rem",
                                "&:hover": {
                                    backgroundColor: "primary.dark",
                                },
                            }}>
                        Create Post
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default CreatePostPage;
