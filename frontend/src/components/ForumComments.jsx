import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/ForumComments.css';


const ForumComments = (props) => {

  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");


  useEffect(() => {
    axios.get(`http://localhost:3001/forums/${props.id}/comments/`)
      .then(res => {

        setComments(res.data);
      })

      .catch(error => {
        console.log(error);
      })
  }, []);

  const updateComment = (e) => {
    e.preventDefault();

    console.log("commments", comments);

    axios.post(`http://localhost:3001/forums/${props.id}/comments/`, {
      comment
    })
      .then(() => {
        axios.get(`http://localhost:3001/forums/${props.id}/comments/`)
          .then(res => {

            setComments(res.data);
          })

          .catch(error => {
            console.log(error);
          })
      })
    setComment("");

  };

  console.log("comments", comments);

  return <div>

    <h4>Comments</h4>
    {props.user ? (
      <div className="forum-item-comments">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What are your thoughts?" id="add-comment" name="add-comment" size={75}
        />
    <form>
      <div className="forum-item-comments">
        <button onClick={updateComment} type="submit" value="Submit">Comment</button>
      </div>
    </form>
      </div>

    ) : (
      <p>Please log in to comment</p>
    )}
    &nbsp;
    
    <div className="forum-each-comment">
      {comments.map((comment, i) => (
        <p key={i} className="comment">{comment.body}, {comment.username}, {new Date(comment.time_stamp).toLocaleString()}</p>
      ))}
    </div>


  </div>;

}

export default ForumComments;