docker ps
echo -e "=== mqttx1 ==="
docker inspect mqttx1 | grep IPA
echo -e "=== gg1 redis ==="
docker inspect gg1_redis | grep IPA
echo -e "=== gg1 node ==="
docker inspect gg1_node | grep IPA
echo -e "=== gg1 nginx  ==="
docker inspect gg1_nginx | grep IPA
echo -e "=== gg1 mongoDB  ==="
docker inspect gg1_mongoDB | grep IPA

