---
outline: deep
---

## 配置powershell代理
```powershell
# 启动
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"
# 验证
echo $env:HTTP_PROXY
echo $env:HTTPS_PROXY
```
Git命令
```git
# 初始化git仓库
git init

# 提交全部改动到暂存区
git add .

# 提交一个版本
git commit -m "初始化项目"



# 查看所有分支
git branch

# 切换到某个已有分支
git switch feature

# 创建并切换到某个分支
git switch -c feature/payment

# 合并分支（当前分支是master，执行 git merge，就是把“feature/pay”合并到当前分支）
git merge feature/pay

# 查看当前分支的版本记录(简介版)
git log --oneline

# 看整个项目的版本记录 + 所有分支的关系
git log --oneline --graph --all

# 把当前分支回退到 05d9be0 这个版本，并让当前代码也恢复成这个版本的状态。
git reset --hard 05d9be0

# 链接到github仓库
git remote add origin https://github.com/mailzhengbin-ops/juris_anki.git

# 检查
git remote -v

# 开始推送(每个分支推送都要执行这个命令一次，后续直接push)
git push -u origin master

git push origin --delete 分支名

git branch -D plan
```

## 配置Agent
```json
"env": {
  "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
  "ANTHROPIC_AUTH_TOKEN": "sk-1f96926195334b59be3c0be83304f5e0",
  "ANTHROPIC_MODEL": "deepseek-v4-pro[1m]",
  "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro[1m]",
  "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro[1m]",
  "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash[1m]",
  "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
  "CLAUDE_CODE_EFFORT_LEVEL": "max"
},
```