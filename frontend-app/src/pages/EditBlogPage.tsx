import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, CircularProgress, Container, TextField, Typography} from "@mui/material";
import {getBlogById, updateBlog} from "../api/api.ts";

const EditBlogPage = () => {
    const {id} = useParams(); 
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlogById(id);
                if (data) {
                    setTitle(data.title || "");
                    setDescription(data.description || "");
                } else {
                    setError("Blog not found.");
                }
            } catch (err) {

                setError("Failed to load blog details.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            await updateBlog(id, title, description);
            navigate("/");
        } catch (err) {
            setError("Failed to update blog. Please try again.");
        }
    };

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="sm"
                   sx={{
                       marginTop: 4,
                       padding: 3,
                       borderRadius: 2,
                       boxShadow: 3,
                       background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                   }}>
            <Typography variant="h4" align="center" gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                            marginBottom: 3,
                        }}>
                Edit Blog
            </Typography>
            {error && <Typography color="error" align="center"
                                  sx={{
                                      marginBottom: 2,
                                  }}>{error} </Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Blog Title"
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        marginBottom: 2,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Description"
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        marginBottom: 3,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                        },
                    }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: 1,
                            paddingY: 1.5,
                            fontSize: "1rem",
                            "&:hover": {
                                backgroundColor: "primary.dark",
                            },
                        }}
                >
                    Update Blog
                </Button>
            </form>
        </Container>
    );
};

export default EditBlogPage;
