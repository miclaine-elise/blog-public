import { useState, useEffect } from 'react';

export function fetchComments(url, method, body) {
    const [comments, setComments] = useState(null);
    const [commentsError, setError] = useState(null);
    const [commentsLoading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        async function getData() {
            try {
                const response = await fetch(`http://localhost:3000/blog/${url}`,
                    {
                        method: method,
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: ['POST', 'PUT'].includes(method)
                            ? JSON.stringify({ message: body })
                            : null,
                    },
                );

                const comments = await response.json();
                if (!ignore) {
                    setComments(comments);
                    setError(null);
                    setLoading(false);
                }
            } catch (err) {
                if (!ignore) {
                    setComments(null);
                    setError(err);
                    setLoading(false);
                }
            }
        }

        getData();
        return () => {
            ignore = true;
        };
    }, []);
    console.log(comments);
    return { comments, commentsError, commentsLoading };
}