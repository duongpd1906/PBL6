import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useAppContext } from "../../../context/appContext";
import { Input } from "antd";
import "./replying-comment.scss";

const { TextArea } = Input;
function ReplyingComment({parentComment,handleCreateComment}) {
    const { user } = useAppContext()
    const [commentText, setCommentText] = useState("");
    const handlerEnter = (e) => {
        if (e.keyCode  === 13 && !e.shiftKey) {
            e.preventDefault();
        if(commentText !=="" ){
            const comment = {
                postId: parentComment.post,
                text: commentText,
                parentId: parentComment._id,
            }
            handleCreateComment(comment)
            setCommentText("")
        }
      }
    }
    return (
        <div className="replying-comment">
            <img className="img-circle" alt="" src={user.avatar}/>
            <div className="comment">
                <TextArea
                    className="textarea"
                    name="text"
                    placeholder="Viết bình luận..."
                    autoSize={{ maxRows: 5 }}
                    onChange={(e) => {
                        setCommentText(e.target.value);
                    }}
                    value={commentText}
                    onKeyDown={(e) => handlerEnter(e)}
                    />
            </div>
        </div>
    );
}

export default ReplyingComment;
