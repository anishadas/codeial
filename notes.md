## cookies
- npm i cookie-parser
- we can add a cookie from browser & alter it at server side also
- When a user visits a web page, his/her name can be stored in a cookie. Next time the user visits the page, the cookie "remembers" his/her name.
- Cookies are saved in name-value pairs like:
- When a browser requests a web page from a server, cookies belonging to the page are added to the request. This way the server gets the necessary data to "remember" information about users.
  
## Authentication steps
- create user : sign up
- create session : sign in
- show details of signed in user on screen
- sign out

## Passport js
- Passport is authentication middleware for Node.js.
- `npm install passport`
- `npm install passport-local`
- it uses session cookie to store id - encrypted id
- `npm i express-session`
- `npm i connect-mongo` : to store the session cookie in db

## SASS - Syntactically Awsome Style Sheer
- `npm i node-sass-middleware` : to convert scss to css
- CSS extension language
- css with superpowers
- indented scss

## SCSS -Sassy CSS
- avoid redundant lines of css

## `CSS :`

```
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```
## `SCSS :`

```
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

## `SASS :`
```
nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block

  a
    display: block
    padding: 6px 12px
    text-decoration: none

```

# Flash Messages
- npm install connect-flash
- to display notifications

# Noty JS
- to style our notifications


# uploading a file
- we donot store the file in db,rather we store the path of file in db
- file is stored in bucket (as said by aws)
- server has access to it
- we use input type `file` for file uploads but how server will know- we have another attr: encryption type `multiparts` 
- this indicates it has texts/files/images
## Multer
- Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files

## uploading process
- install multer
- require it in models for user
  - `const multer = require('multer');`
  - `const path = require('path');`
  - `const avatar_path = path.join('/uploads/users/avatars')`
- create a folder uploads --> users --> avatars : here we will store the avatars
- the path should be added in routers otherwise server wont find it to store the avatar
  - `app.use('/uploads',express.static(__dirname + "/uploads"))`
- In model for users, we will create a new props for storing the avatar path
- Add the multer to store the file in disk

```
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // __dirname: current path
        cb(null, path.join(__dirname,"..",avatar_path))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
  
```
- Also add some static methods in model to make the avatar path publicly available
  - `userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');`
  - `userSchema.statics.avatarPath = avatar_path;`
- In views --> user.ejs: set the `entype : multipart/form data`, now the form data will be handled by multer
- add input type file
- user controller--> update function: 
  - get the user
  - make the changes
  - update it


# POSTMAN
- Postman is an API(application programming interface) development tool which helps to build, test and modify APIs.
- It has the ability to make various types of HTTP requests(GET, POST, PUT, PATCH), saving environments for later use

# jWT
- JSON Web Token is an open industry standard used to share information between two entities, usually a client (like your app’s frontend) and a server (your app’s backend).
- They contain JSON objects which have the information that needs to be shared.
- You may be wondering why the auth server can’t just send the information as a plain JSON object and why it needs to convert it into a “token”?
  - Due to this security issue, the auth server needs to transmit this information in a way that can be verified by the client application, and this is where the concept of a “token” comes into the picture.
  - To put it simply, a token is a string that contains some information that can be verified securely.
- A JWT contains three parts:
  - `Header`: Consists of two parts:
    - The signing algorithm that’s being used.
    - The type of token, which, in this case, is mostly “JWT”.
  - `Payload`: The payload contains the claims or the JSON object.
  - `Signature`: A string that is generated via a cryptographic algorithm that can be used to verify the integrity of the JSON payload.

![img](https://supertokens.com/static/b0172cabbcd583dd4ed222bdb83fc51a/9af93/jwt-structure.png)

- npm i passport-jwt
- npm i jsonwebtoken