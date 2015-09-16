## Creating a .deb installer for Ubuntu OS


We wil use ```dpkg-deb``` , an handy tool comes pre-installed on ubuntu.

Lets organize your files and folder first. See the tree below.


## Folder structure

Our application will be installed in /opt folder. [Why ?](http://www.tldp.org/LDP/Linux-Filesystem-Hierarchy/html/opt.html)

```
├── my-application-installer/
│   ├── DEBIAN
│   │   ├── control
│   ├── usr
│   │   ├── share
│   │   │   ├── applications
│   │   │   │   ├── my-application.desktop
│   ├── opt
│   │   ├── my-application
│   │   │   ├── locales
│ │   │   │   ├── en-US.pak
│ │   │   │   ├── en-GB.pak
│   │   │   ├── icon.png
│   │   │   ├── icudtl.dat
│   │   │   ├── my-application
│   │   │   ├── libffmpegsumo.so
│   │   │   ├── nw.pak
```

Make sure all sub directories of 'my-application-installer' have file permission 0755

## Required files
* DEBIAN/control 


## Command to create installer

```bash

$ fakeroot dpkg-deb -Zxz --build /path/to/my-application-installer my-installer-v1.deb


```

## Installing the app via command line

```bash

$ sudo dpkg --install /path/to/my-installer-v1.deb

```

## Uninstalling app via command line

```bash

$ sudo dpkg --purge my-application

```

## TODO
* Write a gulp to automate this process
* Installing application to /usr/bin 
* Create rpm package using [fpm](https://github.com/jordansissel/fpm)



## Online manuals and help

* [Creating debian binary packages](http://tldp.org/HOWTO/html_single/Debian-Binary-Package-Building-HOWTO/)
* [dpkg-deb switches](http://manpages.ubuntu.com/manpages/hardy/man1/dpkg-deb.1.html)

***more documentation coming soon***
