# 依赖注入

通常，一个对象可以持有的依赖关系只有三种方法：

1. 我们可以内部创建其依赖。
2. 我们可以向上一级查询或引用作为一个全局变量。
3. 我们可以在需要时传入。

通过依赖注入，我们使用第三种方法（另两种方法目前有其他困难实现，例如污染全局的scope变量并且很难做到scope隔离）。依赖注入设计模式可以删除硬编码的依赖性，从而使其在运行时删除和更改它们。

这个在运行时修改依赖的能力允许创建一个隔离的环境从而方便测试。我们可以在生产环境中用假的数据替换真实的对象用于测试。

功能上，这种模式在需要时把依赖的资源注入到目标中，并且自动预先寻找依赖和提供依赖的目标。

当我们基于其他对象或库编写组件，我们需要描述其依赖。在运行时，一个注入器将会创建依赖关系的实例，然后把它传入消费者的依赖

	// Great example from the Angular docs
	function SomeClass(greeter) {
		this.greeter = greeter;
	}
	SomeClass.prototype.greetName = function(name) {
		this.greeter.greet(name)
	}

	注意：上面的例子代码中，在全局作用域（scope）中创建一个控制器是不建议的，例子中仅仅是为了简单起见才这样做。

运行时中，SomeClass函数并不关心 greeter的依赖，只是要得到它。为了在SomeClass中得到greeter 实例， SomeClass的创建者负责在创建时传入SomeClass的依赖。

Angular 使用$injector 来管理查找和实例化依赖关系。 实际上，$injector负责处理所有Angular组件的实例化，包括我们的app模块，指令和控制器等。

当任何模块启动并运行时， $injector即使负责具体的对象的实例化，并传入所需要的依赖关系。

例如，下面这个简单应用声明了一个模块和一个控制器：

	angular.module('myApp', [])
		.factory('greeter', function() {
			return {
				greet: function(msg) { alert(msg); }
			}
		})

	.controller('MyController',
		function($scope, greeter) {
			$scope.sayHello = function() {
				greeter.greet("Hello!");
			};
		});

程序运行时，当Angular实例化我们的模块时，将会向上查找 greeter 并简单自然的传入其依赖。

	<div ng-app="myApp">
		<div ng-controller="MyController">
			<button ng-click="sayHello()">Hello</button>
		</div>
	</div>

在幕后，Angular的处理过程如下：

	// Load the app with the injector
	var injector = angular.injector(['ng', 'myApp']);

	// Load the $controller service with the injector
	var $controller = injector.get('$controller');
	var scope = injector.get('$rootScope').$new();

	// Load the controller, passing in a scope
	// which is how angular does it at runtime
	var MyController = $controller('MyController', {$scope: scope})

在上面的例子中，我们讲述了如何找到 greeter，简单的运行，并作为注入器为我们负责查找和加载它。

当实例化时， AngularJS使用一个注释（annotate）函数让属性传入数组中。你可以在Chrome的开发者工具中通过键入下面的代码查看该函数

> injector.annotate(function($q, greeter) {})
["$q", "greeter"]

在每个Angular应用中，$injector 一直在运行,无论你是否知道。 当我们新建一个没有依赖[](空的注释框)控制器或显式的设置它们时， $injector会推断出基于参数的名称的依赖。



## 注释名称的推理

如果没有其他指定, Angular假设函数的参数名称就是依赖的名称。因此会调用 toString()方法解析并提取函数参数，然后使用$injector将这些参数注入对象的实例化。
注入过程如下：

	injector.invoke(function($http, greeter) {});

注意这个过程仅在代码未压缩未加密情况下正常工作，因为Angular需要这些解析的名称保持不变。

通过这个JavaScript解析推理的过程，名称参数的顺序并不重要：Angular自己会给我们找出结果,把正确的属性注入到正确的顺序上.

	JavaScript 代码压缩程序通过会用短的变量名替换函数的参数(同时会去掉空格，换行注释等)，为了能把文件大小减少到最小的体积。如果我们没有明确写明参数，Angular将无法推断出所需要的注入参数。


## 显式的注释声明

在一个函数需要调用时Angular为我们提供一种显示定义依赖的方法。这个方法允许代码压缩程序替换函数参数名称后仍然能把正确的服务注入到函数里面。

注入过程使用$inject 属性来注释函数。函数的$inject 属性是一个服务名称的数组并作为依赖项注入。

为了使用$inject属性方法，我们把它放在函数或名称上。

	var aControllerFactory =
		function aController($scope, greeter) {
			console.log("LOADED controller", greeter);
		// ... Controller
	};
	aControllerFactory.$inject = ['$scope', 'greeter'];

	// Greeter service
	var greeterService = function() {
		console.log("greeter service");
	}

	// Our app controller
	angular.module('myApp', [])
		.controller('MyController', aControllerFactory)
		.factory('greeter', greeterService);

	// Grab the injector and create a new scope
	var injector = angular.injector(['ng', 'myApp']),
	controller = injector.get('$controller'),	
	rootScope = injector.get('$rootScope'),
	newScope = rootScope.$new();

	// Invoke the controller
	controller('MyController', {$scope: newScope});

