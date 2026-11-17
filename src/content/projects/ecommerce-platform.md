---
title: GreatWork 电商管理系统
slug: ecommerce-platform
summary: 用 Java Servlet/JSP 与 MySQL 实现的 MVC 电商系统，覆盖商品、购物车、订单与后台管理。
date: 2026-07-04
cover: /covers/ecommerce-system.svg
tags: [Java, Servlet, MySQL]
featured: false
priority: 68
role: 后端开发
stack: [Java 23, Servlet, JSP, MySQL, Maven]
repoUrl: https://github.com/3323443925-gif/E-commerce-platform
highlights:
  - 会员端与管理端分离，按 URL 做权限过滤
  - DAO 工厂与代理模式，统一管理数据库连接
  - SHA-256 加盐存储密码，HttpSession 管理登录态
---

## 背景

在 Spring 之前，我想先弄明白一个 Web 请求到底经过了什么。于是用 Java 23、Servlet 6 和 JSP 写了一个完整的电商管理系统，不借助 Spring 的自动配置。

项目包含会员端与管理端：商品浏览、搜索、购物车、订单、评论，以及后台的商品、类型、会员和订单管理。

## 技术栈

- Java 23 + Jakarta Servlet 6
- JSP + JSTL 负责视图
- MySQL 8 存储数据
- Maven 构建，Tomcat 10 部署
- HTML5 + CSS3 + JavaScript 完成页面交互

## MVC 分层

```text
浏览器
  ↓
Servlet Controller   接收参数、调用业务、选择视图
  ↓
DAO                  执行 SQL、映射实体
  ↓
MySQL
  ↓
JSP + JSTL           渲染页面
```

控制器不直接写 SQL，DAO 不关心页面。分层之后，修改表结构时只需要动数据访问层。

## 设计模式

**DAO 工厂**：`DAOFactory` 统一创建 DAO 实例，调用方不依赖具体实现。

**代理模式**：`DAOProxy` 封装数据库连接的获取、提交与关闭，业务代码不再重复处理连接生命周期。

**过滤器**：`MemberFilter` 与 `ManageFilter` 分别拦截会员端与管理端请求，按 URL 做权限隔离。

这些模式在 Spring 项目里通常由框架代劳。手写一遍之后，再看 MyBatis 与 Spring 的设计，会更容易理解它们解决了什么问题。

## 安全处理

- 密码使用 SHA-256 加随机盐存储，不保存明文
- 登录态放在 HttpSession 中
- 前后台使用独立过滤器，未登录请求直接跳转登录页
- 管理端与会話角色绑定，避免只靠前端隐藏入口

## 复盘

Servlet 项目让我看到框架“消失”的那些工作：请求分发、参数解析、连接管理、事务与视图渲染。

现在再写 Spring Boot，遇到问题时我会先想：如果不用框架，这一步应该由谁完成。这个视角对排查配置与事务问题很有帮助。
