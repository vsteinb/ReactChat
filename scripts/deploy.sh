#!/bin/bash

root=~/Schreibtisch/Chat

cd ${root}
sass ./src
npm run build
firebase deploy --only hosting
