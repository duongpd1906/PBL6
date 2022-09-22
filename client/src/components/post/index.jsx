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
          <div className="shape-circle">
            <img
              className="img-circle"
              style={{width: "55px", height: "55px"}}
              src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-1/280374790_1477115089370427_2274356777150785265_n.jpg?stp=dst-jpg_p240x240&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=5unFC2K8Uz0AX985xRG&_nc_ht=scontent.fdad1-2.fna&oh=00_AT_yrPH4BTO8V4F6vu03OSS2rmKC5ktOW7sK16WaUTWmUw&oe=63301286"
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
        src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/307006168_630438035267025_2885652568492571628_n.jpg?stp=cp6_dst-jpg&_nc_cat=1&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=Y06aGAO0ESAAX_Nisqr&_nc_ht=scontent.fdad1-4.fna&oh=00_AT9aSuXYuO3dS7fv4akIP8gjvPLalrA2r9bK4g_TWGlpcQ&oe=6330A1B8"
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
