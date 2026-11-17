---
title: 员工管理系统
slug: employee-management
summary: 基于 Spring Boot 3 与多模块 Maven 的员工管理 REST API，覆盖认证、CRUD、文件上传与报表。
date: 2026-07-04
cover: /covers/employee-system.svg
tags: [Java, Spring Boot, REST API]
featured: true
priority: 82
role: 后端开发
stack: [Spring Boot, MyBatis, MySQL, JWT, AOP]
repoUrl: https://github.com/3323443925-gif/-Employee-Management-System
highlights:
  - 多模块 Maven 工程：parent、pojo、utils 与主应用分离
  - JWT 无状态认证，拦截器统一鉴权，全局异常处理
  - 使用 PageHelper 分页，接入阿里云 OSS 与统计接口
---

## 背景

这是一个以“把后端基础打牢”为目标的项目：不依赖现成后台模板，从数据库设计开始，手写员工与部门管理的完整接口。

功能不复杂，但覆盖了一个后端服务常见的骨架：认证、参数校验、分页查询、文件上传、异常处理和统计接口。

## 技术栈

| 技术 | 用途 |
| --- | --- |
| Spring Boot 3.5 | RESTful 服务与自动配置 |
| MyBatis | SQL 映射与数据持久化 |
| MySQL 8 | 员工、部门、工作经历与操作日志 |
| JWT | 无状态登录认证 |
| PageHelper | 列表分页 |
| Spring AOP | 统一记录操作日志 |
| 阿里云 OSS | 头像与附件上传 |

## 工程结构

Maven 多模块管理：

- `tlias-parent`：统一依赖版本
- `tails-pojo`：实体类
- `tails-utils`：通用工具
- `manage-project`：控制器、服务、数据访问与配置

这样拆分的直接好处是：实体和工具可以被其他模块复用，依赖版本也不需要在每个模块里重复声明。

## 关键实现

**认证**：登录成功后签发 JWT，后续请求由拦截器解析 Token。服务端不保存会话，接口保持无状态。

**分页与筛选**：员工列表支持按姓名、性别、部门与入职时间组合筛选，分页交给 PageHelper，避免把分页逻辑散落在 SQL 里。

**文件上传**：头像通过 OSS SDK 上传，数据库只保存 URL，不把二进制文件塞进 MySQL。

**统一异常**：控制器不重复写 try-catch，由全局异常处理器把业务异常转换成统一响应。

**报表接口**：按职位与性别统计员工人数，返回前端图表需要的结构。

## 数据库设计

核心是四张表：部门、员工、工作经历与操作日志。员工与部门是多对一，工作经历与员工是一对多。

设计时踩过的一个坑是“删除部门时员工怎么办”。最终选择先校验部门下是否存在员工，存在则拒绝删除，而不是级联删除。

## 复盘

这个项目让我理解了 Spring Boot 项目中各层的职责边界：控制器只处理参数与响应，业务规则放在服务层，SQL 归 MyBatis。

下一步会补上参数校验分组、接口文档和集成测试，让它更接近可以交付的后端服务。
