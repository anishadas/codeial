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