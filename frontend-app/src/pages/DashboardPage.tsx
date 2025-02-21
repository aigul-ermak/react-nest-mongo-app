import * as React from 'react';
import {useEffect, useState} from 'react';
import {Card, CardContent, CircularProgress, Container, Pagination, Typography} from "@mui/material";
import {getBlogs} from "../api/api.ts";

const DashboardPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                console.log(`Fetching blogs for page ${page}...`);
                const data = await getBlogs(page);
                console.log("Received blogs:", data);

                setBlogs(data.blog || []);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                console.error("Error fetching blogs:", err.response?.data || err.message);
                setError("Failed to load blogs.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [page]); // Re-fetch when page changes

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Blog Posts
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
                        <Card key={blog.id} sx={{marginBottom: 2}}>
                            <CardContent>
                                <Typography variant="h6">{blog.title}</Typography>
                                <Typography>{blog.description}</Typography>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Pagination UI */}
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        color="primary"
                        sx={{display: "flex", justifyContent: "center", marginTop: 3}}
                    />
                </>
            )}
        </Container>
    );
};

export default DashboardPage;