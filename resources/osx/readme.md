## Creating .DMG installer for Mac OS X


Using ```appdmg``` which runs only on Mac OS


## Folder structure used by nw-builder

To see all related files and folder, see ```./build/my-application/osx64``` folder

```

├── my-application-installer-tmp/
│   ├── appdmg.json
│   ├── my-application.app
│   │   ├── Contents
│   │   │   ├── Frameworks
│   │   │   ├── MacOS
│   │   │   │  └── nwjs
│   │   │   ├── Resources
│   │   │   │   ├── app.nw
│   │   │   │   └── nw.icns
│   │   │   ├── Info.plist
│   │   │   ├── PkgInfo


```


## TODO
* Install app via installer on Mac
* Automatic [codesign](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/codesign.1.html)
* Apple Mac Store support [procedure](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-(MAS)-Submission-Guideline)

## Online help & tools
* [node-app-dmg](https://github.com/LinusU/node-appdmg)
* [Online icns file generator](https://iconverticons.com/online/)
* [codesign guide](http://blog.erickdransch.com/2012/02/signing-mac-builds/)
* [Info.plist keys](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html)
