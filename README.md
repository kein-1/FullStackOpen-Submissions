# FullStack-Open
Full Stack Open Course and Submissions

The course focuses on modern web development technology stacks. 

Note: I stopped the course around November to work on my E-commerce full-stack project. I am on part 6 of this course and would love to hop back on and complete it. 
As of early December, I completed my full-stack project so I can hop back onto this soon 

#### Part 1: Intro to React. Utilizes modern React Hooks. part1 assignment utilizes useState  

#### Part 2: Server side. Utilizes forms, controlled components, useEffect. Build a full-stack app using React, Express, Node, and MongoDB. Also utilizes Postman/VS Code Rest Client to test backend functionality.  

#### Part 3: Basically setup a full-stack app in phonebook. Utilized React, Node.js, Express, and MongoDB. Built routes/paths with Express. Built database schemas and models with Mongoose in MongoDB.  
Utilized the following packages:  
- dotenv - used to save environment variables (port, database url, api keys etc)   
- morgan - for logging backend requests   
- mongoose - a better way to use MongoDB     
- cors - used for connecting front-end and back-end since they are in separate ports  
- nodemon - used so we do not have to manually restart server each time  

#### Part 4: Backend testing, user administration, and user authentication/authorization
Built the backend for a Blog app. The backend utilizes MongoDB/Mongoose for the database, Express for 
the server logic, and Node.js as the backend language. Bycrpt package is used to encrpyt the passwords saved in the database

- The app utilizes Express routers create mini apps to handle create user requests new blogs, and login requests. 
- The app utilizes JWT (json web token) for user authorization. The token is generated once the user is authenticated (through a mock log-in request VIA Postman. Post request to this link requires a correct username and password. The method utilizes Mongoose queries to check the database for the user and uses bcrypt.compare to check if the password provided matches the hashed password that is stored in the database)

Utilized the following new packages:
- bcrypt - hashes the password and stores that hashed password into the database. 
- jwt - json webtoken utilized for authorization 
     
#### Part 5: React testing, front-end integration
Built the frontend for our blog app. I decided to incorporate Tailwind CSS for this project as an opportunity to both learn and use Tailwind to style my project   

- Deployed the full blog project on to Render.com. I deployed both the front-end, which is this part, and the backend, which is from part 4. Also deployed my .env variables to render  

https://blog-mv4w.onrender.com/
[Blog site](https://blog-mv4w.onrender.com/)


