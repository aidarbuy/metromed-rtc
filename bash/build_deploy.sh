#!/bin/bash
# declare STRING variable
STRING="done."
#print variable on a screen
clear
echo "Cleaning dist directory:"
gulp clean
echo $STRING
echo "..."

echo "Building dist:"
gulp build
echo $STRING
echo "..."

echo "Deployng to Firebase:"
firebase deploy
echo $STRING
echo "..."

# echo "Opening firebase:"
# firebase open
# echo $STRING

echo "Starting localhost"
gulp serve
echo $STRING