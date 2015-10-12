# [node-webkit](http://nwjs.io/)-[angular](https://angularjs.org/)-starter-kit 

[![Dependency Status](https://www.versioneye.com/user/projects/5603e34ff5f2eb00170007a5/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5603e34ff5f2eb00170007a5)
[![Build Status](https://travis-ci.org/ank91/node-webkit-angular-starter-kit.svg?branch=master)](https://travis-ci.org/ank91/node-webkit-angular-starter-kit)
[![Build status](https://ci.appveyor.com/api/projects/status/n87gdk3b2g1mj4oa/branch/master?svg=true)](https://ci.appveyor.com/project/ank91/node-webkit-angular-starter-kit/branch/master)

> This repository tries to cover organizing, building and packaging nw.js desktop apps, not restricted to Angular JS


## Target development machine
* Ubuntu 14.04 x64
* node 0.12.7
* npm 3.3.5
* nw.js 0.12.3


### Quick start

```bash

$ git clone https://github.com/ank91/node-webkit-angular-starter-kit.git

$ cd node-webkit-angular-starter-kit

$ sudo npm install -g bower

$ bower install

$ sudo npm install -g nw

$ npm install --dev

$ nw app

```

### Check for node_modules updates 

```bash

$ sudo npm install -g npm-check

$ cd /path/to/this-project

$ npm-check -u


```

## Folder structure
| Folder / File Path                | Description                          |
| -----------------------------     | :------------------------------------|
| app/                              | Contains js, css, html for your app, this is where your write your angular code                        |
| app/node_modules/                 | Stores node packages to be packed with app, should not contain any devDependency                      |
| [app/package.json](app/package.json)   | JSON file required to run nw.js apps , defines dependencies only , no devDependencies should be defined here                        |
| app/bower_components/                  | Stores your front end dependencies (vendors)                           |
| cache/                         | Used by nw-builder for caching nw sdk for different platforms, ignored by git                            |
| dist/                          | Stores minified version of js,css,html. Ready to pack, to be used by nw-builder , created by gulp task , ignored by git                           |
| node_modules/                  | Stores node package for development (devDependencies) only                             |
| release/                       | Stores installer for different platforms , can be pushed to git                             |   
| resources/                     | Stores installer related files to be used by nw-builder                             |
| tasks/                         | Gulp tasks breakdown                         |   
| tmp/                           | Used by nw-builder during packaging, ignored by git                          |
| [package.json](package.json)              | Defined devDependencies only, application version , npm scripts etc.                            |
| [version.sh](version.sh)                  | Use this shell script to update app version number to different .json files                             |   

### ./package.json changes

| Property                | Description                          |
| -----------------------------     | :------------------------------------|
| productName                       | Used by gulp task, this can have spaces, capital letters, separate from ```name``` property                        |
| optionalDependencies              | We kept ```appdmg``` here , because it runs only on Mac OS , so npm will not produce error installing it |
| version                           | We use this version number in gulp tasks, should be same as in ```app/package.json```|


### ./app/package.json changes

| Property                | Description                          |
| -----------------------------     | :------------------------------------|
| version                           | Should be same as in ```./package.json``` |
| platformOverrides                 | Used by nw-builder to override any ```./package.json``` property while building |
| packages                          | Used by node-webkit-updater to check for updates |
| manifestUrl                       | Used by  node-webkit-updater, URL to your application's ```package.json``` file, it should be public |
| chromium-args                     | Chromium command line [parameters](https://github.com/nwjs/nw.js/wiki/manifest-format#chromium-args) you want to pass to nw.js|



### Node Webkit related links
* [nw.js](https://github.com/nwjs/nw.js)
* [nw-builder](https://github.com/nwjs/nw-builder) 
* [node-webkit-updater](https://github.com/edjafarov/node-webkit-updater)
* [nw-notify](https://github.com/cgrossde/nw-notify)
* [Remote Debugging](https://github.com/nwjs/nw.js/wiki/Debugging-with-devtools#remote-debugging)


### Helper tools' links
* [Gulp](https://github.com/gulpjs/gulp/)
* [Bower](http://bower.io)
* [JSHint](https://github.com/jshint/jshint)
* [ESLint](https://github.com/eslint/eslint)
* [CSSLint](https://github.com/CSSLint/csslint)
* [HTMLLint](https://github.com/htmllint/htmllint)


### Links for Angular JS devs
* [Angular style guide](https://github.com/johnpapa/angular-styleguide)
* [Angular UI Modules](https://angular-ui.github.io/)
* [ng-annotate](https://github.com/Kagami/gulp-ng-annotate)
* [eslint-plugin-angular](https://github.com/Gillespie59/eslint-plugin-angular)


### Read more about packaging nw.js app
* [Packaging for Linux](resources/linux/readme.md)
* [Packaging for Mac OS](resources/osx/readme.md)
* [Packaging for Windows](resources/windows/readme.md)

### TODO
* Remove [prune](https://docs.npmjs.com/cli/prune) modules from ```app\node_modules``` before packing
* Remove unwanted files from ```app\node_modules``` using [modclean](https://www.npmjs.com/package/modclean) before packing
* Integrate [node-webkit-updater](https://github.com/edjafarov/node-webkit-updater)
* Integrate [nw-notify](https://github.com/cgrossde/nw-notify)
* Gulp task to update version in different json files
* Lots of improvements


License
-------

MIT [License](LICENSE.txt)
