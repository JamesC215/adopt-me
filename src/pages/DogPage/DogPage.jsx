import DogProfile from "../../components/DogProfile/DogProfile";
import "./DogPage.css";
import { dogs } from '../../dogs';

export default function DogPage({ dogs }) {
  return (
    <div className="container">
      {
        dogs.map(dog => {
          return <DogProfile key={dog.name} dog={dog} />
        })
      }
    </div>
  )
}