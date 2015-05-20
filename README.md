# Express4 AngularJS Learning Demo


## 第一步 开始一个项目
先确保系统已经安装好 [NodeJS](https://nodejs.org/)

然后在命令行运行以下命令安装[Express](http://expressjs.com/) (Express 是基于Nodejs做网站的一个开发框架)

同时安装express 命令行工具 [express-generator](http://expressjs.com/starter/generator.html)
    npm install express --save

    npm install express-generator --save-dev -g

注意: 在MAC系统下 可能需要管理员权限安装 请使用 sudo npm install express --save  命令



然后 创建一个项目 名字叫app

    express app -e -c compass

参数 -e 是使用ejs模板引擎, -c compass 是使用compass sass CSS预处理

创建完毕会在当前文件夹下增加一个app文件夹

注意: 项目所需要的后端依赖的库都在 node_modules 下。后端文件和库使用npm 命令安装，package.json 里面记录所有信息。


## 第二步 使用Bower 构建前端基础结构

进入项目目录 app/public   命令 cd app/public

创建bower 初始配置  bower init

安装前端所需要依赖的库

bower install angular --save
bower install jquery --save
bower install bootstrap --save
bower install reveal.js --save

注意: 项目所需要的前端依赖的库都在 bower_components 下。 .bowerrc文件记录着文件存放的路径默认是bower_components


## 第三步 运行网站

进入app文件夹，键入 DEBUG=myapp npm start 运行网站  然后在浏览器 打开http://localhost:8080/ 就可以访问了


## 第四步 使用Gulp 来运行网站

安装Gulp

    npm install -g gulp

gulp-nodemon 是重启服务器的插件。
gulp-livereload 后端控制前端同步刷新，可能需要安装的 chrome 浏览器插件 LiveReload(也可以不用浏览器插件)
gulp-livereload [浏览器插件](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
[livereload-js](https://github.com/livereload/livereload-js)

