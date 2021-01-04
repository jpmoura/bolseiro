const ghPages = require('gh-pages');

ghPages.publish('build', function (err) {
  if (err) {
    console.log('Could not deploy on GitHub Pages. Error: ', error);
  }

  console.log('Publish process finished');
});
