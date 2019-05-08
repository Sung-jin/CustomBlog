#!/bin/sh

#kill $(lsof -t -i:3200)
mkdir ~/deploy && cd ~/deploy
git clone -b deploy --single-branch https://github.com/Sung-jin/CustomBlog.git
cd CustomBlog/Back-End && cp -rf routes ~/CustomBlog/Back-End
cd ~ && rm -rf deploy