这种注释风格，参数的顺序是很重要的，随着$inject 注入的数组必须与注入的参数的顺序匹配。这种注入的方法即使代码压缩也可以正常运行，因为注释的信息将和函数一起打包。


## 隐式的注释声明

最后，Angular提供一种易用的隐式声明的注释方法。这种语法糖与上面使用$inject方法的注释一样，但允许我们使用内联参数来函数定义。此外还可以让我们定义时不使用临时变量。

隐式的注释声明允许我们当定义Angular对象时传入一个参数数组来代替函数。在这个数组元素中是要注入依赖性的字符串的列表，最后一个参数是对象的函数定义。

例如：

	angular.module('myApp')
		.controller('MyController',
			['$scope', 'greeter',
			function($scope, greeter) {
	}]);

这个隐式的注释声明方法同样可以在代码压缩后正常运行，因为我们传入的是字符串列表。我们经常用数组括号[]来使用这种方法。


##  $inject API

尽管我们需要直接使用$injector的次数较少，但明白其API会让我们更好的了解它是如何工作的。

### annotate()

当实例化时，annotate()方法返回一个被注入到函数里面的服务名称数组。annotate()方法通常用于注入器确定哪个服务在调用时将被注入到函数中。

annotate()函数有一个参数：

* fn (function or array)

fn参数是在括号[]内的已定义的函数中给定一个函数或一个数组。
annotate()方法返回一个在调用时被注入函数的依赖服务的名称数组。

	var injector = angular.injector(['ng', 'myApp']);
	injector.annotate(function($q, greeter) {});
	// ['$q', 'greeter']

请在你的Chrome调试器中运行代码。

### get()

get()方法返回一个服务的实例并有一个参数。

* name(string)

name参数是我们想要的实例名称。
get() 返回一个name服务的实例。

### has()

has()方法如果注入器知道一个服务在已注册里存在,那么返回true,否则返回false。并有一个参数

* name(string)

这个name字符串是我们想在注入器的注册表里面查找的服务名称。

### instantiate()

instantiate()方法创建一个新的JavaScript类型的实例。它有一个构造函数并能调用new操作符和带有指定的参数。它有两个参数：

* Type(function)

这个函数是让注释构造函数来调用。

* locals(object – optional)

这个可选参数提供了另一种方式当函数被调用时传递参数名称给该函数。

instantiate()方法返回一个新类型的实例。

### invoke()

invoke()方法能从$injector调用方法并添加参数。
invoke()方法有三个参数:

* fn (function)

这个函数是被调用函数。该函数的参数用来设置函数的注释。

* self (object – optional)

self参数允许我们设置 this 参数的调用方法。


* locals (object – optional)

这个可选参数提供了另一种方式当函数被调用时传递参数名称给该函数。

invoke()方法返回 fn 函数返回的值。


## ngMin

从上面定义注释的三种方法，一个重要点是在定义函数时这三种都存在。在生产中，尽管如此，经常不太方便明确我们需要关注的参数顺序和代码膨胀。

ngMin工具可以让我们减轻需要明确定义依赖注入的工作任务。ngMin是一个针对Angular程序预先压缩工具。它可以遍历我们的Angular程序来为我们设置依赖注入。

例如看下面这段代码：
	angular.module('myApp', [])
	.directive('myDirective',
		function($http) {
	})
	.controller('IndexController',
		function($scope, $q) {
	});

会被ngMin转化成如下：

	angular.module('myApp', [])
	.directive('myDirective', [
		'$http',
		function ($http) {
		}
	]).controller('IndexController', [
		'$scope',
		'$q',
		function ($scope, $q) {
		}
	]);

ngMin让我们节省了很多打字时间并显著的整理了我们的源代码。

### 安装ngMin

使用npm nodejs的包管理工具 安装ngMin。

$ npm install -g ngmin

	如果使用Grunt，我们可以按照grunt-ngmin的Grunt任务。如果使用Rails，我们可以使用Ruby gem ngmin-rails.

### 使用ngMin

我们可以通过命令行独立使用ngMin，通过传入两个参数 input.js 和 output.js文件或通过stdio/stdout，例如:

$ ngmin input.js output.js 

或者

$ ngmin < input.js > output.js

input.js 是源文件，output.js是被处理后的文件.

### ngMin如何工作的

在其核心,ngMin使用抽象语法树(AST)遍历JavaScript源代码。通过astral工具的帮助下,AST框架工具会重建所需要注释的源代码,然后借助escodegen工具生成新的源代码。

ngmin希望我们的Angular源代码是能有清晰的逻辑声明。如果我们的书写的代码的语法格式与该书类似，ngMin就能解析源代码并预先压缩。