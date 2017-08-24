# koa2-hw

标签（空格分隔）： 接口文档 户外 nodejs


---

## 使用说明：

### Getting Start

```
git clone git@github.com:sfm-rc/koa2-hw.git
cd koa2-hw
npm install # 国内可以使用 cnpm 加速, 教育网可使用 rednpm (https://npm.mirror.cqupt.edu.cn) 加速
npm start
```

然后使用浏览器打开 http://127.0.0.1:3000/ 即可

### Npm scripts

```bash
$ npm start # 开发模式, 开启开发模式之后对于 /src 目录内的任何改动会自动热替换生效
$ npm run build # build
$ npm test # 单元测试
$ npm run compile # 编译
$ npm run production # 生产模式
```



### 线上部署

```bash
npm run build # 单测, 编译 ES6/7 代码至 ES5
vim pm2.json # 检查 pm2 的配置
pm2 start pm2.json # 请确保已经 global 安装 pm2    (npm i pm2-cli -g)
cp nginx.conf /etc/nginx/conf.d/YourProject.conf # 自行配置 nginx 反代
```

## 接口说明	

### 基础信息
-   接口默认全部以post请求，Content-Type 为application/json，特殊情况需额外说明
-   跨域： 目前后端控制允许全部origin，后面会做限制
-	host: 127.0.0.1:3000
-	返回结果格式如下，code＝0表示接口正常返回，meaasge附带接口返回说明，data为接口返回数据
		
		{
        "message": "异常",
		"code": 112,
		"data":{}
		}
			
-   若data是列表数据,参数一般需要pageIndex(当前页码) 和 limit(每页数量) ,返回值中带有

        "pagination":{
        				"count": 13, // 总数update_activity
        				"page_index": 2, // 当前页码
        				"page_count": 2, // 页码总数
        				"limit": 10 // 每页数量
        			}
		
-	权限，cookie等其他功能后续开启
-	部分字段有isShow的，传入isShow='-1'则查询匹配的，不传则查询isShow != '-1'的


### HTTP返回状态
	状态码									含义
	200 OK								GET请求成功
	202 ACCEPTED						POST请求成功
	401 FORBIDDEN						token无效,被禁止访问
	400 BAD REQUEST						POST请求失败或GET请求参数有误
	403 FORBIDDEN						token无效,被禁止访问
	404 NOT FOUND						请求的资源不存在，路由出差
	500 INTERNAL SERVER ERROR			内部错误
	

### 活动接口

#### 获取活动
	/hw/activity/list
-	【权限】U
-	【说明】
-	【参数】

		{
        "admin_id":"1",
        "pageIndex": 1,
        "limit": 10
        }

#### 获取活动详情
	/hw/activity/get
-	【权限】U
-	【说明】
-	【参数】

		{
        "id":"1"
        }

#### 报名
	/hw/join/add
-	【权限】U
-	【说明】

	>	down_payment	定金价格单位是角
-	【参数】

		{
		"user_name":"sy1",
		"user_name_alias": "sy1_1",
		"sex": 1,
		"mobile": "1111111",
		"down_payment": 8888,
		"activity_id": 1,
		"extra": "ooooo"
		}

#### 填写保单
	/hw/insurance/add
-	【权限】U
-	【说明】

	>	brith	生日，unix时间戳
-	【参数】

		{
			"activity_id": 1, 
			"user_name":"suyuan", 
			"cer_type": "id_card", 
			"cer_id": "1111", 
			"sex":1, 
			"birth": 11111, 
			"mobile":"13636672480", 
			"e_contact":"zhuli", 
			"e_contact_mobile":"1110"
		}