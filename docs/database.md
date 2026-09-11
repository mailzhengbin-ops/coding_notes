# 数据库
Laravel使用原生sql、查询构造器、Eloquent ORM 三种方式与数据库交互

## Eloquent ORM
Laravel 提供的对象关系映射工具，它把 PHP 模型/对象与数据库表/记录建立映射，使我们可以通过 PHP 对象和方法来操作数据库，而不必直接编写大量 SQL。
```php
$user = User::find(1)
```
调用User模型类（对应users表）的find静态方法（这个方法由继承自内置的model），find方法内部执行类的实例化操作并返回给对象模型$user（对应user表中的一条记录）

## 查询构造器
## 数据库迁移（/migrations）
> 创建数据库结构（表+字段）

迁移文件结构
```php
// 2026_09_08_120000_create_users_table.php
return new class extends Migration
{
    // 执行迁移时做什么
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

    // 回滚迁移时做什么
    public function down(): void
    {
        // 如果users表存在，就把他删除
        Schema::dropIfExists('users');
    }
};
```
迁移操作
```bash
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
