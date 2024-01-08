import "./mComment.css";
import avatarImg from '../../assets/avatar.png'
import TextareaAutosize from 'react-textarea-autosize';
import OtherComment from "./otherComment";
import { useState } from "react";
import postApi from "../../apis/postApi";

export default function Mcomment({ listCommentData, postId }) {
    const [listComment, setListComment] = useState([...listCommentData].reverse());
    const [userComment, setUserComment] = useState("");
    const [user] = useState(JSON.parse(localStorage.getItem('user')))

    const [indexComment, setIndexComment] = useState(3);
    const handlerLoadMoreClick = () => {
        setIndexComment((prev) => prev + 3)
        console.log(user)
    }
    const submitCommetFunc = async () => {
        setIndexComment(3)
        setUserComment('');
        const response = await postApi.reviewPost({
            user_id: user.id,
            post_id: postId,
            content: userComment
        })
        const newData = { ...response }
        newData.like_number = 0
        newData.liked_by_current_user = false
        newData.posted_time = "now"
        newData.user = user;
        setListComment([newData, ...listComment])
    }


    return (
        <div className="post-comment-content">
            <div className="comment-title">
                <h4>Bình luận</h4>
            </div>
            {localStorage.getItem('user') &&
                <div className="input-comment">

                    <div className="userInfo">
                        <img src={avatarImg} alt="anh" />
                        <span className="txt-username">{user.username}</span>
                    </div>

                    <TextareaAutosize type="text" className="input-content" placeholder="Something" value={userComment} onChange={(e) => { setUserComment(e.target.value) }} />
                    <div className="solid-line"><span></span></div>
                    <div className="input-submit" onClick={submitCommetFunc}><span className="btn-submit">Bình luận</span></div>
                </div>
            }
            {(listComment.length > 0) ? (
                <div>
                    <div>
                        {listComment.map((comment, index) => (index < indexComment) &&
                            <OtherComment commentContent={comment} key={comment.id}
                            />)}
                        {(indexComment < listComment.length) &&
                            <div className="load-more" onClick={handlerLoadMoreClick}>
                                <div className="load-more-btn">Load more ...</div>
                            </div>
                        }
                    </div>

                </div>
            ) : (
                <p className="txt-noComment">Chưa có bình luận nào</p>
            )
            }

        </div>
    )
}