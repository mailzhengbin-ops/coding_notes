## 路由
路由（Routing）是根据客户端请求的**HTTP方法**和**URL**，将请求匹配并分发给相应**处理器**（控制器方法/闭包函数）的机制
> HTTP方法的语义化：既然控制器的方法才真正执行查询、写入，为什么还要分 GET、POST？因为HTTP方法不是“业务逻辑本身”，而是“请求意图和协议行为”的声明，虽然符合语义不是强制性要求，但其能使客户端更好地理解这次请求

### Laravel中路由的实现
```php
// web.php中定义路由
Route::get('/users', [UserController::class, 'index']);

// 控制器中定义处理器
class UserController{
    public function index(){
        return '用户列表';
    }
}
```


