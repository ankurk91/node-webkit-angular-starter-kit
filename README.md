# [node-webkit](http://nwjs.io/)-[angular](https://angularjs.org/)-starter-kit


## Target development machine
* Ubuntu 14.04 x64
* node 0.12.7
* npm 3.3.3
* nw.js 0.12.3


### Quick start

```bash

$ git clone https://github.com/ank91/node-webkit-angular-starter-kit.git

$ cd node-webkit-angular-starter-kit

$ sudo npm install -g bower

$ bower install 

$ sudo npm install -g nw

$ npm install

$ cd app

$ npm install

$ nw

```


### Check for node_modules updates

```bash

$ sudo npm install -g npm-check

$ cd /path/to/this-project

$ npm-check


```

## Folder structure
| Folder / File Path                | Description                          |
| -----------------------------     | :------------------------------------|
| app/                              | Contains js,css,html for your app, this is where your write your angular code                        |
| app/node_modules/                 | Stores node packages to be packed with app                      |
| app/package.json               | JSON file required to run nw.js apps , defines dependencies only , no devDependencies should be defined here                        |
| bower_components/              | Stores your front end dependencies (vendors)                           |
| cache/                         | Used by nw-builder for caching nw sdk for different platforms                            |
| dist/                          | Stores minified version of js,css,html. Ready to pack, to be used by nw-builder , created by gulp task                            |
| node_modules/                  | Stores node package for development (devDependencies) only                             |
| release/                       | Stores installer for different platforms                             |   
| resources/                     | Stores installer related files to be used by nw-builder                             |
| tasks/                         | Gulp tasks breakdown                         |   
| tmp/                           | Used by nw-builder during packaging                          |
| package.json                   | Defined devDependencies only, application version , npm scripts etc.                            |
| version.sh                     | Use this shell script to update app version number to different .json files                             |   


### Packages
* nw.js, Angular JS, Gulp, Bower, nw-Builder
* [Angular UI Modules](https://angular-ui.github.io/)


### Notes for Angular JS devs
* Use [ng-strict-di](https://docs.angularjs.org/api/ng/directive/ngApp)
* [Angular style guide](https://github.com/johnpapa/angular-styleguide)

### TODO
* Angular sample app using best practices
* Test build and pack gulp tasks
* Remove [prune](https://docs.npmjs.com/cli/prune) modules from ```app\node_modules``` before packing
* Remove unwanted files from ```app\node_modules``` using [modclean](https://www.npmjs.com/package/modclean) before packing
* Lots of improvements


***For personal use only***
