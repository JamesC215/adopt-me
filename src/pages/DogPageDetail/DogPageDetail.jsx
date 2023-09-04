import "./DogPageDetail.css"
import { dogs } from '../../dogs';
import { useParams } from "react-router-dom"

export default function DogPageDetail({dogs}) {
    let { dogName } = useParams();
    let dog = dogs.find(d => d.name === dogName)
  
    return (
      <div className="flex">
        <div>
          <h1>Hi, my name is {dog.name}!</h1>
          <h4>I am {dog.age} years old. </h4>
          <h3>About Me:</h3>
          <h5>{dog.description}</h5> 
        </div>
        <img src={`${dog.image}`} alt=""/>
      </div>
    )
  }