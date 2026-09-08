
## Eloquent ORM
## 查询构造器
## 数据库迁移（/migrations）
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
```
执行迁移（up函数）：php artisan migrate
执行回滚（down函数）：php artisan migrate:rollback
```
## 工厂类（/factories）
> 生成数据表的模拟数据

创建 UserFactory 工厂类，负责定义 User 模型（users表）的模拟数据生成规则
```php
class UserFactory extends Factory
{
    // 默认规则
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'is_admin' => false,
        ];
    }

    // 管理员规则
    public function admin(): static
    {
        return $this->state([
            'is_admin' => true,
        ]);
    }
}
```
将生成的数据插入 users 表
```php
##
// 按 definition 规则生成 1条 users表数据
User::factory()->create()

// 按 definition 规则生成 10条 users表数据
User::factory()->count(10)->create()

按definition+admin定义的规则，生成 1条 users表数据
User::factory()->admin()->create();
```
## 数据库填充（/seeders）
> 给数据库填充数据

```php
class UserSeeder extends Seeder
{
    // 执行数据填充
    public function run(): void
    {
        // 1. 使用如下规则创建模拟数据
        User::create([
            'name' => '管理员',
            'email' => 'admin@example.com',
        ]);

        // 2. 使用 Factory 创建模拟数据
        User::factory()->count(10)->create();

        // 3. 调用其他方法创建模拟数据
        $this->seedSomething();
    }

    // 其他数据填充逻辑。
    private function seedSomething(): void
    {
        // ...
    }
}
```
