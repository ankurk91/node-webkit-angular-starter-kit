#!/bin/bash

# Description : Update application version number in json files
# Usage : bash version.sh 2.0.0
# Help : Semantic Versioning @http://semver.org/
# Tested on Ubuntu 14.04 x64

# Check for param $1
if [ -z "$1" ]
  then
    echo "Version is required."
    exit 0
fi

echo Current version is :
grep -Po '(?<="version": ")[^"]*' ./package.json
echo ""
echo Update to version :
echo $1
echo ""

read -r -p "Are you sure? [y/n] " response

if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]]
then
        # Replace version in package.json files
        sed -i.bak "s/\"version\": \".*\"/\"version\": \"$1\"/g" ./package.json
        sed -i.bak "s/\"version\": \".*\"/\"version\": \"$1\"/g" ./app/package.json

        # Clean up
        rm ./package.json.bak
        rm ./app/package.json.bak

        # Success message
        echo "All done !"
        exit 1
else
    echo "Operation cancelled"
        exit 0
fi



exit 1
