// Initialize express
const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// Render the "home" layout for the main page and send the following msg
app.get('/test', (req, res) => {
    res.render('home', { msg: 'Handlebars are Cool!' });
})

// OUR MOCK ARRAY OF PROJECTS
var events = [
  { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://charitypaws.com/wp-content/uploads/2018/12/courage-cowardly-dog.jpg" },
  { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://lh3.googleusercontent.com/proxy/R2V0YQIJ4E-bGGxZvqcsI0yIH-lvhDp-sRhKda0OySG_xXTuX6LDG7oLjaWOsMj5SPyF-W-2P94C0iKofmNAWiO3nh1BvTKAGi0IBFfROt9DteRopFAyUDB7" },
  { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://consequenceofsound.net/wp-content/uploads/2015/03/shiloh.jpg?w=806" }
]

// INDEX
app.get('/', (req, res) => {
  res.render('events-index', { events: events });
})

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})