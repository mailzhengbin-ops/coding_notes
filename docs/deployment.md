# 部署上线

## 创建APP_KEY
执行如下命令，自动在.env文件中生成APP_KEY配置
```
php artisan key:generate
```

## 数据库选择与迁移

由于Laravel默认采用sqlite，如更换数据库需要到.env文件中切换数据库，更改连接配置，
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```
并且重新执行数据库迁移
```
php artisan migrate
```

## 优化缓存
优化配置、事件、路由、视图的缓存
```
php artisan optimize
```
清除缓存
```
php artisan optimize:clear
```
注意：每次修改配置后需要重新执行，避免加载旧配置

## 目录权限
Laravel 需要写入 `/ bootstrap/cacheetc storage/webserver ...

## 创建软链接
在public/storage创建软链指向storage/app/public
```
php artisan storage:link
```