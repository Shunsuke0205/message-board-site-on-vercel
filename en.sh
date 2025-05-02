#!/bin/bash

wmctrl -s 0
cd ~/Documents/vercel/wakka-board-site-on-vercel;
code . &
konsole --new-tab -e npm run dev &
google-chrome-stable http://localhost:8000 --profile-directory="Profile 13" &
sleep 1
~/Documents/chatbot-ui/start-chat-research.sh;

