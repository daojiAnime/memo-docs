# 构建前端镜像

## github actions构建并推送

### 配置仓库

配置`.github/workflows/docker-build-push.yml`中仓库地址和`secret`为自己的。

### 配置仓库地址

在脚本`scripts/vmq/build_image_and_push.sh`中配置`BASE_NAME="branch/image-name"`为自己镜像仓库的地址。

### 脚本参数

- --arm 只构建 arm 平台的镜像
- --x86 只构建 x86 平台的镜像
- --both 同时构建两种平台的镜像



### 生成标签

代码提交之后，为需要发布的代码创建一个 `tag`，然后`github actions`会自动构建镜像并推送到指定仓库中。

::: tip 注意⚠️

**格式要按照`v0.0.0`的格式才会匹配构建流程。**

:::

```bash
git tag v0.0.x
git push origin v0.0.x
```

### 构建流程日志

随后检查`github actions`的日志，如果**构建失败根据具体日志进行处理**。

![image-20250224164911862](https://cdn.jsdelivr.net/gh/daojiAnime/cdn@master/img/image-20250224164911862.png)

## 本地构建

### 配置镜像 tag

在`apps/web-antd/.env`中配置`VERSION=v0.0.0`，作为镜像`tag`。

### 配置仓库地址

在脚本`scripts/vmq/build_image_and_push.sh`中配置`BASE_NAME="branch/image-name"`为自己镜像仓库的地址。

### 脚本参数

- --arm 只构建 arm 平台的镜像
- --x86 只构建 x86 平台的镜像
- --both 同时构建两种平台的镜像

### 执行脚本构建并推送

在项目根目录下执行，构建镜像并推送到仓库中。

```bash
sh scripts/vmq/build_image_and_push.sh --both
```

