import { fetchData } from './fetchData';
import { fetchComments } from './fetchComments';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useParams } from "react-router-dom";
import Comments from "./Comments.jsx";

export default function Post() {
    const { postId } = useParams();
    const { data, error, loading } = fetchData(`posts/${postId}`, 'GET', null);
    const [remountComments, setRemountComments] = useState(1);

    const navigate = useNavigate();

    const [formLoading, setFormLoading] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    function handleRemountComments() {
        setRemountComments((state) => state + 1);
    }
    return (
        <div className="post-main-content">
            {loading && <p>loading post...</p>}
            {error && <p>network error - try again </p>}
            {data && (
                <div className="post">
                    <h2 className="post-title">{data.title}</h2>
                    <p className="post-summary">{data.summary}</p>
                    <p className="post-text">{data.text}</p>
                    <p className="post-date">{DateTime.fromISO(data.createdAt).toLocaleString(
                        DateTime.DATE_MED,
                    )}</p>
                </div>
            )}
            <Comments key={remountComments}
                remount={handleRemountComments} />
        </div>
    );
}