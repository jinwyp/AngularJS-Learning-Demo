#Express4 Angular Learning Demo

## 第一步 开始一个项目

在命令行运行

npm install express --save

npm install express-generator --save-dev -g




注意: 在MAC系统下 可能需要管理员权限安装 请使用 sudo npm install express --save  命令

然后 创建一个项目
express app -e -c compass
参数 -e 是使用ejs模板引擎, -c compass 是使用compass sass CSS预处理

注意: 项目所需要的后端依赖的库都在 node_modules 下

## 第二步 使用bower 构建前端基础结构

进入项目目录 app/public   命令 cd app/public

创建bower 初始配置  bower init

安装前端所需要依赖的库

bower install angular --save
bower install jquery --save
bower install bootstrap --save
bower install reveal.js --save

注意: 项目所需要的前端依赖的库都在 bower_components 下


