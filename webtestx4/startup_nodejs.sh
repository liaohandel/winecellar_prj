#working Path 
#/home/app1/data/
#AIV Handel  @ 20200225
echo "v20200225 start up nodejs Ver12 by Docker ..."
docker run -itd --privileged=true -v /home/app1/app:/data/app --link=mysqlx1:mysql -w /data/app -p 3000:3000 -p 80:80 --name nodeapp node:12
