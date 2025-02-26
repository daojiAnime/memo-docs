# 部署

## 部署操作流程

### 安装 docker

```shell
curl -fsSL https://get.docker.com -o get-docker.sh | sh
```

服务器执行 Docker 安装脚本进行安装。

个人电脑可以使用`Dcoker Desktop`进行部署。

![image-20250224093656330](https://cdn.jsdelivr.net/gh/daojiAnime/cdn@master/img/image-20250224093656330.png)

### 拉取代码

```shell
git clone https://github.com/daojiAnime/vmq-fastapi.git
```

### docker compose部署

```shell
cd vmq-fastapi
docker compose up -d
```

如图服务正常启动

![image-20250224093941751](https://cdn.jsdelivr.net/gh/daojiAnime/cdn@master/img/image-20250224093941751.png)

### 初始化数据

**第一次部署数据库需要初始化**，后面数据都挂载在`./data`目录下。

```shell
# 初始化表结构
docker compose exec vmq-backend uv run app/initial_data.py

# 初始化演示数据
docker compose exec vmq-backend uv run app/initial_demo_data.py
```

## 服务验证

可以访问前端地址`http://localhost:5173` 检查服务功能。


<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    <img src="https://cdn.jsdelivr.net/gh/daojiAnime/cdn@master/img/image-20250219100105297.png" alt="image-20250219100105297" style="width: 100%;" />
    <img src="https://cdn.jsdelivr.net/gh/daojiAnime/cdn@master/img/image-20250219100201541.png" alt="image-20250219100201541" style="width: 100%;" />
    <img src="https://cdn.jsdelivr.net/gh/daojiAnime/cdn@master/img/image-20250220153418108.png" alt="image-20250220153418108" style="width: 100%;" />
    <img src="https://cdn.jsdelivr.net/gh/daojiAnime/cdn@master/img/image-20250220153400741.png" alt="image-20250220153400741" style="width: 100%;" />
</div>
