import {JSX, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {deletePostById, getPostsByBlogId, getUsersById} from "../api/api.ts";
import {Box, Button, Card, CardContent, CircularProgress, Container, Pagination, Typography} from "@mui/material";
import {useAuth} from "../context/AuthContext.tsx";

interface Post {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    authorId: string;
    authorName: string;
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

const BlogPostsPage = (): JSX.Element => {
    const {id} = useParams();
    const {user} = useAuth();
    const navigate = useNavigate()
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPostsByBlogId(id ?? "", page);

                const postsWithAuthor = await Promise.all(
                    data.items.map(async (post: Post) => {
                        const author = await getUsersById(post.authorId);
                        return {
                            ...post,
                            authorName: author.login,
                        };
                    })
                );

                setPosts(postsWithAuthor || []);
                setTotalPages(data.pagesCount || 1);
            } catch (err) {

                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [id, page]);

    const handleDelete = async (postId: string) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            await deletePostById(postId);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (err) {
            setError("Failed to delete the post.");
        }
    };

    return (
        <Container maxWidth="md" sx={{mt: 4}}>
            <Typography variant="h4" align="center" gutterBottom>
                All Posts
            </Typography>

            {/* Create Post Button - Only visible for logged-in users */}
            {user &&  (
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
                <CircularProgress/>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : posts.length === 0 ? (
                <Typography>No posts found for this blog.</Typography>
            ) : (
                <>
                    {posts.map((post) => (
                        <Card key={post.id} sx={{marginBottom: 2}}>
                            <CardContent>
                                <Typography variant="h6">{post.title}</Typography>
                                <Typography>{post.shortDescription}</Typography>
                                <Typography>{post.content}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Author: {post.authorName} | Created: {formatDate(post.createdAt)}
                                </Typography>


                                {/* Show Edit & Delete buttons only if the user is authenticated */}
                                {user && user.userId === post.authorId &&(
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
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        sx={{display: "flex", justifyContent: "center", marginTop: 3}}
                    />
                </>
            )}
        </Container>
    );
};


export default BlogPostsPage;
