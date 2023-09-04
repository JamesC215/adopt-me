import { Link } from "react-router-dom"

export default function DogProfile(props) {
  return (
    <>
<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
    <div class="flex flex-col items-center pb-10">
        <img class="w-30 h-30 mb-3 mt-3 rounded-full shadow-lg" src={props.dog.image} alt="Dog image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{props.dog.name}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">Age: {props.dog.age}</span>
        <div class="flex mt-4 space-x-3 md:mt-6">
            <Link to={`/dogs/${props.dog.name}`}>
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Profile</a>
            </Link>
            <a href="/orders/new" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Donate</a>
        </div>
    </div>
</div>
    </>
  );
}