#!/bin/bash

~/Documents/open-webui/my-launch.sh &
cd ~/Documents/vercel/wakka-board-site-on-vercel
code . &
konsole --new-tab -e npm run dev &
google-chrome-stable http://localhost:8000 --profile-directory="Profile 13" &

