const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
/*
  webpack sees every file as a module.
  How to handle those files is up to loaders.
  We only have a single entry point (a .js file) and everything is required from that js file
*/

// This is my JavaScript rule that specifies what to do with .js files
const javascript = {
  test: /\.(js)$/, // see how we match anything that ends in `.js`? Cool
  use: [{
    loader: 'babel-loader',
    options: { presets: ['env'] } // this is one way of passing options
  }],
};

/*
  This is the postCSS loader which gets fed into the next loader. I'm setting it up in it's own variable 
*/

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

// this is  sass/css loader. It handles files that are require('something.scss')
const styles = {
  test: /\.(scss)$/,
  // here pass the options as query params b/c it's short.
  // remember above is used an object for each loader instead of just a string?
  //  don't just pass an array of loaders, we run them through the extract plugin so they can be outputted to their own .css file
  use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
};

// i can also use plugins - this one will compress the crap out of our JS
const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
  compress: { warnings: false }
});

//  putting all together
const config = {
  entry: {
    // i only have 1 entry, but I've set it up for multiple in the future
    App: './public/javascripts/delicious-app.js'
  },
  //  using sourcemaps and here is where i specify which kind of sourcemap to use
  devtool: 'source-map',
  // Once things are done,  kick it out to a file.
  output: {
    // path is a built in node module
    // __dirname is a variable from node that gives us the
    path: path.resolve(__dirname, 'public', 'dist'),
    // we can use "substitutions" in file names like [name] and [hash]
    // name will be `App` because that is what we used above in our entry
    filename: '[name].bundle.js'
  },

  // remember  webpack sees everthing as modules and how different loaders are responsible for different file types? Here is where to implement them. Pass it the rules for my JS and our styles
  module: {
    rules: [javascript, styles]
  },
  // finally  pass it an array of my plugins - uncomment if you want to uglify
  // plugins: [uglify]
  plugins: [
    // here is where to tell it to output the css to a separate file
    new ExtractTextPlugin('style.css'),
  ]
};
// webpack is cranky about some packages using a soon to be deprecated API. 
process.noDeprecation = true;

module.exports = config;
