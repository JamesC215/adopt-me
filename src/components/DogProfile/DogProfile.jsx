import { Link } from "react-router-dom"

export default function DogProfile(props) {
  return (
    <>
      <Link to={`/dogs/${props.dog.name}`}>
        <div style={{"background": `url(${props.dog.image}) no-repeat center center`, "WebkitBackgroundSize": "cover"}}>
          <div className="title">
            <h1>{props.dog.name}</h1>
            <h4>Age: {props.dog.age}</h4>
          </div>
        </div>
      </Link>
    </>
  );
}