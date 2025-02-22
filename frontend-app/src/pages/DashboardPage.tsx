import {JSX, useEffect, useState} from "react";
import {Box, Button, Card, CardContent, CircularProgress, Container, Pagination, Typography} from "@mui/material";
import {deleteBlog, getBlogs, getUsersById} from "../api/api.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {Link} from "react-router-dom";

interface Blog {
    id: string;
    title: string;
    description: string;
    authorId: string;
    authorLogin: string;
    createdAt: string;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};


const DashboardPage = (): JSX.Element => {
    const {user} = useAuth();
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
                    // Fetch author login for each blog
                    const blogsWithAuthor = await Promise.all(
                        data.blog.map(async (blog: Blog) => {
                            const author = await getUsersById(blog.authorId);
                            return {
                                ...blog,
                                authorLogin: author.login,
                            };
                        })
                    );

                    setBlogs(blogsWithAuthor);
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
        <Container maxWidth="md" sx={{mt: 4}}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to our platform!
            </Typography>
            <Typography align="center" sx={{mb: 2}}>
                Read our blogs and create your own. Register and log in to get started!
            </Typography>

            {loading ? (
                <CircularProgress/>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : blogs.length === 0 ? (
                <Typography>No blogs found.</Typography>
            ) : (
                <>
                    {blogs.map((blog) => (
                        <Card key={blog.id}
                              sx={{
                                  marginBottom: 2,
                                  padding: 2,
                                  borderRadius: 2,
                                  boxShadow: 3,
                                  transition: "transform 0.2s, box-shadow 0.2s",
                                  "&:hover": {
                                      transform: "translateY(-4px)",
                                      boxShadow: 6,
                                  },
                              }}
                        >
                            <CardContent sx={{
                                padding: 3,
                                "&:last-child": {
                                    paddingBottom: 3,
                                },
                            }}>
                                <Typography variant="h6" sx={{
                                    fontWeight: "bold",
                                    color: "primary.main",
                                    marginBottom: 2,
                                }}>{blog.title}</Typography>
                                <Typography sx={{
                                    color: "text.secondary",
                                    marginBottom: 2,
                                }}>{blog.description}</Typography>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    marginBottom: 2,
                                }}>
                                    <Typography sx={{
                                        color: "text.secondary",
                                        fontSize: "0.875rem",
                                    }}>Author: {blog.authorLogin}</Typography>
                                    <Typography sx={{
                                        color: "text.secondary",
                                        fontSize: "0.875rem",
                                    }}>Created: {formatDate(blog.createdAt)}</Typography>
                                </Box>


                                <Box mt={2} display="flex" gap={2}>
                                    {/* See All Posts Button (Public) */}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        component={Link}
                                        to={`/blogs/${blog.id}/posts`}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: "bold",
                                            borderRadius: 2,
                                            paddingX: 3,
                                            paddingY: 1,
                                            "&:hover": {
                                                backgroundColor: "primary.main",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        See All Posts
                                    </Button>
                                </Box>

                                {}
                                {user && user.userId === blog.authorId && (
                                    <Box sx={{mt: 4}}>
                                        <Button component={Link} to={`/edit-blog/${blog.id}`} variant="outlined"
                                                sx={{marginRight: 1}}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error"
                                                onClick={() => handleDelete((blog as any).id)}>
                                            Delete
                                        </Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        sx={{display: "flex", justifyContent: "center", marginTop: 3}}
                    />
                </>
            )}
        </Container>
    );
};

export default DashboardPage;
