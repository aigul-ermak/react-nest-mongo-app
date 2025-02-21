import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById, getPostsByBlogId } from "../api/api.ts";
import { useAuth } from "../context/AuthContext";
import { Container, Typography, Card, CardContent, CircularProgress, Button, Box } from "@mui/material";

const BlogDetailsPage = () => {
    const { id } = useParams(); // Get blog ID from URL
    const { user } = useAuth();
    const [blog, setBlog] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const blogData = await getBlogById(id);
                const postsData = await getPostsByBlogId(id);
                setBlog(blogData.blog);
                setPosts(postsData.posts);
            } catch (err) {
                setError("Failed to load blog details.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogDetails();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!blog) return <Typography>No blog found.</Typography>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                {blog.title}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
                {blog.description}
            </Typography>

            {/* Show Edit Blog Button (Only for the Author) */}
            {user && user.userId === blog.authorId && (
                <Button component={Link} to={`/edit-blog/${blog.id}`} variant="contained" sx={{ marginBottom: 2 }}>
                    Edit Blog
                </Button>
            )}

            {/* Display Posts */}
            <Typography variant="h5" gutterBottom>
                Posts
            </Typography>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Card key={post.id} sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{post.title}</Typography>
                            <Typography>{post.content}</Typography>

                            {/* Edit & Delete Buttons (Only for the Post Author) */}
                            {user && user.userId === post.authorId && (
                                <Box mt={2}>
                                    <Button component={Link} to={`/edit-post/${post.id}`} variant="outlined" sx={{ marginRight: 1 }}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error">
                                        Delete
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No posts available.</Typography>
            )}

            {/* Add New Post Button (Only for the Blog Author) */}
            {user && user.userId === blog.authorId && (
                <Button component={Link} to={`/create-post/${blog.id}`} variant="contained" color="primary">
                    Add New Post
                </Button>
            )}
        </Container>
    );
};

export default BlogDetailsPage;
