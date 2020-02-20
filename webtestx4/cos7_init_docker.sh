#install Docker by CentOS7
echo "install docker by Linux Centos7 ..."

#update linux 
sudo yum update -y

# Remove old Ver Docker 
sudo yum remove docker \
  docker-common \
  container-selinux \
  docker-selinux \
  docker-engine \
  docker-engine-selinux

sudo yum install -y yum-utils \
  device-mapper-persistent-data lvm2

sudo yum-config-manager \
  --add-repo \
  https://download.docker.com/linux/centos/docker-ce.repo

#========================================================================
#docker.repo 中也同時包含 edge 版本的 Docker 套件庫，不過預設是被停用的，
#想安裝 edge 版本的話，就要先啟用 edge 版本的套件庫
#（如果只是要安裝 stable 版本的人，就可以省略這一步）：
#=======================================================================
#sudo yum-config-manager --enable docker-ce-edge

#更新 yum 的套件索引
sudo yum makecache fast

#安裝 Docker CE 版
sudo yum install docker-ce

#安裝好之後，啟動系統的 Docker 服務
sudo systemctl start docker

#執行 hello world 程式測試：
sudo docker run hello-world

#如果想要使用一般使用者帳號來執行 Docker，要先將該帳號加入 docker 群組
#sudo usermod -aG docker USERNAME