!/bin/bash

root=~/Schreibtisch/Chat

cd ${root}
code .
sass ./src --watch -q &
npm start
