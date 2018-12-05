# Async Redux

## Setup

Install `nodemon` globally if you haven't already.

```
npm install
npm run server
npm run client
```

## Redux cannot handle Async!

Redux is by nature synchronous -- your state change cannot be pending anything.

So, without some help, your dispatch has to be AFTER the async stuff happens. For now, we will be making our Axios requests from our components. 

```
//In a click handler
axios.get('/colors').then( (response) => {
    this.props.dispatch({
      type: 'SET_COLORS',
      payload: response.data
    })
}) 
```

Eventually, we will be able to handle async in a better way, but for now, start with this.

## Base Requirements

Use the code provided as a starting point.

- Implement a Get, and Post for colors. Look in App.js!
- Implement **Delete all colors**
- Send the count from your counter in your post request along with the color


## Stretch

- Move colors into a database
- Add an update for the count and text
- Add a delete a specific item from your server.
- Style the background of the `<li>` as the color. You can assume the colors provided are valid CSS colors.