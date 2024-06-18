import { fetchData } from './fetchData';
import { fetchComments } from './fetchComments';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { DateTime } from 'luxon';
import NewCommentForm from './NewCommentForm';
import { useParams } from "react-router-dom";
import triangle from './assets/triangle.svg';
import star from './assets/star.svg';
export default function Comments({ remount }) {
    const { postId } = useParams();
    const { comments, commentsError, commentsLoading } = fetchComments(`posts/${postId}/comments`, 'GET', null);
    const [commentsDisplayed, setCommentsDisplayed] = useState(true);
    const [newCommentDisplayed, setNewCommentDisplayed] = useState(false);

    const navigate = useNavigate();

    const [formLoading, setFormLoading] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    function handleNewComment() {
        remount();
    }
    return (
        <>
            {commentsLoading && <p>loading comments...</p>}
            {commentsError && <p>network error - try again </p>}
            {comments && (
                <div className="comments-container">
                    <div className="comments-header">
                        {commentsDisplayed ? <img src={triangle} className='comments-displayed-icon' /> : <img src={triangle} className='comments-hidden-icon' />}
                        <div className="comments-title" onClick={() => setCommentsDisplayed(!commentsDisplayed)}
                        >comments {`( ` + comments.allComments.length + ` )`}</div>
                        <button onClick={(() => setNewCommentDisplayed(!newCommentDisplayed))}>
                            {newCommentDisplayed ?
                                <div className="new-comment-button-container"><span className="new-comment-icon">-</span>
                                    <span className="new-comment-hover">cancel</span></div>

                                : <div className="new-comment-button-container"><span className="new-comment-icon">+</span>
                                    <span className="new-comment-hover">new comment</span></div>}</button>

                    </div>

                    {newCommentDisplayed ?
                        <NewCommentForm remount={handleNewComment} />
                        : null}
                    {commentsDisplayed ?

                        comments.allComments.map((comment) => {
                            return (
                                <div className="comment" key={comment._id}>
                                    <div className="comment-info">
                                        <p className="comment-author">{comment.author}</p>
                                        {comment.isAdmin ?
                                            <div className="admin-tag">
                                                <img src={star}></img>
                                                <p>admin</p>
                                                <img src={star}></img>
                                            </div> :
                                            <div></div>}
                                        <p className="comment-date">{DateTime.fromISO(comment.createdAt).toLocaleString(
                                            DateTime.DATE_MED,
                                        )}</p>
                                    </div>
                                    <p className="comment-text">{comment.text}</p>

                                </div>
                            )
                        })
                        : null}
                </div>)}
        </>
    );
}