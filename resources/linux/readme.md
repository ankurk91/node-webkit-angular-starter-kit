## Creating a .deb installer for Ubuntu OS


We wil use ```dpkg-deb``` , an handy tool comes pre-installed on Ubuntu.

Lets organize your files and folder first. See the tree below.


## Folder structure

Our application will be installed in /opt folder. [Why ?](http://www.tldp.org/LDP/Linux-Filesystem-Hierarchy/html/opt.html)

```

├── my-application-installer/
│   ├── DEBIAN
│   │   └── control
│   ├── usr
│   │   ├── share
│   │   │   ├── applications
│   │   │   │   └── my-application.desktop
│   ├── opt
│   │   ├── my-application
│   │   │   ├── locales
│   │   │   │   ├── en-US.pak
│   │   │   │   └── en-GB.pak
│   │   │   ├── icon.png
│   │   │   ├── icudtl.dat
│   │   │   ├── my-application
│   │   │   ├── libffmpegsumo.so
│   │   │   ├── nw.pak

```

Make sure all sub directories of 'my-application-installer' have file permission 0755



## Command to create debian installer

```bash

fakeroot dpkg-deb -Zxz --build /path/to/my-application-installer /path/to/release-folder


```

## Installing the app via command line

```bash

sudo dpkg --install /path/to/release/my-installer-1.0.0_amd64.deb

```

## Uninstalling app via command line

```bash

sudo dpkg --purge my-application

```

## TODO

* Installing application to /usr/bin
* Add ```app-name.png``` to ```/usr/share/pixmaps```
* Add a hi-resolution```app-name.png``` to ```/usr/share/icons/hicolor/512x512/apps/``` folder
* Add ```copyright``` and ```changelog.Debian``` to installer (/usr/share/doc/my-application)
* Create rpm package using [fpm](https://github.com/jordansissel/fpm)



## Online manuals and help

* [Creating debian binary packages](http://tldp.org/HOWTO/html_single/Debian-Binary-Package-Building-HOWTO/)
* [dpkg-deb switches](http://manpages.ubuntu.com/manpages/hardy/man1/dpkg-deb.1.html)


