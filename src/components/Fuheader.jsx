/* eslint-disable react/prop-types */
import Posts from "./posts/Posts";

export default function Fuheader({ source }) {
  console.log(source);
  return (
    <div className="ForumMain">
      <img
        src="https://cdn.dubootcamp.com/wp-content/uploads/sites/66/2020/05/shutterstock_753780223-850x412.jpg"
        alt=""
        className="coverImg"
      />
      <div className="ProfileImg">
        <img
          src="https://miro.medium.com/max/1187/1*0FqDC0_r1f5xFz3IywLYRA.jpeg"
          alt=""
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="ForumInfo">
        <center>
          <p>Forum Title</p>
          <span className="postDate">2 months ago</span>
        </center>
        <br></br>
        <p className="ForumDesc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad tempora
          illo beatae numquam, labore nihil voluptas eveniet, blanditiis ipsum,
          repellat reiciendis? Ullam blanditiis libero et neque cupiditate
          veniam, animi commodi!
        </p>
      </div>
      <Posts />
    </div>
  );
}
