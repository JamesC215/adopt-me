# 4Paws Adoption Site
## Description

As a cohort of General Assembly SEI-73, we were given the task of creating a web application using the MERN Stack and deploying it through Heroku. 

The requirements of this app were that it should have full CRUD functionality using the MERN (MongoDB, Express, React and Node.js) application stack and also that we had to implement authorisation to protect certain routes in the project.

I wanted to create an "Adoption Page", to be able to view pets that are up for adoption and to implement a donation page feature, so people can make donations to the dogs.

I also wanted users to be able to log in so that they can use the features of the application.

I have a passion for animals, but I also wanted to create somewhat of an e-commerce site and this ticked both of those boxes.

## Deployment link
See below the link to my application that is hosted on Heroku.

[4Paws Page](https://four-paws-272049e05d27.herokuapp.com/)

## Getting Started/Code Installation

You can access the app and use the features with the link above.

However, you can fork and clone this repo if you want to take a deeper look into the code.

You can also access the files through GitHub in my repository.

## Timeframe & Working Team (Solo/Pair/Group)

We were asked to work individually on this project and given five days on Project Week to complete the assigned task.

## Technologies Used

**Back End**
- MongoDB & Mongoose - database usage for the application
- Express - communicating with React to render information on the client side
- Node.js - running the app outside the browser and installing relevant packages

**Front End**
- React - client side rendering of components
- EJS - embedded JavaScript into the HTML
- CSS - for styling the application
- Tailwind.css - additional styling for the application
- HTML - to display information on pages

**Development Tools**
- VS Code - to write code and add features
- Chrome Dev Tools - to debug and help figure out routes, cookies etc.
- Google Developers Console - for Authentication and API usage
- Terminal/Command Line - creation of folders/files and downloading of packages needed for the project


## Brief

See below the brief given to me by my instructional team:

Your App Must:

Technical Requirements

☐ A working full-stack, single-page application hosted on Heroku.

☐ Incorporate the technologies of the MERN-stack:

MongoDB/Mongoose
Express
React
Node

☐ Have a well-styled interactive front-end.

☐ Communicates with the Express backend via AJAX.

☐ Implement token-based authentication. Including the ability of a user to sign-up, log in & log out.

☐ Implement authorization by restricting CUD data functionality to authenticated users. Also, navigation should respond to the login status of the user.

☐ Have a well-scoped feature-set. Full-CRUD data operations are not required if one or more other features are included, for example:

Consume data from a third-party API.
Implement additional functionality if the user is an admin.
Implementation of a highly dynamic UI or data visualization.
Other, instructor approved, complexity/features.


## Planning

For the majority of the planning stage, I used a Trello Board with all of the instructions/information I would need to create the project, including Wireframes  and an ERD to guide me through the MVC stage of my project.

### Find below a screenshot of an example of one of my wireframes:
To create my wireframes, I used [Lucid.com](https://www.lucidchart.com/pages/).

<img width="548" alt="Screenshot 2023-08-25 at 16 17 10" src="https://github.com/JamesC215/adopt-me/assets/136309778/ef5074be-20b9-4d15-957d-41af6c94ce66">

### See below a screenshot of my Trello Board:
To create this, I used [Trello.com](https://trello.com/).

Here is a link to my planning page: [Trello - 4Paws](https://trello.com/b/WIdGEXq2/sei-project-4-pet-adoption).

<img width="1427" alt="Screenshot 2023-07-20 at 11 25 34" src="https://github.com/JamesC215/RESTful-Routes/assets/136309778/f2914ed0-730f-4cec-91c1-802aa81e517d">


### Please see a screenshot of my ERD below:
To create my ERD, I used [Lucid.com](https://www.lucidchart.com/pages/).

<img width="679" alt="Screenshot 2023-09-04 at 03 35 29" src="https://github.com/JamesC215/adopt-me/assets/136309778/27bbf7d8-4638-46ec-b66e-281b6e66b985">

## Build/Code Process

To begin my build, I started by creating a React app using ``` npx create-react-app ```.

I then installed all of the relevant packages I would need by running the command npm (Node Package Manager) to install what I needed, such as Mongoose, Google OAuth and Method_Override.

Upon completion of installing the relevant packages, I initialised my database through a .env file, and passed it into a config folder that included a database file.

After doing these steps, I created a few basic components, including a NavBar to help with navigation around the website.

We had also previously created a basic foundation for Login/Signup and Logout functionality in our lessons with General Assembly, so I implemented all of this functionality into the application, too.

### At this stage, this is what my app looked like: 

<img width="1114" alt="Screenshot 2023-09-01 at 13 53 05" src="https://github.com/JamesC215/adopt-me/assets/136309778/06410346-7ef2-4a39-9e81-9a28e0594499">

Then, I moved onto adding features to my app, of which the creating a component to render a list of the dogs that I would like to show on the website came first:

Alongside my dog.js model, this allowed me to add these to my Mongo database, and thus I was able to render the dogs individually as components into my web application.

```
const dogs = Dog.create([
    {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuEZT6AXoakxCOiAeakMNPanLJjPbGnHMVsA&usqp=CAU",
    age: 8,
    name: "Zeus",
    description: "I am a German Shepherd"
  },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt89nu5HcX65UCAUlQG6ZRP6UDiqelNSnTJg&usqp=CAU",
      age: 5,
      name: "Freddie",
      description: "I am a Pug"
    }]);
```
<img width="1152" alt="Screenshot 2023-09-01 at 13 53 40" src="https://github.com/JamesC215/adopt-me/assets/136309778/e54669a5-4913-4e4b-8fbb-58e4dbef105f">

I then wanted to implement a donation page, allowing users to add donation items or money and donate said items/money.

See below a list of my controller functions allowing me to include this functionality:

```
async function cart(req, res) {
  const cart = await Donation.getCart(req.user._id);
  res.json(cart);
}

async function addToCart(req, res) {
  const cart = await Donation.getCart(req.user._id);
  await cart.addItemToCart(req.params.id);
  res.json(cart);
}

async function setItemQtyInCart(req, res) {
  const cart = await Donation.getCart(req.user._id);
  await cart.setItemQty(req.body.itemId, req.body.newQty);
  res.json(cart);
}

async function checkout(req, res) {
  const cart = await Donation.getCart(req.user._id);
  cart.isPaid = true;
  await cart.save();
  res.json(cart);

}
```
The Payment function below allowed me to implement Stripe into my Project, thus allowing users to "pay" for items that they would like to donate.

```
export default function Payment(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('')
    useEffect(() => {
        fetch("/config").then(async (r) => {
            const {publishableKey} = await r.json();

            setStripePromise(loadStripe(publishableKey));
        });
    }, []);
    useEffect(() => {
        fetch("/create-payment-intent", {
          method: "POST",
          body: JSON.stringify({}),
        }).then(async (result) => {
          let { clientSecret } = await result.json();
          setClientSecret(clientSecret);
        });
      }, []);
```


With all of these methods, I had my MVP.

I then went on to styling through CSS and Tailwind, but I did not get as much done as I had hoped.

## Challenges

One of my main challenges in using the MERN Stack is with React components. I have struggled since I started learning React to understand how props are passed down into the components, and although I got to grips with it a bit better towards the end of the project, it is still a big part of React that I need to learn more about.

CSS was another big challenge for me, and it seems to be a common theme when working on all of my projects. I guess it will just take a lot more practice to get better at it.

## Wins

Implementing Stripe into my Project was a big win, as I had not previously implemented a third party API before, and I read numerous different documents and watched tutorials to be able to add this functionality into my application.

## Key Learnings/Takeaways

Passing props into different components was quite a tricky part of using React,

I know now I need to be a bit more proactive when I am coding, as I get stuck on one section for a long while, whereas I find I should leave it alone and go and do other things to refresh myself and hopefully find a solution when I return to the problem.

## Bugs

There are currently no known bugs that I am aware of.

## Future Improvements

Upon completion of the project, I had several things I wanted to implement but I either did not have the time or the technical ability to do so.

These include:
- Adding a SuperUser that can add new Dog Profiles
- Edit/Deletion of Dog Profiles
- Media queries for phones, tablets, smaller screens etc.
- To make the website look more professional, using both CSS and Tailwind.
