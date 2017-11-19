FROM    registry.cn-hangzhou.aliyuncs.com/suyuan/node-nginx
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
RUN npm run compile

WORKDIR /app/hw
RUN npm install
RUN npm run build



WORKDIR /app/koa2-hw
CMD ["sh", "run.sh"]
EXPOSE  3000
