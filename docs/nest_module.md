# 设计思想
## 模块化结构
不同于Laravel的文件组织形式，在Nest中的文件采用模块来分类
> 例如，一个用户模块的文件组织是这样的

```ts
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
})
export class UserModule {}
```
