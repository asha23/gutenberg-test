/*
 * @title Webpack Config
 */

// Dependencies
import webpack from 'webpack';

// Config
import { paths } from "./gulpfile.babel.js/config";

const modernizr = {
  'feature-detects': [
    "a/download",
    "applicationcache",
    "blob",
    "canvas",
    "canvas/blending",
    "canvas/todataurl",
    "canvas/winding",
    "canvastext",
    "contenteditable",
    "contextmenu",
    "cookies",
    "cors",
    "css/all",
    "dom/classlist",
    "dom/createElement-attrs",
    "dom/dataset",
    "dom/documentfragment",
    "dom/hidden",
    "dom/intersection-observer",
    "dom/microdata",
    "dom/mutationObserver",
    "dom/passiveeventlisteners",
    "elem/bdi",
    "elem/datalist",
    "elem/details",
    "elem/output",
    "elem/picture",
    "elem/progress-meter",
    "elem/ruby",
    "elem/template",
    "elem/time",
    "elem/track",
    "elem/unknown",
    "emoji",
    "es5/array",
    "es5/date",
    "es5/function",
    "es5/object",
    "es5/specification",
    "es5/strictmode",
    "es5/string",
    "es5/syntax",
    "es5/undefined",
    "es6/array",
    "es6/arrow",
    "es6/collections",
    "es6/contains",
    "es6/generators",
    "es6/math",
    "es6/number",
    "es6/object",
    "es6/promises",
    "es6/string",
    "event/deviceorientation-motion",
    "event/oninput",
    "eventlistener",
    "exif-orientation",
    "file/api",
    "file/filesystem",
    "flash",
    "forcetouch",
    "forms/capture",
    "forms/fileinput",
    "forms/fileinputdirectory",
    "forms/formattribute",
    "forms/inputnumber-l10n",
    "forms/placeholder",
    "forms/requestautocomplete",
    "forms/validation",
    "fullscreen-api",
    "geolocation",
    "history",
    "htmlimports",
    "ie8compat",
    "indexeddb",
    "indexeddbblob",
    "input",
    "input/formaction",
    "input/formenctype",
    "input/formmethod",
    "input/formnovalidate",
    "input/formtarget",
    "inputsearchevent",
    "inputtypes",
    "intl",
    "json",
    "ligatures",
    "lists-reversed",
    "mathml",
    "mediaquery/hovermq",
    "mediaquery/pointermq",
    "media-source-extension-api",
    "messagechannel",
    "notification",
    "performance",
    "pointerevents",
    "pointerlock-api",
    "postmessage",
    "queryselector",
    "quota-management-api",
    "requestanimationframe",
    "script/async",
    "script/defer",
    "style/scoped",
    "svg",
    "svg/asimg",
    "svg/clippaths",
    "svg/filters",
    "svg/foreignobject",
    "svg/inline",
    "svg/smil",
    "touchevents",
    "userdata",
    "video",
    "video/autoplay",
    "video/crossorigin",
    "video/loop",
    "video/preload",
    "web-intents",
    "webanimations",
    "webauthn/publickeycredential",
    "webgl",
    "webgl/extensions",
    "webrtc/datachannel",
    "webrtc/getusermedia",
    "webrtc/peerconnection",
    "websockets/binary",
    "window/atob-btoa",
    "window/framed",
    "window/matchmedia",
    "xdomainrequest"
  ]
}

// Plugins
var WebpackNotifierPlugin = require('webpack-notifier');
var ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

const webpackConfig = {

  // externals: {
  //     "jquery": "jQuery",
  //     "createjs": "createjs"
  // },
  mode: process.env.NODE_ENV ? "production" : "development",

  entry: {
    app: paths.scripts.src
  },
  output: {
    filename: "[name].js"
  },
  performance: {
    hints: false
  },
 

  optimization: {
    splitChunks: {
      minSize: 30000,
      maxSize: 0,
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },

  resolve: {
      alias: {
        createjs: 'createjs/builds/1.0.0/createjs.js'
      }
  },

  module: {
    rules: [
      {
        test: /^(?!.*\.{test,min}\.js$).*\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.s?css$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000',
      },
      {
        test: /node_modules[/\\]createjs/,
        loaders: [
          'imports-loader?this=>window',
          'exports-loader?window.createjs'
        ]
      },




    ]
  },


  plugins: [
    // new ModernizrWebpackPlugin(modernizr),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    }),
    new WebpackNotifierPlugin({
      skipFirstNotification: true
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  //console.log('Welcome to production');
  webpackConfig.devtool = 'source-map';
}
if (process.env.NODE_ENV === 'development') {
  //console.log('Welcome to development');
  webpackConfig.devtool = 'source-map';
}

module.exports = webpackConfig;
