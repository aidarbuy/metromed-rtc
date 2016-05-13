#!/bin/bash
# declare STRING variable
STRING="done."
#print variable on a screen
echo "Cleaning dist directory:"
gulp clean
echo $STRING
echo "..."

clear

echo "Starting dist"
gulp serve:dist
echo $STRING