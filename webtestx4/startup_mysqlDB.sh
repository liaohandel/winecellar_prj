#working Path 
#/home/app1/app/
#AIV Handel  @ 20200225
echo "v20200225 start up MariaDB  by Docker ... ID:root PWD:abcd1234 "
docker run -itd --privileged=true -v /home/app1/data:/var/lib/mysql -p 3306:3306  -e MYSQL_ROOT_PASSWORD=abcd1234 --name mysqlx1 mariadb:latest
