# 游戏礼包兑换系统

## 主要功能

- 验证兑换码页面 ✅ 
- 领取礼品页面 ✅
- 历史记录页面 ✅

## 技术选型

### 基础框架

选择 `React`，最主流，最熟悉，最稳妥

### JS or TS

选择 `typescript`， 类型安全，提升代码健壮性，提供重构时的重要保障，以及提高开发体验和维护体验

### 构建工具

选择 `vite`, 热更新速度更快， 如果担心 vite 的打包代码有生产开发不一致问题，或者有未来更的定制化的构建需求，也可以保守选择 `webpack` ，重新搭建项目模板

### 状态管理

本需求比较简单，暂时没有引入状态管理，仅使用 `React` 本身提供的状态管理能力

### 请求库

未使用，真实项目中一般沿用公司已有基建，或者选用开源库 `axios` 搭建



## 遇到的问题

本需求暂未遇到问题。


## 有限时间内的 tradeoff 决策

优先做的：
1. 需求主流程逻辑实现
2. 各交互模板 UI 大致设计与实现

时间不够没有做的：
1. ui 不够好看（没有设计资源）
2. 没有做深色主题适配
3. 没有做国际化
4. 响应式适配方案不够完善


决策原则
1. 优先保证主流程跑通，做出一个最小的 MVP ，先保证整个需求不会隐蔽有太大的阻塞点
2. UI 优化相关的细节最后做（这一块也是没有止境的）



## 本地开发

```sh
npm i
npm run dev 
```


## TODO

- [x] 完成核心逻辑
- [x] 样式优化
- [ ] 进阶功能
  - [x] 实时格式校验
  - [ ] 输入错误提示动画
  - [ ] 支持扫码输入
  - [x] 礼包领取成功动画
  - [x] 响应式布局适配 (没有写死宽度)
      响应式方案进阶
      - rem 方案
      - 媒体查询 加 px 方案
  - [ ] 深色主题支持


## 未来计划
1. 接入国际化
2. 样式优化，响应式适配与测试，
3. 深色主题开发
4. 扫码输入
5. 核心逻辑加测试
6. 加页面报错上报
7. 如果业务变得越来越复杂，考虑是否引入统一的状态管理


### 扫码输入思路

1. 调用用摄像头，获取视频流
2. 调用 QRcode 库尽实时 parse 视频流的每一帧
3. 根据 parse 的结果，一旦校验通过则关闭视频流，把解析到的码填到输入框内





