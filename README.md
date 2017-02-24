## URL Shortener Microservice API
By Brandon Roth

This is a microservice API project for Free Code Camp that accepts a valid URL as a parameter and returns a shortened URL in the JSON response. Visiting the shortened URL redirects to the original URL passed as a parameter.

You can test it at [https://brandonr-shorturl.herokuapp.com/] (https://brandonr-shorturl.herokuapp.com/)

### Creation Usage:

```
https://brandonr-shorturl.herokuapp.com/new/http://www.google.com
```

### Creation Output:

```javascript
{"original_url":"www.google.com","short_url":"https://brandonr-shorturl.herokuapp.com/4188"}
```

### Redirection Usage:

```
https://brandonr-shorturl.herokuapp.com/4188
```

### Redirects to:

```
https://www.google.com
```

### Running this project
Simply launch it with node using `npm run start` or `node server.js`
