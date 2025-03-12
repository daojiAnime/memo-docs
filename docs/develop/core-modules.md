# 核心模块文档

> [!TIP]
> `app/core`是项目的核心模块，包含了配置、中间件、日志、鉴权等组件


> [!WARNING]
> 不要将业务逻辑放到核心组件内，防止发送循环导入、运行时加载变量等问题。

## core

### 全局配置 - core/config

> [!TIP]
> 教程文档：https://docs.pydantic.dev/latest/concepts/pydantic_settings/

```python{6,12}
class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        # 验证默认值是否正确
        validate_default=False,
        # 优先级：后面文件的配置会覆盖前面文件的配置
        env_file=[".env"],  
        env_ignore_empty=True,
        env_file_encoding="utf-8",
        # 忽略未定义的配置
        extra="ignore",
    )
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ...


settings: Settings = Settings()
```

在开发环境中，本地通过`.env.sample`创建一个`.env`作为个人配置，管理私人密钥和其他配置内容。
在部署环境中，通过`docker-compose.yml`服务编排配置服务的环境变量。

#### 配置样例

```shell
# 注释：不要使用单引号或者双引号，在本地环境和部署环境中容易出现不一致的情况。
SECRET_KEY=token_str
```

#### 使用方法

```python
from app.core.config import settings

print(settings.SECRET_KEY)
```



### 数据库对象 - core/db

`db.py`专门给存放数据库对象，可以全局引用。统一管理配置。后续可以添加 redis 连接池、rabbitmq 连接池等。

#### 初始化对象数据库

`init_db`定义了初始化数据库的函数。

```python

def init_db(session: Session) -> None:
    ...
```


#### 使用方法

```python
from sqlmodel import Session
from app import crud, models
from app.core.db import engine


def create_user_data() -> None:
    with Session(engine) as session:
        for i in range(10):
            crud.create_user(
                session=session,
                user_create=models.UserCreate(
                    email=f"demo_{i}@example.com", password=secrets.token_hex(16), username=f"demo_{i}"
                ),
            )
```

### 日志库 - core/log_adapter.py

> loguru 的 handler 不兼容 logging。因此没有选用，如果有必要可以自行引入。

这是一个使用`structlog`封装一个日志库，官方有丰富的 `handler` 支持，也兼容 `logging` 的 `handler` 。结合 `rich` 有多种颜色的日志输出，非常好看。

#### 使用方法

```python
# from app.core.log_adapter import logger 
from app.core import logger

def test_log_adapter():
    # 测试日志适配器

    # 普通日志
    logger.debug("test")
    logger.info("test")
    logger.warning("test")
    logger.error("test")
    logger.critical("test")

    # 异常日志
    # 高亮打印错误堆栈
    # 打印运行时变量kv
    try:
        raise Exception("test")
    except Exception as e:
        logger.exception("test", exc_info=e)

    # 打印运行时变量kv
    logger.info("test", a=1, b=2)

    # 打印运行时变量字典
    test_dict = {"a": 1, "b": 2}
    logger.info("test", val=test_dict)

    # 打印运行时变量列表
    test_list = [1, 2, 3]
    logger.info("test", val=test_list)

```


### fastapi 中间件 - core/middlewares

鉴权、统计接口耗时、限流等中间件都放在这里


### fastapi 响应 - core/responses

自定义 `orjson response` 结构

### fastapi 鉴权 - core/security

定义了 `jwt` 鉴权逻辑。