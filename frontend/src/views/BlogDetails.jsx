import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DummyImage from "../assets/aang-redirects-lightning.jpeg";
import { axiosClient } from "../services/axiosClient";
import Input from "../components/Input";
import Form from "../components/Form";

export default function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get(`/blogs/${id}`).then(({ data }) => {
      setBlog(data.data);
    });
  }, [id]);

  const submitComment = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosClient.post('comments/create/', {
      body: comment,
      blog_id: blog.id,
    })
    .then(() => {
      setLoading(false);
      navigate(`/blogs/${id}`);
    })
    .catch(err => {
      setLoading(false);
      setErrors(err.response.data.errors);
    });
  }

  return (
    blog && (
      <div className="w-full p-10 flex flex-col items-center">
        <button
          className="me-auto flex gap-2.5 justify-center items-center text-lg hover:text-gray-400 transition-colors duration-100"
          onClick={() => history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </button>
        <img
          src={DummyImage}
          className="w-[40%] rounded shadow-lg mb-8"
          alt=""
        />
        <div className="w-full flex flex-col items-start">
          <div className="mb-3">
            <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>
            <p className="text-gray-500">{blog.created_at}</p>
            <p>
              Authored By <span className="text-gray-500">{blog.author}</span>
            </p>
          </div>
          <p>{blog.body}</p>
        </div>
        <div className="w-full p-10 mt-5">
          <Form onSubmit={submitComment}>
            <h1 className="text-2xl font-bold mb-5">Add your comment</h1>
            <Input
              type="textarea"
              label="Comment Here"
              id="comment"
              name="comment"
              rows="10"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment Here"
              error={errors.body}
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 font-semibold shadow rounded-md text-white bg-blue-600 hover:bg-blue-800 transition ease-in-out duration-150"
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Add Comment
            </button>
          </Form>
          <div>
            <h1 className="text-2xl font-bold mt-7 mb-3">Comments</h1>
            {
              blog.comments.map(comment => (
                <div key={comment.id} className="border flex rounded-md mb-5 p-5">
                  <img src={comment.user.profile_image} alt={comment.user.name} className="w-14 rounded-full" />
                  <div className="ms-3">
                    <p className="font-bold">
                      {comment.user.name}
                    </p>
                    <p>
                      {comment.body}
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  );
}
