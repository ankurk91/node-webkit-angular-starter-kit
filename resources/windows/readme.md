## Creating installer for Windows

We will use [Inno setup](http://www.jrsoftware.org/) for creating installer for windows

If you are packaging on Linux , you want to install [wine](http://wiki.winehq.org/FrontPage) first.

However it is recommended to build and pack windows installer on same Windows operating system.

## TODO
* Write more instructions about this process
* Use [winresourcer](https://github.com/felicienfrancois/node-winresourcer) to modify exe property
* Use [enigma](http://enigmaprotector.in/en/aboutvb.html) virtual box to pack exe
* Prevent install if newer version is already installed [gist](https://gist.github.com/mistic100/acb3484464e29f28279c)
* Prompt for upgrade , hide folder screen if already installer [link](http://stackoverflow.com/questions/15638663/creating-an-installer-that-will-perform-an-update-if-an-older-version-is-already)

## Online help
[Command line switches for inno setup compiler](http://www.jrsoftware.org/ishelp/index.php?topic=compilercmdline)
