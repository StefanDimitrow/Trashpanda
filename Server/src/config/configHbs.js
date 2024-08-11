const path = require('path');
const handlebars = require('express-handlebars');

function configHbs(app) {
  // Create an instance of express-handlebars with custom configuration
  const hbs = handlebars.create({
    extname: 'hbs', // The file extension for Handlebars files
    defaultLayout: 'main', // The default layout to be used
    layoutsDir: path.join(__dirname, '../views/layouts'), // Path to layouts
    partialsDir: path.join(__dirname, '../views/partials') // Path to partials (optional)
  });

  // Register the Handlebars view engine
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');

  // Optionally, set the views directory
  app.set('views', path.join(__dirname, '../views'));
}

module.exports = { configHbs };
