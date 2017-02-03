# [node-webkit](http://nwjs.io/)-[Angular](https://angularjs.org/)-starter-kit 

[![Build Status](https://travis-ci.org/ankurk91/node-webkit-angular-starter-kit.svg?branch=master)](https://travis-ci.org/ankurk91/node-webkit-angular-starter-kit)
[![Build status](https://ci.appveyor.com/api/projects/status/7o3pxkhxb1ahm9gt?svg=true)](https://ci.appveyor.com/project/ankurk91/node-webkit-angular-starter-kit)

> This repository tries to cover organizing, building and packaging nw.js desktop apps, not restricted to Angular JS


### Target development machine
* Ubuntu 16.04 x64 or Similar
* [node](https://github.com/nodejs/node) (see package.json for version)
* [npm](https://github.com/npm/npm) 
* [nw.js](https://github.com/nwjs/nw.js) (global)
* [gulp-cli](https://github.com/gulpjs/gulp-cli) (global)


### Quick start

```shell

# Clone this repo
git clone https://github.com/ankurk91/node-webkit-angular-starter-kit.git

cd node-webkit-angular-starter-kit

# Install nw.js global package if not yet
npm install -g nw@0.14.6

# Install node packages
npm install 

# Start the app from source
nw app

```


### Folder structure
| Folder / File Path                | Description                          |
| -----------------------------     | :------------------------------------|
| app/                              | Contains js, css, html for your app, this is where your write your angular code                        |
| app/node_modules/                 | Stores node packages to be packed with app, should not contain any devDependency                      |
| [app/package.json](app/package.json)   | JSON file required to run nw.js apps , defines dependencies only , no devDependencies should be defined here                        |
| cache/                         | Used by nw-builder for caching nw sdk for different platforms, ignored by git                            |
| dist/                          | Stores minified version of js,css,html. Ready to pack, to be used by nw-builder , created by gulp task , ignored by git                           |
| node_modules/                  | Stores node package for development (devDependencies) only                             |
| release/                       | Stores installer for different platforms , can be pushed to git                             |   
| resources/                     | Stores installer related files to be used by nw-builder                             |
| tasks/                         | Gulp tasks breakdown                         |   
| tmp/                           | Used by nw-builder during packaging, ignored by git                          |
| [package.json](package.json)              | Defined devDependencies only, application version , npm scripts etc.                            |
   

### ./package.json changes

| Property                          | Description                          |
| -----------------------------     | :------------------------------------|
| productName                       | Used by gulp task, this can have spaces, capital letters, separate from ```name``` property                        |
| optionalDependencies              | We kept ```appdmg``` here , because it runs only on Mac OS , so npm will not produce error installing it |
| version                           | We use this version number in gulp tasks, should be same as in ```app/package.json```|


### ./app/package.json changes

| Property                          | Description                          |
| -----------------------------     | :------------------------------------|
| version                           | Should be same as in ```./package.json``` |
| platformOverrides                 | Used by nw-builder to override any ```./package.json``` property while building |
| packages                          | Used by node-webkit-updater to check for updates |
| manifestUrl                       | Used by  node-webkit-updater, URL to your application's ```package.json``` file, it should be public |
| chromium-args                     | Chromium command line [parameters](https://github.com/nwjs/nw.js/wiki/manifest-format#chromium-args) you want to pass to nw.js|



#### Node Webkit related links
* [nw.js](https://github.com/nwjs/nw.js)
* [nw-builder](https://github.com/nwjs/nw-builder) 
* [node-webkit-updater](https://github.com/edjafarov/node-webkit-updater)
* [nw-notify](https://github.com/cgrossde/nw-notify)
* [Remote Debugging](https://github.com/nwjs/nw.js/wiki/Debugging-with-devtools#remote-debugging)


#### Read more about packaging nw.js app
* [Packaging for Linux](resources/linux/readme.md)
* [Packaging for Mac OS](resources/osx/readme.md)
* [Packaging for Windows](resources/windows/readme.md)


##### Install node-js 
* [Ubuntu/Mac](https://github.com/creationix/nvm)
* [Windows](https://nodejs.org/en/download/)


#### TODO
* Remove [orphan](https://docs.npmjs.com/cli/prune) modules from ```app\node_modules``` before packing
* Integrate [node-webkit-updater](https://github.com/edjafarov/node-webkit-updater)
* Integrate [nw-notify](https://github.com/cgrossde/nw-notify)
* Integrate [browser-Sync](http://www.browsersync.io/)
* Lots of improvements


#### License
MIT [License](LICENSE.txt)
