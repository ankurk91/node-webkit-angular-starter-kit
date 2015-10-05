## Creating .DMG installer for Mac OS X


## Notes
*  ```appdmg``` runs only on Mac OS


## Folder structure

```

├── my-application-installer/
│   ├── appdmg.json
│   ├── my-application.app
│   │   ├── Contents
│   │   │   ├── MacOS
│   │   │   │  └── my-application
│   │   │   ├── Info.plist
│   │   │   ├── Resources
│   │   │   │   └── app-icon.icns

```

## TODO
* Create an installer and test it on Mac
* Automatic [codesign](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/codesign.1.html)
* Apple Mac Store support procedure

## Online help & tools
* [node-app-dmg](https://github.com/LinusU/node-appdmg)
* [Online icns file generator](https://iconverticons.com/online/)
* [codesign guide](http://blog.erickdransch.com/2012/02/signing-mac-builds/)
