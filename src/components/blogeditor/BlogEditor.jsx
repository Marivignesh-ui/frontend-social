import "./BlogEditor.css";
import { useRef, useContext } from "react";
import axios from "axios";
import { notify } from "../../components/notify/notify";
import { Editor } from "@tinymce/tinymce-react";
import { AuthContext } from "../../context/AuthContext";

const uploadBlog = async (postDetail,token) => {
  const headers = {
    "x-access-token": token,
  };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKENDPOINT}post/upload`,
      postDetail,
      { validateStatus: () => true, headers: headers },
    );
    console.log(res.data);
    if (res.data.ok) {
      notify(true, res.data.message);
    } else {
      notify(false, res.data.message);
    }
  } catch (error) {
    notify(false, "Network Error");
  }
};

function BlogEditor({ viewState }) {
  const { user,token } = useContext(AuthContext);
  const editorRef = useRef(null);
  const caption = useRef();
  const tags = useRef();
  const postBlog = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      let postDetail = {
        caption: caption.current.value,
        contents: editorRef.current.getContent(),
        owner: user._id,
        postType: "Blog",
        tags: tags.current.value.split(","),
      };
      console.log(postDetail);
      uploadBlog(postDetail,token);
      viewState(false);
    }
  };

  return (
    <div className="editorWrapper">
      <div className="blogEditorMain">
        <form onSubmit={postBlog}>
          <div className="BlogMetaInputWrapper">
            <label htmlFor="BlogTitleInput">Title:</label>
            <input
              type="text"
              id="BlogTitleInput"
              placeholder="Give your Blog a Title..."
              className="BlogTitleInput"
              ref={caption}
              required
            />
            <label htmlFor="BlogTagInput">Tags:</label>
            <input
              type="text"
              id="BlogTagInput"
              placeholder="Add , inbetween different tags..."
              className="BlogTagInput"
              ref={tags}
              required
            />
            <button className="postBlogButton" type="submit">
              Post Blog
            </button>
          </div>
        </form>
        <Editor
          apiKey={process.env.REACT_APP_TINYAPIKEY_BLOG}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 600,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
              "importcss",
              "directionality",
              "visualchars",
              "template",
              "codesample",
              "pagebreak",
              "nonbreaking",
              "quickbars",
              "emoticons",
              "powerpaste",
              "tinydrive",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "forecolor backcolor removeformat | " +
              " charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample " +
              "removeformat",
            image_advtab: true,
            file_picker_types: "image",
            automatic_uploads: true,
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button
          className="shareCancelImg"
          onClick={() => {
            viewState(false);
          }}
        >
          <i className="far fa-times-circle"></i>
        </button>
      </div>
    </div>
  );
}

export default BlogEditor;
