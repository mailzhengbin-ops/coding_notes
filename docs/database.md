# 表设计

## 主键、外键和外键约束
## Eloquent ORM
## 查询构造器
## 工厂类
> 生成模拟数据
创建UserFactory工厂类，生成user测试数据
```php
class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
        ];
    }
}
```
生成user表的一条数据，并插入到表中
```php
User::factory()->create()
```
## 数据库填充
> 给数据库填充数据
## 数据库迁移（/Migrations）
> 定义数据库结构
```php
// 2026_09_08_120000_create_users_table.php

<?php

return new class extends Migration
{
    // 执行迁移时干什么
    public function up(): void
    {
        // 创建users表，定义字段
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->timestamps();
        });
    }

    // 回滚迁移时干什么
    public function down(): void
    {
        // 如果users表存在，就把他删除
        Schema::dropIfExists('users');
    }
};
```
执行迁移（up函数）：php artisan migrate
执行回滚（down函数）：php artisan migrate:rollback
