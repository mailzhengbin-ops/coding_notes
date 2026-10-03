# Laravel项目启动

## 开发环境
**JS环境**：[Node.js](https://nodejs.org/zh-cn)和npm（Node.js捆绑）
```bash
# 检查
node -v
npm -v

# 如果npm版本号无法输出，可能是npm.ps1被拦截了，执行如下放开
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

**PHP环境**：PHP、Composer、Laravel installer（一键安装命令，[php.new提供](https://php.new/)）

```bash
# 指令
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.5'))
# 检查
laravel --version
php -v
composer -v
```
> php.new 安装的运行环境是 Herd Lite，包含 PHP、Composer、Laravel Installer 三件套。
> 其中 PHP 仅包含 Laravel 运行所需的基础扩展，其他扩展需自行安装完整 PHP；更新时重新运行安装命令即可。

+ Web服务器：默认采用php内置的开发服务器，通过`php artisan serve`启动
+ 数据库：默认采用Laravel内置的sqlite，并且执行了必要的迁移来创建数据库表

## 创建项目

```bash
# 执行Laravel初始化指令，从而创建项目
laravel new example-app
```
创建项目时，可以选择使用[Starter Kits](https://laravel.com/framework/docs/starter-kits)开发套件，其提供了众多开箱即用的功能

## 项目构建

```bash
# 安装前端npm依赖，打包前端文件
npm install && npm run build

# 启动laravel开发服务器、vite开发服务器、队列监听器
composer run dev
```
在开发环境，无需安装npm依赖和打包前端文件，一般使用`composer run dev`即可
> 注意：项目composer命令只能在`composer.json` 的同级目录运行，全局composer则不需要  
