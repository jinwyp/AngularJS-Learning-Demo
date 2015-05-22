# Express4 AngularJS Learning Demo


## 第一步 开始一个项目

### 安装Express框架
先确保系统已经安装好 [NodeJS](https://nodejs.org/)

然后在命令行运行以下命令安装[Express](http://expressjs.com/) (Express 是基于Nodejs做网站的一个开发框架)

    npm install express --save

同时安装express 命令行工具 [express-generator](http://expressjs.com/starter/generator.html)

    npm install express-generator --save-dev -g

注意: 在MAC系统下 可能需要管理员权限安装 请在原命令前增加sudo

    sudo npm install express --save


### 创建一个项目

然后 创建一个项目 名字叫app

    express app -e 或 express app -e -c compass

参数 -e 是使用ejs模板引擎, -c compass 是使用compass sass CSS预处理

创建完毕后, 在当前文件夹下会增加一个app文件夹

注意: 项目所需要的后端依赖的库都在 node_modules 下。后端文件和库使用npm install 命令安装。在使用 npm install --save 命令会自动把信息保存在 package.json 里面。


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

进入app文件夹，键入 DEBUG=myapp npm start 运行网站  然后在浏览器 打开http://localhost:8080/ 就可以访问了。


## 第四步 使用Gulp 批处理任务工具 来运行网站

Gulp可以处理一系列的工作, 例如编译Sass为css,压缩js代码,合并js和css文件, 最后启动网站。

### 安装Gulp

    npm install -g gulp --save-dev

gulp-nodemon 是重启服务器的插件。 因为我们修改后端的nodejs代码, 需要人工重启服务器才能看到更新, 使用nodemon就可以自动监视文件变化重启服务器。

gulp-livereload 是自动刷新前端页面的插件, 这样修改了css不用手动刷新页面就能看到最新的修改, 而且可以在电脑,手机上同步刷新。

需要安装的 chrome 浏览器插件 LiveReload(也可以不用浏览器插件) [浏览器插件](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
或不用浏览器插件 在页面中插入以下代码 [livereload-js](https://github.com/livereload/livereload-js)

    <script type="text/javascript">
        document.write('<script src="' + (location.protocol || 'http:') + '//' + (location.hostname || 'localhost') + ':35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
    </script>


### 编写Gulp 任务

具体请查看gulpfile.js内容, 默认gulp会读取gulpfile.js的任务

### 运行Gulp 任务

在命令行运行以下命令启动网站, 打开http://localhost:8080/ 就可以访问了。

    gulp 或 gulp default



