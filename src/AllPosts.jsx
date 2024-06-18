import { fetchData } from './fetchData';
import { Link, Navigate, useOutletContext } from 'react-router-dom';
import { DateTime } from 'luxon';

export default function AllPosts() {
    const { data, error, loading } = fetchData('posts', 'GET', null);

    return (
        <>
            {loading && <p>loading posts...</p>}
            {error && <p>oopsie, there's an issue</p>}
            {data && (
                <div className="posts-container">
                    {data.allPosts.map((post) => {
                        return (
                            <Link className="post-card" key={post._id} to={`/posts/${post._id}`}>
                                <p className="post-card-title">{post.title}</p>
                                <p className="post-card-summary">{post.summary}</p>
                                <p className="post-card-date">{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATE_MED,)}</p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
}