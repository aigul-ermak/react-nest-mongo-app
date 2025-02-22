
import { useEffect, useState } from "react";
import {Card, CardContent, CircularProgress, Container, Pagination, Typography, Button, Box} from "@mui/material";
import {deleteBlog, getBlogs} from "../api/api.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { Link  } from "react-router-dom";

interface Blog {
    id: string;
    title: string;
    description: string;
    authorId: string;
}




const DashboardPage = () => {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs(page, limit);

                if (data.blog) {
                    setBlogs(data.blog);
                } else {
                    setError("Failed to load blogs.");
                }
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                setError("Failed to load blogs.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [page, limit]);

    const handleDelete = async (blogId: string) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await deleteBlog(blogId);
            setBlogs(blogs.filter((blog) => blog.id !== blogId));
        } catch (err) {
            console.error("Error deleting blog:", err);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to our platform!
            </Typography>
            <Typography align="center" sx={{ mb: 2 }}>
                Read blogs and explore content.
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
                                sx={{ marginBottom: 2, padding: 2 }}
                                >
                            <CardContent>
                                <Typography variant="h6">{blog.title}</Typography>
                                <Typography>{blog.description}</Typography>

                                <Box mt={2} display="flex" gap={2}>
                                    {/* See All Posts Button (Public) */}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        component={Link}
                                        to={`/blogs/${blog.id}/posts`}
                                    >
                                        See All Posts
                                    </Button>
                                </Box>

                                {}
                                {user && user.userId === blog.authorId && (
                                    <>
                                        <Button component={Link} to={`/edit-blog/${blog.id}`} variant="outlined" sx={{ marginRight: 1 }}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete((blog as any).id)}>
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
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
                    />
                </>
            )}
        </Container>
    );
};

export default DashboardPage;
