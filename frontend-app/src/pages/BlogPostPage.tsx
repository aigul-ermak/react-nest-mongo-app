import * as React from 'react';
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {deletePostById, getPostsByBlogId} from "../api/api.ts";
import {Container, Typography, Card, CardContent, CircularProgress, Pagination, Box, Button} from "@mui/material";
import {useAuth} from "../context/AuthContext.tsx";



const BlogPostsPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPostsByBlogId(id, page);
                setPosts(data.items || []);
                setTotalPages(data.pagesCount || 1);
            } catch (err) {

                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [id, page]);

    const handleDelete = async (postId) => {
        try {
            await deletePostById(postId);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (err) {
            setError("Failed to delete the post.");
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Blog Posts
            </Typography>

            {/* Create Post Button - Only visible for logged-in users */}
            {user && (
                <Box textAlign="center" mb={3}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => navigate(`/blogs/${id}/create-post`)}
                    >
                        Create Post
                    </Button>
                </Box>
            )}

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : posts.length === 0 ? (
                <Typography>No posts found for this blog.</Typography>
            ) : (
                <>
                    {posts.map((post) => (
                        <Card key={post.id} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{post.title}</Typography>
                                <Typography>{post.shortDescription}</Typography>
                                <Typography>{post.content}</Typography>
                                {/* Show Edit & Delete buttons only if the user is authenticated */}
                                {user && (
                                    <Box mt={2} display="flex" gap={2}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate(`/edit-post/${post.id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    {/* Pagination */}
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        color="primary"
                        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
                    />
                </>
            )}
        </Container>
    );
};

export default BlogPostsPage;
