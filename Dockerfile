FROM    docker.io/node:9.0
MAINTAINER      suyuan "suyuan1573@gmail.com"

RUN mkdir -p /app
WORKDIR /app

RUN wget https://github.com/sfm-rc/hw-admin/archive/0.0.1.tar.gz
RUN tar zxvf 0.0.1.tar.gz
RUN rm 0.0.1.tar.gz
RUN mv hw-admin-0.0.1 hw-admin

RUN wget https://github.com/sfm-rc/koa2-hw/archive/0.0.1.tar.gz
RUN tar zxvf 0.0.1.tar.gz
RUN rm 0.0.1.tar.gz
RUN mv koa2-hw-0.0.1 koa2-hw

RUN wget https://github.com/sfm-rc/hw/archive/0.0.1.tar.gz
RUN tar zxvf 0.0.1.tar.gz
RUN rm 0.0.1.tar.gz
RUN mv hw-0.0.1 hw

WORKDIR /app/hw-admin
RUN npm install
RUN npm run build


WORKDIR /app/koa2-hw
RUN npm install

WORKDIR /app/hw
RUN npm install
RUN npm run build




RUN     /bin/echo -e "LANG=\"en_US.UTF-8\"" >/etc/default/local
EXPOSE  22
EXPOSE  80
CMD     /usr/sbin/sshd -D