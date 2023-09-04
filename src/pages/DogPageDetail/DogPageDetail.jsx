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
          <h3>Age:</h3>
          <h4>I am {dog.age} years old. </h4>
          <h3>Breed:</h3>
          <h5>{dog.description}</h5> 
          <a href="/orders/new" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Donate</a>
        </div>
        <img src={`${dog.image}`} alt=""/>
      </div>
    )
  }