# Nginx
Nginx是一个web服务器，其可以直接处理静态请求，但不能直接执行 PHP、Python、Java 等动态代码；动态请求通常通过反向代理（proxy_pass）或 FastCGI（fastcgi_pass）交给后端应用服务器/运行时处理，再将结果返回给客户端
> 常见应用服务器：JavaScript的Node.js，PHP的PHP-FPM/FrankenPHP，Java的Tomcat

## 配置文件




