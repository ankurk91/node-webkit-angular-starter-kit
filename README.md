# [node-webkit](http://nwjs.io/)-[angular](https://angularjs.org/)-starter-kit


## Target development machine
* Ubuntu 14.04 x64
* node v0.12.7
* npm v2.11.3


### Quick start

```bash

$ git clone https://github.com/ank91/node-webkit-angular-starter-kit.git

$ cd node-webkit-angular-starter-kit

$ sudo npm install -g bower

$ bower install --allow-root

$ sudo npm install -g nw

$ npm install

$ cd app

$ npm install

$ nw

```

## Folder structure
| Folder / File Path                | Description                          |
| ----------------------------- | :------------------------------------|
| app                           | Contains js,css,html for your app, this is where your write your code                        |
| app/node_modules              | Stores node packages to be packed with app                      |
| app/package.json              | File required to run nw.js apps , defines dependencies also , no devDependencies                        |
| bower_components              | Stores your front end dependencies                            |
| cache                         | Used by nw-builder                             |   
| dist                          | Stores minified version of js,css,html. Ready to pack, used by nw-builder                             |   
| node_modules                  | Stores node package for development only                             |   
| release                       | Stores installer for different platforms                             |   
| resources                     | Stores installer related files to used by nw-builder                             |   
| tasks                         | Gulp tasks breakdown                         |   
| tmp                           | Used by nw-builder during packaging                            |   
| package.json                  | Defined devDependencies only, application version , scripts ,etc.                            |   
| version.sh                    | Use this shell script to update app version number to different .json files                             |   


### Packages
* nw.js, Angular JS, Gulp, Bower, nw-Builder
* [Angular UI Modules](https://angular-ui.github.io/)


### Notes for angular js devs
* Use [ng-strict-di](https://docs.angularjs.org/api/ng/directive/ngApp)
* [Angular styleguide](https://github.com/johnpapa/angular-styleguide) 

### TODO
* Gulp task to pack the app for different platforms
* Lots of improvements


***For personal use only***
