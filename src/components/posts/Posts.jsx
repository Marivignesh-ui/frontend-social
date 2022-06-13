import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ImagePost from "../post/ImagePost";
import Post from "../post/Post";
import { Link } from "react-router-dom";
import "./posts.css";

export default function Posts({ postList }) {
  const { user } = useContext(AuthContext);
  console.log(postList.length);
  return (
    <div className="posts">
      {postList && postList.length !== 0 && (
        postList.map((post) => {
          return post.postType === "Blog" ? (
            <Link
              to={`/singleBlog/${post._id}`}
              key={post._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Post
                post={post}
                img={
                  process.env.REACT_APP_IMAGEKITURLENDPOINT +
                  "/285990923_1064330277852037_7076476985098266220_n_lRmf3Y7M1.jpg"
                }
                userimg={
                  process.env.REACT_APP_IMAGEKITURLENDPOINT +
                  "/web-development_Ap6b_bSMM.jpeg"
                }
                username={"Web dev Community"}
              />
            </Link>
          ) : (
            <ImagePost key={post._id} post={post} />
          );
        })
      )}
      {/* <Post
        img={
          process.env.REACT_APP_IMAGEKITURLENDPOINT +
          "/285990923_1064330277852037_7076476985098266220_n_lRmf3Y7M1.jpg"
        }
        userimg={
          process.env.REACT_APP_IMAGEKITURLENDPOINT +
          "/web-development_Ap6b_bSMM.jpeg"
        }
        username={"Web dev Community"}
      />
      <ImagePost img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
      <Post img="https://images.pexels.com/photos/6758029/pexels-photo-6758029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
      <ImagePost img="https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
      <Post img="https://images.pexels.com/photos/6711867/pexels-photo-6711867.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
      <Post img="https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
      <Post img="https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" /> */}
    </div>
  );
}
