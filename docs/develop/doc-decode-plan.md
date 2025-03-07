# 文档解析方案

## olmOCR

- 支持 PDF 进行直接解析，但是效果差，出现缺失文档文本、图片的情况。
- 脚本解析，olmOCR 识别图片: 出现图片中清晰文字缺失，开头的日期信息缺失。效果不佳。

![image-20250307093527146](https://cdn.jsdelivr.net/gh/daojiAnime/cdn@master/img/image-20250307093527146.png)

## markitdown

- 支持多种格式文档转 `markdown`，包括 `xlsx、xls、pdf、docs、pptx`，`视频文件正在支持中，等待新版本使用 ffmpeg 进行解析`。
- 转换 pdf 时出现错误，只提取文本没有提取图片，也没有使用视觉大语言模型做识别
  - ![image-20250307101037696](https://cdn.jsdelivr.net/gh/daojiAnime/cdn@master/img/image-20250307101037696.png)
- 表格转换能够将多个子表放到一个 md 文件
  - ![image-20250307101320626](https://cdn.jsdelivr.net/gh/daojiAnime/cdn@master/img/image-20250307101320626.png)
- 视觉模型抽取图片文本，不支持配置 `prompt`，对于多语言场景效果显而易见的差。

## MinerU

- 据说，在年报场景效果不错。
- 个人文档 pdf 解析中出现文本丢失的情况
- 图片识别的效果不佳，大多数图片都没进行抽取

## 自研

- 存在技术背景，擅长文档解析，经验丰富。
- 高度定制文档解析效果更佳
- 图片抽取可自定义 prompt，多语言多场景适配更佳