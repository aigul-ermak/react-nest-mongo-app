import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsByBlogId } from "../api/api.ts";
import { Container, Typography, Card, CardContent, CircularProgress, Pagination } from "@mui/material";

const BlogPostsPage = () => {
    const { id } = useParams(); // Get blog ID from URL
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log(`Fetching posts for blog ${id}...`);
                const data = await getPostsByBlogId(id, page);
                console.log("Received posts:", data);

                setPosts(data.items || []);
                setTotalPages(data.pagesCount || 1);
            } catch (err) {
                console.error("Error fetching posts:", err.response?.data || err.message);
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [id, page]);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Blog Posts
            </Typography>

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
