import { Link } from "react-router-dom";
import "./post.css";

// eslint-disable-next-line react/prop-types
export default function Post({ img }) {
  return (
    <div className="post">
      <div className="PostOwner">
        <div>
          <img
            className="topImg"
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          ></img>
        </div>
        <span className="userName">Username</span>
      </div>
      <img className="postImg" src={img} alt="" />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to="/post/abc" className="link">
            Lorem ipsum dolor sit amet
          </Link>
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
        fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
        atque, exercitationem quibusdam, reiciendis odio laboriosam?
        &nbsp;&nbsp;
        <Link to="">Read More</Link>....
      </p>
      <div className="LikesAndComments">
        <i className="far fa-thumbs-up"></i>
        <i className="far fa-comments"></i>
        <p>23 Likes 51 Comments</p>
      </div>
    </div>
  );
}
