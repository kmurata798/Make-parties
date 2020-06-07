// Initialize express
const express = require('express')
const methodOverride = require('method-override')
const app = express()
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const models = require('./db/models');
var exphbs = require('express-handlebars');

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));
// Use the MethodOverride I imported to change POST requests to PUT requests
app.use(methodOverride('_method'))
// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');


// OUR MOCK ARRAY OF PROJECTS
var events = [
  { title: "Courage needs help", desc: "A great event that is super fun to look at and good", imgUrl: "https://charitypaws.com/wp-content/uploads/2018/12/courage-cowardly-dog.jpg" },
  { title: "Bear watching", desc: "A great event that is super fun to look at and good", imgUrl: "https://lh3.googleusercontent.com/proxy/R2V0YQIJ4E-bGGxZvqcsI0yIH-lvhDp-sRhKda0OySG_xXTuX6LDG7oLjaWOsMj5SPyF-W-2P94C0iKofmNAWiO3nh1BvTKAGi0IBFfROt9DteRopFAyUDB7" },
  { title: "Dog Day", desc: "A great event that is super fun to look at and good", imgUrl: "https://consequenceofsound.net/wp-content/uploads/2015/03/shiloh.jpg?w=806" }
]

// Render the "home" layout for the main page and send the following msg
app.get('/test', (req, res) => {
    res.render('home', { msg: 'Handlebars are Cool!' });
})

// Index
app.get('/', (req, res) => {
  models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
    res.render('events-index', { events: events });
  })
})

// NEW
app.get('/events/new', (req, res) => {
  res.render('events-new', {});
})

// CREATE
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    // Redirect to events/:id
    res.redirect(`/events/${event.id}`)

  }).catch((err) => {
    console.log(err)
  });
})

// SHOW
app.get('/events/:id', (req, res) => {
  // Search for the event by its id that was passed in via req.params
  models.Event.findByPk(req.params.id).then((event) => {
    // If the id is for a valid event, show it
    res.render('events-show', { event: event })
  }).catch((err) => {
    // if they id was for an event not in our db, log an error
    console.log(err.message);
  })
})

// EDIT
app.get('/events/:id/edit', (req, res) => {
  models.Event.findByPk(req.params.id).then((event) => {
    res.render('events-edit', { event: event });
  }).catch((err) => {
    console.log(err.message);
  })
});

// UPDATE after editting
app.put('/events/:id', (req, res) => {
  models.Event.findByPk(req.params.id).then(event => {
    event.update(req.body).then(event => {
      res.redirect(`/events/${req.params.id}`);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})