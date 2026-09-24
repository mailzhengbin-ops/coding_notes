# Nginx
Nginx是一个web服务器，其可以直接处理静态请求，但不能直接执行 PHP、Java等动态代码；动态请求通常通过反向代理（proxy_pass）或 FastCGI（fastcgi_pass）交给后端应用服务器/运行时处理，再将结果返回给客户端
> 常见应用服务器：JavaScript的Node.js，PHP的PHP-FPM/FrankenPHP，Java的Tomcat

## 配置文件
### 伪静态
告诉 Nginx：请求进来后，先检查是不是静态资源，如果是，nginx自己处理；如果不是，就把请求交给其他处理应用服务器处理
```nginx
# 交给index.php，nginx根据location配置交给PHP-FPM
location / {
    try_files $uri $uri/ /index.php?$query_string;
}

# 交给octane服务器
location / {
    try_files $uri $uri/ @octane;
}
```

