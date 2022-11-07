const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const clog = require('./middleware/clog');
const sequelize = require('./config/connection');
const routes = require('./controllers');  // all routes get intercepted there

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('hbs', exphbs( // give the handlebars engine a name
  { 
    defaultLayout: 'main',   // set the default layout ot be main.hbs
    extname: '.hbs',         // set the extensions to end in hbs instead of handlebars
  }
));

app.set('view engine', 'hbs'); // set the view engine to be hbs


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(clog);

app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, ()=>{
    console.log(`Server has started... Listening on http://localhost:${PORT}/`);
    console.log('Time:', Intl.DateTimeFormat('en-US',{dateStyle: 'long', timeStyle: 'long'}).format(new Date()));
  })
});
