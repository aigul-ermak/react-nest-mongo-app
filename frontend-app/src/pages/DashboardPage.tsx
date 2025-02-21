import * as React from 'react';
import { useEffect, useState } from "react";
import { Card, CardContent, CircularProgress, Container, Pagination, Typography, Button } from "@mui/material";
import {deleteBlog, getBlogs} from "../api/api.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { Link, useNavigate  } from "react-router-dom";

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                console.log(`Fetching blogs for page ${page}...`);
                const data = await getBlogs(page, limit);
                console.log("Received blogs:", data);

                if (data.blog) {
                    setBlogs(data.blog);
                } else {
                    console.error("Unexpected API response format:", data);
                    setError("Failed to load blogs.");
                }

                setTotalPages(data.totalPages || 1);
            } catch (err) {
                console.error("Error fetching blogs:", err.response?.data || err.message);
                setError("Failed to load blogs.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [page, limit]);

    const handleDelete = async (blogId) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await deleteBlog(blogId);
            setBlogs(blogs.filter((blog) => blog.id !== blogId));
        } catch (err) {
            console.error("Error deleting blog:", err);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Blog Posts
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : blogs.length === 0 ? (
                <Typography>No blogs found.</Typography>
            ) : (
                <>
                    {blogs.map((blog) => (
                        <Card   key={blog.id}
                                sx={{ marginBottom: 2, cursor: "pointer" }}
                                onClick={() => navigate(`/blogs/${blog.id}/posts`)}>
                            <CardContent>
                                <Typography variant="h6">{blog.title}</Typography>
                                <Typography>{blog.description}</Typography>

                                {/* Ensure user is defined before checking userId */}
                                {user && user.userId === blog.authorId && (
                                    <>
                                        <Button component={Link} to={`/edit-blog/${blog.id}`} variant="outlined" sx={{ marginRight: 1 }}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(blog.id)}>
                                            Delete
                                        </Button>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    ))}

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

export default DashboardPage;
