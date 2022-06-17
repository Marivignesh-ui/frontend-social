import ReactLoading from "react-loading";
import "./loader.css"

export default function Loader() {
  return (
    <div className="LoaderWrapper">
        <ReactLoading type="spinningBubbles" color="#0f172a" height={300} width={200} />
    </div>
  )
}
