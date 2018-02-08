#!/usr/bin/env bash

APP="Deluge Mobile"
VERSION=$(date '+%Y%m%d%H%M%S')
HOST=192.168.1.10
SITE_NAME=deluge.hontas.duckdns.org

echo "Packaging $APP"
TARBALL=$(npm pack)
rm -rf tmp/*
mv $TARBALL tmp/$TARBALL

echo "Sending $TARBALL to $HOST"
scp tmp/$TARBALL pi@$HOST:~/tmp

echo "Extracting $APP to $SITE_NAME"
ssh pi@$HOST "cd tmp; tar -xzf $TARBALL; cp -rf package/. ~/www/$SITE_NAME; rm -rf package; rm $TARBALL"

echo "Installing & starting"
CONFIG_NODE='echo "Sourcing nvm & loading node"; . "$HOME/.nvm/nvm.sh"; [[ -f ".nvmrc" ]] && nvm use || nvm use stable'
ssh pi@$HOST "$CONFIG_NODE; cd www/$SITE_NAME; echo 'Running yarn install --no-lockfile --prod'; yarn install --no-lockfile --prod; echo 'Starting app with pm2'; pm2 startOrRestart pm2.json; pm2 save"

echo "Cleaning up temporary files"
rm tmp/$TARBALL

exit 0;
