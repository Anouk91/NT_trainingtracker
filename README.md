# trainingtrackr

> A vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

Followed the guidance Erisu at https://medium.com/the-web-tub/creating-your-first-vue-js-pwa-project-22f7c552fb34 
and Didin djamware.com/post/5a1b779f80aca75eadc12d6e/mongo-express-vue-nodejs-mevn-stack-crud-web-application 


  

Mongo DB server install
https://docs.mongodb.com/v4.0/tutorial/install-mongodb-on-os-x/
    brew tap mongodb/brew
    brew install mongodb-community@4.2
    brew services start mongodb-community

accessing REST API of Express
    npm install axios --save

Vanwege error has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    npm install cors


Omdat ik geen build heb gemaakt werken deze 2 commando's niet in package.json
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "nom run build && node ./bin/www",

  // new CleanWebpackPlugin(['dist']),
Dit in de webpack.config.js geeft een TypeError: CleanWebpackPlugin is not a constructor. Dus heb hem uitgecommend.
Maar de functionaliteit is dus ook verloren: CleanWebpackPlugin plugin is used to delete the dist directory before each build, to remove old and unused files. You can see this option on line 55 of the sample configuration file/.

