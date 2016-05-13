#!/bin/bash
# declare STRING variable
STRING="done."
#print variable on a screen
echo "Cleaning dist directory:"
gulp clean
echo $STRING
echo "..."

clear

echo "Starting localhost"
gulp serve
echo $STRING