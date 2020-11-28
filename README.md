<h3 align='center' style="font-size:'30px'">
  Welcome to node service 
<h3/>

#### 托管监控
 - pm2 生产环境，集群运行托管监控
 - npm i -g pm2

```
git reset --hard
git pull origin HEAD
npm install
pm2 stop im -f
pm2 start server.js --name "im" -- --config ./config/config.im_local.json
```
