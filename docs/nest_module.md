# 设计思想
## 模块化结构
不同于Laravel的文件组织形式，在Nest中的文件采用模块来分类
> 例如，一个用户模块的文件组织是这样的

```md
user/
├── user.module.ts
├── user.controller.ts
├── user.service.ts
├── user.repository.ts
├── dto/
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
└── entities/
    └── user.entity.ts
```
### user.module.ts
:::tabs

== tab npm

```bash
npm install
```

== tab pnpm

```bash
pnpm install
```

:::
