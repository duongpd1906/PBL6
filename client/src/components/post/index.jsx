import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Comment from "../comment";
import Emoji from "../emoji";
import { listComment } from "../../utils";
import "./post.scss";
function Post() {
  const [showComment, setShowComment] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  return (
    <div className="post-container">
      <div className="mx-3">
        <div className="d-flex align-items-center">
          <div className="col-1 shape-circle">
            <img
              className="col-12 img-circle"
              alt=""
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/278373151_5503087279715838_7561715020076563791_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=KEVB6h_f4YcAX-pkpLI&_nc_ht=scontent.fdad1-4.fna&oh=00_AT8VLiMXcNYC1C1sxJ2gfoALj-9tqS5sAQRewELb6UZaoQ&oe=63267E1C"
            />
          </div>
          <div className="ms-3">
            <a className="user-name" href="">
              Lotte Cinema
            </a>
            <br />
            <span>9 Tháng 9 lúc 06:00</span>
          </div>
        </div>
        <p className="mt-2">
          Quái thú khổng lồ đến từ Thái Lan bắt đầu đổ bộ.
          <br />
          Cự Đà Triệu Baht | KC 23.09.2022
          <p className="txt-blue">#Leio #Cudatrieubaht </p>
        </p>
      </div>
      <img
        className="col-12"
        alt=""
        src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/306659234_5943750155649546_3519050989164955402_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=A9VbacK7Y6YAX__CSVv&tn=fQqaHM4RDMemO35s&_nc_ht=scontent.fdad1-4.fna&oh=00_AT_4tDkjcwnJv-HnzL8e51U9vXkn0gT3pR7nhi7u_dfLSg&oe=6326642C"
      />
      <div className="post-container__bottom mx-3">
        <div className="d-flex align-item-center">
          <img
            className="img-circle"
            style={{ width: "20px" }}
            src={require("../../assets/images/like.png")}
            alt=""
          />
          <img
            className="img-circle"
            style={{ width: "20px" }}
            src={require("../../assets/images/heart.png")}
            alt=""
          />
          <img
            className="img-circle"
            style={{ width: "20px" }}
            src={require("../../assets/images/haha.png")}
            alt=""
          />
          <span className="ms-2">120</span>
        </div>
        <div className="post-container__bottom__action">
          <div
            className="col-4"
            onMouseEnter={() => setShowEmoji(true)}
            onMouseLeave={() => setShowEmoji(false)}
          >
            <Emoji state={showEmoji} />
            <p>Thích</p>
          </div>
          <div className="col-4" onClick={() => setShowComment(true)}>
            <p>Bình luận</p>
          </div>
          <div className="col-4">
            <p>Chia sẻ</p>
          </div>
        </div>
        <div className="post-container__bottom__comment col-12">
          <img
            className="img-circle"
            alt=""
            src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/280374790_1477115089370427_2274356777150785265_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=BGiT7grLdloAX9IRJ_q&_nc_ht=scontent.fdad1-2.fna&oh=00_AT9cSGOCa9XgxlLhOaqjXNYXm19qGb65c2eSuzlvgQuLGQ&oe=63279F08"
          />
          <input placeholder="Viết bình luận..." />
        </div>
        {showComment &&
          listComment.map((comment) => <Comment data={comment} />)}
      </div>
    </div>
  );
}

export default Post;
