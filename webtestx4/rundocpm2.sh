#! /bin/sh -e
sudo python /home/app1/startdoc.py

#sleep 10
#docker exec -it node pm2 start /data/app/ecosystem.config.js 
#docker exec -it node bash /data/app/runpm2.sh

sleep 10

docker exec node sh /data/app/runpm2.sh

