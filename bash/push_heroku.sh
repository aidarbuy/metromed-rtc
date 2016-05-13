#!/bin/bash
# declare STRING variable
STRING="done."
#print variable on a screen
clear
echo "Pushing to github:"
git push origin master
echo $STRING
echo "..."

echo "Pushing to heroku:"
git push heroku master
echo $STRING
echo "..."

echo "Launching heroku logs:"
heroku logs --tail