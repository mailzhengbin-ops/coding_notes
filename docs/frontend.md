# PHP特性
## PHP-FPM
### 多进程（主进程 + 工作进程（worker）池）单线程
master+多worker处理请求，一个worker在同一时间只能处理一个请求，每个worker之间相互隔离，fpm的并发能力取决于worker数量

worker进程级内存常驻（不同于Laravel Octane的应用级内存常驻）：worker把全部请求执行完毕后，worker不会销毁，而是继续等待下一个请求处理

多进程指的的是同时可以运行多个 Worker。
单进程指的是一个Worker进程内部，通常只有一个执行线程
### 内存泄漏管理
+ 每一次请求结束，清理worker自动执行php_request_shutdown清理请求级资源

+ 达到pm.max_requests = 500设定的每个worker最高处理请求数上限时，worker销毁（定期销毁，解决内存泄漏）

+ 达到request_terminate_timeout = 30s设定的单个请求的最大执行时间时，超时直接销毁Worker，防止慢请求或死循环导致内存暴涨

+ 进程隔离：每个 Worker 进程内存独立，一个进程泄漏不会影响其他进程，也不会拖垮整个服务

### 执行模型：同步+阻塞
同步（什么时候做）：指执行顺序——任务必须按顺序来，前一个没做完，后一个绝对不会开始。

阻塞（等待时干什么-干等）：指等待行为——遇到 I/O 操作时，进程会挂起等待，不会去干别的事

### 进程常驻但应用不常驻
```text
应用不常驻（PHP-FPM）

Worker 常驻
    ↓
请求1 → Laravel 应用初始化 → 处理 → 请求结束
    ↓
请求2 → Laravel 应用重新初始化 → 处理 → 请求结束
    ↓
请求3 → Laravel 应用重新初始化 → 处理 → 请求结束
```
```text
应用常驻（FrankenPHP）

Worker 常驻
    ↓
Laravel 应用初始化一次
    ↓
请求1 → 复用 Application → 处理
    ↓
请求2 → 复用 Application → 处理
    ↓
请求3 → 复用 Application → 处理
```
