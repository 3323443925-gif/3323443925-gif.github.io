// ---------------------------------------------------------------------------
// 站点全部内容：字符串与数据点均来自旧站 src/lib/site.ts、src/lib/works.ts、
// src/content/projects/*.md、src/content/blog/*.md 与 works/about 页面，原样迁移。
// ---------------------------------------------------------------------------

export const site = {
  name: 'fengfengfeng12',
  monogram: 'FF',
  role: '软件技术 · 后端方向',
  tagline: '从 Java 后端，走向 AI 全栈。',
  intro:
    '软件技术专业学生，主攻 Java 后端。正在把 Spring Boot、MySQL 与 AI 应用结合起来，朝 AI 全栈方向发展。这里记录项目实践、学习路径与踩过的坑。',
  status: '学习 Java 后端与 AI 全栈',
  github: 'https://github.com/3323443925-gif',
  githubHandle: '3323443925-gif',
};

export const nav = [
  { href: '#projects', label: '项目' },
  { href: '#works', label: '作品' },
  { href: '#writing', label: '文章' },
  { href: '#about', label: '关于' },
];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: { pill: 'NOW', text: 'QRveo 进行中', href: '#projects' },
  h1: ['从 Java 后端，', '走向 AI 全栈。'],
  subline: site.intro,
  ctaPrimary: { label: '查看项目', href: '#projects' },
  ctaSecondary: { label: '看看剪辑作品', href: '#works' },
  trust: ['软件技术', '后端方向', 'Java / Spring Boot / MySQL', 'AI 全栈学习中'],
};

export const heroPanels = {
  overview: {
    title: '项目总览',
    chip: '4 个',
    ring: { percent: 100, label: '4 / 4 独立展示页', sub: '点「了解」看完整过程' },
    rows: [
      {
        icon: 'check' as const,
        tone: 'positive' as const,
        label: '校园企业招聘平台',
        meta: '2026',
        chip: { label: '视频演示', tone: 'iris' as const },
        href: '/projects/campus/',
      },
      {
        icon: 'check' as const,
        tone: 'positive' as const,
        label: 'GreatWork 电商管理系统',
        meta: '2026',
        chip: { label: '已完成', tone: 'positive' as const },
        href: '/projects/ecommerce/',
      },
      {
        icon: 'check' as const,
        tone: 'positive' as const,
        label: '员工管理系统',
        meta: '2026',
        chip: { label: '已完成', tone: 'positive' as const },
        href: '/projects/employee/',
      },
      {
        icon: 'dot' as const,
        tone: 'caution' as const,
        label: 'QRveo 视频二维码',
        meta: '2026',
        chip: { label: '进行中', tone: 'caution' as const },
        href: '/projects/qrveo/',
      },
    ],
  },
  stack: {
    label: 'STACK',
    value: 'Java',
    chip: '后端主线',
    items: ['Spring Boot', 'MyBatis', 'MySQL', 'Vue 3', 'Spring AI', 'Git'],
  },
  toast: {
    title: '新文章已发布',
    text: '从 Java 后端出发，我的 AI 全栈学习路线 · 2026.11.12',
    link: { label: 'View', href: '#writing' },
  },
};

// ---------------------------------------------------------------------------
// LogoStrip（代码绘制 wordmark，几何 glyph，无真实品牌 logo）
// ---------------------------------------------------------------------------

export const logoStrip = {
  caption: '日常使用的技术栈，都在真实项目里验证过',
  items: ['Java', 'Spring Boot', 'MySQL', 'MyBatis', 'Vue 3', 'Spring AI', 'Git', 'Linux'],
};

// ---------------------------------------------------------------------------
// Metrics
// ---------------------------------------------------------------------------

export const metrics = [
  { value: 4, label: '公开项目', note: '覆盖 Servlet 与 Spring Boot' },
  { value: 10, label: '剪辑作品', note: '运营期间脚本与剪辑' },
  { value: 3, label: '工程文章', note: '记录设计、取舍与踩坑' },
  { value: 4, label: '角色权限', note: '校招平台一类角色一套菜单' },
];

// ---------------------------------------------------------------------------
// FeatureTabs #projects
// ---------------------------------------------------------------------------

export type ToneChip = { label: string; tone: 'positive' | 'caution' | 'iris' };

export type ProjectPanel =
  | {
      kind: 'checklist';
      header: string;
      headerChip: string;
      groups: { label: string; done: number; total: number }[];
      tasks: { title: string; state: 'done' | 'doing' }[];
    }
  | {
      kind: 'table';
      header: string;
      headerChip: string;
      columns: string[];
      rows: { cells: string[]; status: string }[];
    }
  | {
      kind: 'timeline';
      header: string;
      headerChip: string;
      steps: string[];
    };

export interface ProjectTab {
  id: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  highlights: string[];
  date: string;
  updated: string;
  repoUrl?: string;
  demoUrl?: string;
  video?: { src: string; poster?: string };
  chip: string;
  panel: ProjectPanel;
  body: Block[];
}

export const featureTabs = {
  eyebrow: 'The work',
  h2: '四个项目，四种完整度。',
  sub: '从 Servlet 到 Spring Boot，再到接入 AI 能力与正在做的产品。',
  videoLabel: '演示视频',
  demoLabel: '线上站点',
  repoLabel: '代码仓库',
  learnLabel: '了解详情',
};

export const projects: ProjectTab[] = [
  {
    id: 'qrveo',
    title: 'QRveo 视频二维码平台',
    summary: '正在做的西语市场视频二维码平台：上传视频生成二维码，替换内容无需重印。',
    role: '开发 / 产品',
    stack: ['HTML', 'JavaScript', 'Cloudflare', 'i18n'],
    highlights: [
      '上传产品视频生成可印刷二维码，换视频不用换码',
      '扫码即播，无需安装 App，播放页无广告',
      '西语 / 英语双语页面，支持私有化部署',
    ],
    date: '2026-11-19',
    updated: '2026-11-20',
    demoUrl: 'https://lwcqr.qrveo.com/',
    chip: '西语市场 · 视频二维码',
    panel: {
      kind: 'checklist',
      header: '当前进展',
      headerChip: '4 项已完成 · 1 项进行中',
      groups: [
        { label: '已完成', done: 4, total: 4 },
        { label: '进行中', done: 1, total: 3 },
        { label: '下一步', done: 0, total: 2 },
      ],
      tasks: [
        { title: '西语主站', state: 'done' },
        { title: '英语版本', state: 'done' },
        { title: '移动端适配', state: 'done' },
        { title: '核心 SEO 结构', state: 'done' },
        { title: '内容本地化与转化路径', state: 'doing' },
      ],
    },
    body: [
      { type: 'h2', text: '项目概览' },
      {
        type: 'p',
        text: 'QRveo 是一个面向西语市场的视频二维码平台。商家把产品视频上传后生成二维码，印在包装、说明书上，或直接分享到 WhatsApp；顾客扫码即可在浏览器里观看视频，不需要安装任何 App。',
      },
      {
        type: 'p',
        text: '和普通二维码相比，二维码指向的是稳定的播放页，而不是一次性视频文件。需要更新内容时，替换视频即可，已经印在包装上的二维码继续有效。',
      },
      { type: 'h2', text: '核心流程' },
      {
        type: 'ol',
        items: [
          '上传产品视频，补充标题和简短说明',
          '生成二维码，贴到包装或分享链接',
          '顾客扫码，在浏览器中直接播放',
          '需要更新时替换视频，二维码保持不变',
        ],
      },
      { type: 'h2', text: '使用场景' },
      {
        type: 'ul',
        items: [
          '**产品包装**：扫码查看安装视频、使用演示或售后说明',
          '**说明书与售后卡**：视频更新后不需要重新印刷',
          '**WhatsApp / SMS**：直接发送二维码图片或播放链接',
          '**门店物料**：海报、展架、样品标签都可以复用同一个码',
        ],
      },
      { type: 'h2', text: '产品细节' },
      {
        type: 'ul',
        items: [
          '播放页无广告，打开即可观看',
          '支持 WhatsApp、SMS 等渠道分享',
          '支持私有化部署，内容放在客户自己的服务器',
          '分析统计为可选项，用户同意后才加载',
          '页面提供西班牙语 / 英语两种语言',
        ],
      },
      { type: 'h2', text: '技术与实现' },
      {
        type: 'ul',
        items: [
          '页面以静态 HTML 与原生 JavaScript 构建，按 `es-MX` / `en-US` 拆分语言版本',
          '使用 Cloudflare 提供 CDN、缓存与基础安全防护',
          '每个页面有独立的标题、描述、`hreflang` 与结构化数据，方便搜索引擎理解',
          '分析脚本默认不加载，只在用户同意后启用，避免影响首屏',
          '二维码指向稳定的播放页，视频替换不会影响已经印刷出去的码',
        ],
      },
      { type: 'h2', text: '当前进展' },
      {
        type: 'p',
        text: '已完成西语主站、英语版本、移动端适配和核心 SEO 结构。目前主要在完善内容本地化、转化路径与真实使用场景的验证，比如包装、说明书和门店物料上的扫码体验。',
      },
      {
        type: 'p',
        text: '下一步会补充案例与帮助内容，并持续优化扫码后的播放速度与页面可读性。',
      },
    ],
  },
  {
    id: 'campus',
    title: '校园企业招聘平台',
    summary: '面向学生、HR、教师与管理员的一站式校园招聘平台，把 Java 后端与 AI 能力接进完整流程。',
    role: '全栈开发',
    stack: ['Spring Boot', 'Vue 3', 'MyBatis', 'MySQL', 'Spring AI'],
    highlights: [
      '四类角色 + JWT 后端鉴权，覆盖完整招聘流程',
      'Spring AI 接入 DeepSeek：简历分析、筛选与 AI 面试',
      '前后端分离 + OSS 文件存储，前端已部署演示',
    ],
    date: '2026-07-04',
    updated: '2026-11-20',
    repoUrl: 'https://github.com/3323443925-gif/Campus-Enterprise-Job-Platform',
    video: {
      src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/%E6%A0%A1%E4%BC%81%E6%8B%9B%E8%81%98%E5%B9%B3%E5%8F%B0.mp4',
      poster: '/videos/campus-demo.jpg',
    },
    chip: 'JWT 后端统一鉴权',
    panel: {
      kind: 'table',
      header: '四类角色',
      headerChip: '4 类角色 · 一套流程',
      columns: ['角色', '主要动作', '状态'],
      rows: [
        { cells: ['学生', '维护简历、浏览岗位、投递、查看面试通知'], status: '已实现' },
        { cells: ['HR', '企业认证、发布岗位、查看简历、发起面试'], status: '已实现' },
        { cells: ['教师', '审核企业入驻与岗位、查看学生投递情况'], status: '已实现' },
        { cells: ['管理员', '用户与专业管理、企业审核、就业数据统计'], status: '已实现' },
      ],
    },
    body: [
      { type: 'h2', text: '背景' },
      {
        type: 'p',
        text: '校园招聘的日常流程通常散落在表格、群聊和线下沟通里：学生找岗位，HR 收简历，教师审核企业，管理员做统计。信息在不同角色之间反复转发，状态很难追踪。',
      },
      {
        type: 'p',
        text: '这个项目把这些环节放进同一套系统，覆盖从岗位发布、简历投递、面试安排到就业统计的完整流程。',
      },
      { type: 'h2', text: '四类角色' },
      {
        type: 'table',
        headers: ['角色', '主要动作'],
        rows: [
          ['学生', '维护简历、浏览岗位、投递、查看面试通知'],
          ['HR', '企业认证、发布岗位、查看简历、发起面试'],
          ['教师', '审核企业入驻与岗位、查看学生投递情况'],
          ['管理员', '用户与专业管理、企业审核、就业数据统计'],
        ],
      },
      {
        type: 'p',
        text: '角色不同，看到的菜单和可调用的接口也不同。权限不是前端隐藏按钮，而是在后端通过 JWT 与拦截器统一校验。',
      },
      { type: 'h2', text: '系统结构' },
      {
        type: 'ul',
        items: [
          '后端：Spring Boot 3.5 + MyBatis + MySQL',
          '前端：Vue 3 + Element Plus + ECharts + Vite',
          '认证：JWT Token + 请求拦截器',
          '文件：阿里云 OSS 存储简历与附件',
          'AI：Spring AI 接入 DeepSeek API',
        ],
      },
      {
        type: 'p',
        text: '工程采用 Maven 多模块拆分：`pojo` 放实体，`utils` 放通用工具，`end-project` 承载控制器、服务与数据访问。这样依赖版本和公共代码只维护一份。',
      },
      { type: 'h2', text: 'AI 能力落在哪里' },
      { type: 'p', text: '我没有把大模型做成一个通用聊天框，而是限制在三个具体场景：' },
      {
        type: 'ol',
        items: [
          '**简历分析**：解析简历文本，输出结构化字段与改进建议。',
          '**简历筛选**：根据岗位要求给出匹配度参考，帮助 HR 排序。',
          '**AI 面试**：按岗位生成问题，记录候选人的回答。',
        ],
      },
      {
        type: 'p',
        text: '所有 AI 结果都作为建议展示，最终决定仍然由人完成。模型输出使用结构化格式并做校验，解析失败时回退到普通文本，不阻塞主流程。',
      },
      { type: 'h2', text: '权限与状态如何落地' },
      {
        type: 'ul',
        items: [
          'JWT 中携带用户标识与角色，拦截器统一校验，不依赖前端隐藏按钮',
          '学生、HR、教师、管理员看到不同菜单，接口权限在后端判断',
          '企业认证、岗位审核、投递与面试按状态推进，避免一个字段承担多种含义',
        ],
      },
      { type: 'h2', text: '难点与取舍' },
      {
        type: 'p',
        text: '**权限与状态**：四类角色交叉，投递、面试、录用又是多段状态。先把角色与状态画清楚，再写接口，比边写边加字段更省事。',
      },
      {
        type: 'p',
        text: '**AI 的不确定性**：同一个简历可能得到不同的分析结果。我的处理是把 AI 放在流程的辅助位置，不参与权限判断，也不直接写数据库。',
      },
      {
        type: 'p',
        text: '**前后端联调**：接口先定字段与错误码，再并行开发页面，能减少大量返工。',
      },
      { type: 'h2', text: '复盘' },
      {
        type: 'p',
        text: '这个项目让我第一次完整走完“需求拆解 → 数据建模 → 接口设计 → 前后端联调 → 部署”的流程。相比单独写 CRUD，更难的是想清楚角色、状态和异常路径。',
      },
      {
        type: 'p',
        text: '下一步会补充自动化测试与更细的权限用例，并继续观察 AI 功能在真实使用中的边界。',
      },
      { type: 'h2', text: '结果与下一步' },
      {
        type: 'p',
        text: '从岗位发布、简历投递到面试安排的主流程已经跑通，完整操作见演示视频。',
      },
      {
        type: 'p',
        text: '下一步会补上自动化测试、异常路径与更细的权限用例，并把 AI 输出失败时的回退行为覆盖到测试里。',
      },
    ],
  },
  {
    id: 'ecommerce',
    title: 'GreatWork 电商管理系统',
    summary: '用 Java Servlet/JSP 与 MySQL 实现的 MVC 电商系统，覆盖商品、购物车、订单与后台管理。',
    role: '后端开发',
    stack: ['Java 23', 'Servlet', 'JSP', 'MySQL', 'Maven'],
    highlights: [
      'Servlet + JSP 手写 MVC，会员端 / 管理端分离',
      'DAO 工厂 + 代理统一管理连接与提交',
      'SHA-256 加盐 + Session + 过滤器鉴权',
    ],
    date: '2026-07-04',
    updated: '2026-11-20',
    repoUrl: 'https://github.com/3323443925-gif/E-commerce-platform',
    video: {
      src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/%E6%BC%94%E7%A4%BA%E8%A7%86%E9%A2%91.mp4',
      poster: '/videos/ecommerce-demo.jpg',
    },
    chip: 'Servlet + MVC 手写框架',
    panel: {
      kind: 'table',
      header: '功能模块',
      headerChip: '会员端 / 管理端',
      columns: ['端', '主要功能', '状态'],
      rows: [
        { cells: ['会员端', '注册登录、商品浏览与搜索、购物车、订单、评论'], status: '已实现' },
        { cells: ['管理端', '商品管理、类型管理、会员管理、订单管理'], status: '已实现' },
      ],
    },
    body: [
      { type: 'h2', text: '背景' },
      {
        type: 'p',
        text: '在 Spring 之前，我想先弄明白一个 Web 请求到底经过了什么。于是用 Java 23、Servlet 6 和 JSP 写了一个完整的电商管理系统，不借助 Spring 的自动配置。',
      },
      {
        type: 'p',
        text: '项目包含会员端与管理端：商品浏览、搜索、购物车、订单、评论，以及后台的商品、类型、会员和订单管理。',
      },
      { type: 'h2', text: '功能模块' },
      {
        type: 'table',
        headers: ['端', '主要功能'],
        rows: [
          ['会员端', '注册登录、商品浏览与搜索、购物车、订单、评论'],
          ['管理端', '商品管理、类型管理、会员管理、订单管理'],
        ],
      },
      { type: 'p', text: '两个端共用同一套 DAO 与实体，但在入口处用不同的过滤器隔离权限。' },
      { type: 'h2', text: '技术栈' },
      {
        type: 'ul',
        items: [
          'Java 23 + Jakarta Servlet 6',
          'JSP + JSTL 负责视图',
          'MySQL 8 存储数据',
          'Maven 构建，Tomcat 10 部署',
          'HTML5 + CSS3 + JavaScript 完成页面交互',
        ],
      },
      { type: 'h2', text: 'MVC 分层' },
      {
        type: 'code',
        lang: 'text',
        text: '浏览器\n  ↓\nServlet Controller   接收参数、调用业务、选择视图\n  ↓\nDAO                  执行 SQL、映射实体\n  ↓\nMySQL\n  ↓\nJSP + JSTL           渲染页面',
      },
      {
        type: 'p',
        text: '控制器不直接写 SQL，DAO 不关心页面。分层之后，修改表结构时只需要动数据访问层。',
      },
      { type: 'h2', text: '设计模式' },
      { type: 'p', text: '**DAO 工厂**：`DAOFactory` 统一创建 DAO 实例，调用方不依赖具体实现。' },
      {
        type: 'p',
        text: '**代理模式**：`DAOProxy` 封装数据库连接的获取、提交与关闭，业务代码不再重复处理连接生命周期。',
      },
      {
        type: 'p',
        text: '**过滤器**：`MemberFilter` 与 `ManageFilter` 分别拦截会员端与管理端请求，按 URL 做权限隔离。',
      },
      {
        type: 'p',
        text: '这些模式在 Spring 项目里通常由框架代劳。手写一遍之后，再看 MyBatis 与 Spring 的设计，会更容易理解它们解决了什么问题。',
      },
      { type: 'h2', text: '安全处理' },
      {
        type: 'ul',
        items: [
          '密码使用 SHA-256 加随机盐存储，不保存明文',
          '登录态放在 HttpSession 中',
          '前后台使用独立过滤器，未登录请求直接跳转登录页',
          '管理端与会话角色绑定，避免只靠前端隐藏入口',
        ],
      },
      { type: 'h2', text: '复盘' },
      {
        type: 'p',
        text: 'Servlet 项目让我看到框架“消失”的那些工作：请求分发、参数解析、连接管理、事务与视图渲染。',
      },
      {
        type: 'p',
        text: '现在再写 Spring Boot，遇到问题时我会先想：如果不用框架，这一步应该由谁完成。这个视角对排查配置与事务问题很有帮助。',
      },
      { type: 'h2', text: '可改进' },
      {
        type: 'ul',
        items: [
          '**订单与库存**：把下单、扣库存和订单状态变更的边界写清楚，补上并发场景的约束',
          '**测试**：增加单元测试与集成测试，覆盖登录、下单和后台权限',
          '**连接管理**：进一步整理 DAO 代理里的连接生命周期，降低后续维护成本',
        ],
      },
    ],
  },
  {
    id: 'employee',
    title: '员工管理系统',
    summary: '基于 Spring Boot 3 与多模块 Maven 的员工管理 REST API，覆盖认证、CRUD、文件上传与报表。',
    role: '后端开发',
    stack: ['Spring Boot', 'MyBatis', 'MySQL', 'JWT', 'AOP'],
    highlights: [
      '多模块 Maven + Spring Boot 3.5，按职责拆分工程',
      'JWT + 拦截器统一鉴权，全局异常处理',
      'PageHelper 分页、OSS 上传与统计接口',
    ],
    date: '2026-07-04',
    updated: '2026-11-20',
    repoUrl: 'https://github.com/3323443925-gif/-Employee-Management-System',
    chip: 'CRUD + 权限矩阵',
    panel: {
      kind: 'timeline',
      header: '接口与鉴权流程',
      headerChip: '无状态 · JWT',
      steps: [
        '登录接口校验账号与密码，签发 JWT',
        '拦截器解析 Token，校验通过后放行请求',
        '控制器只负责参数与响应，业务规则放在服务层',
        '全局异常处理器把业务异常转换成统一响应',
      ],
    },
    body: [
      { type: 'h2', text: '背景' },
      {
        type: 'p',
        text: '这是一个以“把后端基础打牢”为目标的项目：不依赖现成后台模板，从数据库设计开始，手写员工与部门管理的完整接口。',
      },
      {
        type: 'p',
        text: '功能不复杂，但覆盖了一个后端服务常见的骨架：认证、参数校验、分页查询、文件上传、异常处理和统计接口。',
      },
      { type: 'h2', text: '技术栈' },
      {
        type: 'table',
        headers: ['技术', '用途'],
        rows: [
          ['Spring Boot 3.5', 'RESTful 服务与自动配置'],
          ['MyBatis', 'SQL 映射与数据持久化'],
          ['MySQL 8', '员工、部门、工作经历与操作日志'],
          ['JWT', '无状态登录认证'],
          ['PageHelper', '列表分页'],
          ['Spring AOP', '统一记录操作日志'],
          ['阿里云 OSS', '头像与附件上传'],
        ],
      },
      { type: 'h2', text: '工程结构' },
      { type: 'p', text: 'Maven 多模块管理：' },
      {
        type: 'ul',
        items: [
          '`tlias-parent`：统一依赖版本',
          '`tails-pojo`：实体类',
          '`tails-utils`：通用工具',
          '`manage-project`：控制器、服务、数据访问与配置',
        ],
      },
      {
        type: 'p',
        text: '这样拆分的直接好处是：实体和工具可以被其他模块复用，依赖版本也不需要在每个模块里重复声明。',
      },
      { type: 'h2', text: '关键实现' },
      {
        type: 'p',
        text: '**认证**：登录成功后签发 JWT，后续请求由拦截器解析 Token。服务端不保存会话，接口保持无状态。',
      },
      {
        type: 'p',
        text: '**分页与筛选**：员工列表支持按姓名、性别、部门与入职时间组合筛选，分页交给 PageHelper，避免把分页逻辑散落在 SQL 里。',
      },
      {
        type: 'p',
        text: '**文件上传**：头像通过 OSS SDK 上传，数据库只保存 URL，不把二进制文件塞进 MySQL。',
      },
      {
        type: 'p',
        text: '**统一异常**：控制器不重复写 try-catch，由全局异常处理器把业务异常转换成统一响应。',
      },
      { type: 'p', text: '**报表接口**：按职位与性别统计员工人数，返回前端图表需要的结构。' },
      { type: 'h2', text: '接口与鉴权流程' },
      {
        type: 'ol',
        items: [
          '登录接口校验账号与密码，签发 JWT',
          '拦截器解析 Token，校验通过后放行请求',
          '控制器只负责参数与响应，业务规则放在服务层',
          '全局异常处理器把业务异常转换成统一响应',
        ],
      },
      { type: 'h2', text: '数据库设计' },
      {
        type: 'p',
        text: '核心是四张表：部门、员工、工作经历与操作日志。员工与部门是多对一，工作经历与员工是一对多。',
      },
      {
        type: 'p',
        text: '设计时踩过的一个坑是“删除部门时员工怎么办”。最终选择先校验部门下是否存在员工，存在则拒绝删除，而不是级联删除。',
      },
      { type: 'h2', text: '复盘' },
      {
        type: 'p',
        text: '这个项目让我理解了 Spring Boot 项目中各层的职责边界：控制器只处理参数与响应，业务规则放在服务层，SQL 归 MyBatis。',
      },
      {
        type: 'p',
        text: '下一步会补上参数校验分组、接口文档和集成测试，让它更接近可以交付的后端服务。',
      },
      { type: 'h2', text: '可改进' },
      {
        type: 'ul',
        items: [
          '**参数校验分组**：新增与修改使用不同规则，避免一套校验到处复用',
          '**接口文档**：补 OpenAPI，减少前后端联调时的口头确认',
          '**集成测试**：覆盖登录、分页、上传与“删除部门”的边界情况',
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Platform bento #stack
// ---------------------------------------------------------------------------

export type CodeToken = { t: string; c?: 'comment' | 'keyword' | 'string' | 'fn' | 'num' };

export const platform = {
  eyebrow: 'Stack',
  h2: '技术栈，都在真实项目里。',
  sub: '不追新，先把每一样工具用扎实，再谈组合。',
  card1: {
    title: '12 个常用工具与框架',
    text: '都在真实项目里用过，而不是停留在教程里。',
    tiles: [
      { icon: 'code', label: 'Spring Boot' },
      { icon: 'database', label: 'MyBatis' },
      { icon: 'database', label: 'MySQL' },
      { icon: 'layers', label: 'Vue 3' },
      { icon: 'brain', label: 'Spring AI' },
      { icon: 'sparkles', label: 'DeepSeek' },
      { icon: 'key', label: 'JWT' },
      { icon: 'cloud', label: 'OSS' },
      { icon: 'branch', label: 'Git' },
      { icon: 'package', label: 'Maven' },
      { icon: 'terminal', label: 'Linux' },
      { icon: 'send', label: 'Postman' },
    ],
  },
  card2: {
    title: '代码窗口：JWT 拦截器',
    text: '权限校验统一放在拦截器，控制器保持干净。',
    tab: 'JwtInterceptor.java',
    note: 'Maven 多模块 · pojo / utils / end-project',
    code: [
      [{ t: '// 拦截器统一校验 JWT 与角色', c: 'comment' as const }],
      [
        { t: 'String', c: 'keyword' as const },
        { t: ' token = request' },
        { t: '.getHeader', c: 'fn' as const },
        { t: '(' },
        { t: '"Authorization"', c: 'string' as const },
        { t: ');' },
      ],
      [
        { t: 'Claims', c: 'keyword' as const },
        { t: ' claims = JwtUtils' },
        { t: '.parse', c: 'fn' as const },
        { t: '(token);' },
      ],
      [
        { t: 'String', c: 'keyword' as const },
        { t: ' role = claims' },
        { t: '.get', c: 'fn' as const },
        { t: '(' },
        { t: '"role"', c: 'string' as const },
        { t: ', ' },
        { t: 'String', c: 'keyword' as const },
        { t: '.' },
        { t: 'class', c: 'fn' as const },
        { t: ');' },
      ],
      [
        { t: 'return', c: 'keyword' as const },
        { t: ' RoleAllow' },
        { t: '.matches', c: 'fn' as const },
        { t: '(role, request' },
        { t: '.getRequestURI', c: 'fn' as const },
        { t: '());' },
      ],
    ] as CodeToken[][],
  },
  card3: {
    title: '工程实践',
    text: '项目里反复验证过的做法，直接落进代码。',
    chips: [
      'JWT 统一鉴权',
      '状态驱动流程',
      'AI 结构化输出与回退',
      '前后端分离',
      'OSS 文件存储',
      '接口先定字段与错误码',
    ],
  },
};

// ---------------------------------------------------------------------------
// Works #works（10 条作品，OSS 视频）
// ---------------------------------------------------------------------------

export interface Work {
  title: string;
  src: string;
}

export const works: Work[] = [
  { title: '运营短片 01', src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/10.mp4' },
  { title: '运营短片 02', src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/9%E6%94%B9.mp4' },
  { title: '运营短片 03', src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/8.1.mp4' },
  { title: '运营短片 04', src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/7.mp4' },
  { title: '运营短片 05', src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/6.mp4' },
  { title: '运营短片 06', src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/5.mp4' },
  { title: '运营短片 07', src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/5.1.mp4' },
  { title: '运营短片 08', src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/4.mp4' },
  { title: '运营短片 09', src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/3.mp4' },
  {
    title: '运营短片 10',
    src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/%E7%AC%AC%E4%B8%80%E5%A4%A92.mp4',
  },
];

export const worksSection = {
  eyebrow: 'Editing · Script',
  h2: '剪辑 / 脚本：把信息剪成节奏。',
  sub: '运营期间 10 条短片：从选题、脚本到剪辑、字幕与成片包装。',
  craftQuote: '先让信息站住，再让节奏好看。',
  craft: [
    {
      num: '01',
      title: '脚本',
      text: '先确定受众和目标，再写开头 3 秒、信息层级与收尾动作。让观众知道为什么继续看。',
    },
    {
      num: '02',
      title: '剪辑',
      text: '按信息密度取舍镜头，用字幕、音乐和转场控制节奏。删掉不影响表达的段落。',
    },
    {
      num: '03',
      title: '包装',
      text: '按发布平台调整画幅、封面、标题与时长，让成片适配具体的观看场景。',
    },
  ],
  foot: ['点击封面播放 · 视频按需加载', '10 条作品 · 持续更新'],
};

export interface VideoItem {
  index: string;
  title: string;
  src: string;
  poster?: string;
}

export const demoVideos = {
  campus: {
    index: 'DEMO 01',
    title: '校园企业招聘平台 · 演示',
    src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/%E6%A0%A1%E4%BC%81%E6%8B%9B%E8%81%98%E5%B9%B3%E5%8F%B0.mp4',
    poster: '/videos/campus-demo.jpg',
  },
  ecommerce: {
    index: 'DEMO 02',
    title: 'GreatWork 电商管理系统 · 演示',
    src: 'https://ssfeng-java-ai.oss-cn-beijing.aliyuncs.com/%E6%BC%94%E7%A4%BA%E8%A7%86%E9%A2%91.mp4',
    poster: '/videos/ecommerce-demo.jpg',
  },
};

// ---------------------------------------------------------------------------
// Writing #writing（三篇文章全文，手工结构化为块数组）
// ---------------------------------------------------------------------------

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'quote'; text: string }
  | { type: 'code'; lang: string; text: string };

export interface Article {
  slug: string;
  title: string;
  summary: string;
  date: string;
  minutes: number;
  blocks: Block[];
}

export const writing = {
  h2: '文章，全文在读。',
  text: '三篇工程记录：学习路线、平台设计与 Servlet 取舍。',
};

export const articles: Article[] = [
  {
    slug: 'ai-fullstack-roadmap',
    title: '从 Java 后端出发，我的 AI 全栈学习路线',
    summary: '后端学生补 AI 全栈，不是再学一个框架，而是把模型接进完整系统。',
    date: '2026.11.12',
    minutes: 3,
    blocks: [
      { type: 'h2', text: '为什么是 AI 全栈' },
      {
        type: 'p',
        text: '我目前的专业方向偏后端，主力语言是 Java。选择 AI 全栈，不是因为前端或算法更热，而是因为我发现：只会写接口，很难独立把一个智能应用交付出去。',
      },
      {
        type: 'p',
        text: '反过来，只会上层调用模型，不了解后端的数据、权限与稳定性，也没法把它做成能用的产品。两端都懂一点，才能独立跑通一个完整系统。',
      },
      { type: 'h2', text: '我正在补的五层能力' },
      {
        type: 'ol',
        items: [
          '**Java 后端**：Spring Boot、MyBatis、REST API 设计，把业务规则写清楚。',
          '**数据库**：表结构、索引与事务，理解数据如何被读写和约束。',
          '**AI 应用层**：通过 Spring AI 接入大模型，处理提示词、结构化输出与失败回退。',
          '**前端交付**：Vue 3 与基础页面能力，至少能独立完成管理端。',
          '**部署与工程化**：Maven、Git、Linux、日志与构建流程。',
        ],
      },
      {
        type: 'p',
        text: '这五层不需要同时精通，但每一层都要能动手。我的判断标准很朴素：给我一个需求，能不能从数据库一路做到页面。',
      },
      { type: 'h2', text: '用项目驱动' },
      {
        type: 'p',
        text: '单纯看教程很容易停在“我看懂了”。校园招聘平台就是我的练习场：四类角色、完整投递流程，再加上简历分析与 AI 面试。',
      },
      { type: 'p', text: '在项目里，AI 不是独立模块，而是嵌在流程中的一个辅助环节：' },
      {
        type: 'ul',
        items: [
          '简历分析结果用结构化格式返回，便于后端校验',
          '筛选建议只做排序参考，不替 HR 做决定',
          '模型调用失败时回退到普通流程，不阻塞投递',
        ],
      },
      { type: 'p', text: '这些设计比“接一个 API”更接近真实工程。' },
      { type: 'h2', text: '不急着追新框架' },
      {
        type: 'p',
        text: '后端基础仍然优先。数据结构、网络、数据库这些内容不会因为 AI 热潮而过时，反而决定了系统能走多远。',
      },
      {
        type: 'p',
        text: '我的节奏是：先把 Java 后端写扎实，再用 AI 能力做增量。每学一个新东西，都尽量放进已有项目里验证，而不是另起一个只跑得起来的 Demo。',
      },
      { type: 'h2', text: '接下来' },
      {
        type: 'p',
        text: '下一步会补自动化测试、接口文档与简单的 RAG 检索，把“能演示”推进到“能维护”。这条路线还在走，文章也会持续更新。',
      },
    ],
  },
  {
    slug: 'campus-platform-design',
    title: '校园招聘平台：四类角色与 AI 面试的设计取舍',
    summary: '招聘系统的难点不只在接口，而在角色、状态和 AI 输出的边界。',
    date: '2026.10.29',
    minutes: 3,
    blocks: [
      { type: 'h2', text: '四类角色不是四个菜单' },
      { type: 'p', text: '学生、HR、教师、管理员，看起来只是四套页面，实际是四套权限与流程。' },
      {
        type: 'p',
        text: '同一个“岗位”对象，学生只能浏览已审核的，HR 只能操作自己企业的，教师负责审核，管理员能看到全部。如果只在页面层做判断，接口迟早会被绕过。',
      },
      {
        type: 'p',
        text: '我的做法是把角色写进登录态，由拦截器统一校验，再在服务层按角色过滤数据。前端菜单只是结果，不是权限本身。',
      },
      { type: 'h2', text: '状态需要提前画出来' },
      { type: 'p', text: '招聘流程包含多个状态：' },
      {
        type: 'ul',
        items: ['岗位：待审核 → 已发布 → 已下线', '投递：已投递 → 已查看 → 面试中 → 已录用 / 未通过'],
      },
      {
        type: 'p',
        text: '如果状态只靠一个字段硬编码，后面每加一个环节都会牵动所有页面。我先把状态与允许的流转列成表，再写接口，异常路径会清楚很多。',
      },
      { type: 'h2', text: '把 AI 放在辅助位置' },
      {
        type: 'p',
        text: '项目中接入了 Spring AI 与 DeepSeek，用于简历分析、筛选参考与 AI 面试。三个场景有一个共同原则：AI 不参与权限判断，也不直接改业务状态。',
      },
      { type: 'p', text: '具体处理包括：' },
      {
        type: 'ul',
        items: [
          '模型输出使用结构化格式，后端做字段校验',
          '分析结果只展示为建议，最终决定由 HR 或教师完成',
          '调用失败时回退到普通文本，不阻塞主流程',
          '面试对话单独存储，不覆盖简历原文',
        ],
      },
      { type: 'p', text: '这样做并不“智能”，但系统更可控。对招聘这类涉及他人机会的场景，可控比炫技重要。' },
      { type: 'h2', text: '一次取舍' },
      {
        type: 'p',
        text: '我最初想让 AI 自动给简历打分并排序。后来放弃了：评分标准难以解释，不同岗位也不该用同一把尺子。',
      },
      { type: 'p', text: '最终改成按岗位要求给出匹配要点，让 HR 自己判断。系统提供信息，不替人做决定。' },
      { type: 'h2', text: '下一步' },
      {
        type: 'p',
        text: '接下来会补权限用例测试、状态流转校验与更清晰的接口文档。AI 部分则先观察真实使用中的偏差，再决定是否调整提示词与模型。',
      },
    ],
  },
  {
    slug: 'why-build-servlet-project',
    title: 'Servlet 项目还值得做吗：一次 MVC 与设计模式练习',
    summary: '不用 Spring 写完一个电商系统后，我才真正看懂框架替我做了什么。',
    date: '2026.08.16',
    minutes: 3,
    blocks: [
      { type: 'h2', text: '为什么还做 Servlet' },
      {
        type: 'p',
        text: '在学完 Spring Boot 之后，我回头用 Servlet + JSP 写了一个电商系统。原因很简单：我想知道不用框架时，一个请求到底发生了什么。',
      },
      { type: 'p', text: '这个项目没有自动配置，没有依赖注入，也没有现成的分页插件。每个环节都要自己接起来。' },
      { type: 'h2', text: 'MVC 在代码里长什么样' },
      { type: 'p', text: '项目按控制器、数据访问、实体与视图分层：' },
      {
        type: 'code',
        lang: 'text',
        text: 'Servlet Controller → DAO → MySQL\n        ↓\n   JSP + JSTL 渲染',
      },
      { type: 'p', text: '控制器只负责接收参数、调用业务和选择视图；DAO 负责 SQL 与实体映射；JSP 只做展示。' },
      {
        type: 'p',
        text: '分层的好处不是“看起来规范”，而是修改某一层时，其他层不用跟着改。比如换表结构，只需要调整 DAO。',
      },
      { type: 'h2', text: '设计模式不是背出来的' },
      { type: 'p', text: '项目里用了三种模式：' },
      {
        type: 'ul',
        items: [
          '**DAO 工厂**：统一创建数据访问对象',
          '**代理模式**：封装数据库连接的获取与关闭',
          '**过滤器**：拦截会员端与管理端请求，做登录与权限校验',
        ],
      },
      {
        type: 'p',
        text: '写的时候才发现，这些模式解决的都是具体问题：不想让业务代码重复处理连接，不想让控制器依赖具体实现，不想在每个页面里判断登录状态。',
      },
      { type: 'h2', text: '安全意识是被逼出来的' },
      { type: 'p', text: '没有框架帮忙，很多细节必须自己处理：' },
      {
        type: 'ul',
        items: [
          '密码用 SHA-256 加盐存储',
          '登录态放在 HttpSession',
          '管理端与会员端使用独立过滤器',
          '未登录请求直接跳转，而不是只隐藏按钮',
        ],
      },
      { type: 'p', text: '这些做法并不完美，但让我理解了“权限控制”必须发生在服务端。' },
      { type: 'h2', text: '回到 Spring' },
      {
        type: 'p',
        text: '做完这个项目，再使用 Spring Boot，视角发生了变化：自动配置、拦截器、事务管理、视图解析，这些“黑盒”都能对应到具体环节。',
      },
      { type: 'p', text: '框架不是魔法，它只是把重复工作封装起来。理解封装之前的样子，遇到问题时才更容易定位。' },
      { type: 'h2', text: '适合谁' },
      {
        type: 'p',
        text: '如果你已经能用框架完成项目，但说不清请求链路，我建议花两周手写一个小型 Servlet 项目。它不会让简历更亮眼，但会让基础更结实。',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// About #about
// ---------------------------------------------------------------------------

export const about = {
  eyebrow: 'About',
  h2: '关于我。',
  profile: {
    facts: [
      { dt: '状态', dd: '在读学生' },
      { dt: '方向', dd: 'Java 后端 · AI 全栈' },
      { dt: 'GitHub', dd: '@3323443925-gif', href: site.github },
      { dt: '本站', dd: 'Vite · GitHub Pages' },
    ],
  },
  skills: [
    { dt: '语言', dd: 'Java / SQL / JavaScript / Python（学习中）' },
    { dt: '后端', dd: 'Spring Boot / MyBatis / Servlet / RESTful API' },
    { dt: '数据', dd: 'MySQL / JDBC / 数据库设计' },
    { dt: 'AI 应用', dd: 'Spring AI / DeepSeek API / 结构化输出' },
    { dt: '工具', dd: 'Git / Maven / Linux / Postman' },
  ],
  timeline: [
    {
      time: '现在',
      title: '软件技术专业 · 在读',
      text: '系统学习 Java、数据库与后端工程，目标方向是 AI 全栈开发。',
    },
    {
      time: '2026',
      title: '项目实践',
      text: '完成校园招聘平台、员工管理系统与电商系统三个 Java 项目，覆盖 Servlet 与 Spring Boot；目前在做面向西语市场的视频二维码产品 QRveo。',
    },
    {
      time: '持续',
      title: '工程基础',
      text: '数据结构、计算机网络、操作系统与 Git，边学边用，尽量放进真实项目里验证。',
    },
  ],
};

// ---------------------------------------------------------------------------
// FinalCta #contact
// ---------------------------------------------------------------------------

export const finalCta = {
  h2: '有项目、文章或想法，欢迎聊聊。',
  sub: '不在页面上公开邮箱。可以通过 GitHub 找到我，或在任意仓库提 Issue。',
  primary: { label: '前往 GitHub', href: site.github },
  secondary: { label: '看看文章', href: '#writing' },
  note: '软件技术 · 在读 · 目标 AI 全栈',
  chipTop: '持续更新',
  chipBottom: 'GitHub Pages · 已上线',
};

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footer = {
  blurb: 'fengfengfeng12 · 从 Java 后端，走向 AI 全栈。',
  status: '持续更新中',
  hosting: 'Hosted on GitHub Pages',
  columns: [
    {
      heading: '站内',
      links: [
        { label: '项目', href: '#projects' },
        { label: '作品', href: '#works' },
        { label: '文章', href: '#writing' },
        { label: '关于', href: '#about' },
      ],
    },
    {
      heading: '项目',
      links: [
        { label: 'QRveo 视频二维码平台', href: '#projects' },
        { label: '校园企业招聘平台', href: '#projects' },
        { label: 'GreatWork 电商管理系统', href: '#projects' },
        { label: '员工管理系统', href: '#projects' },
      ],
    },
    {
      heading: '联系',
      links: [
        { label: '联系我', href: '#contact' },
        { label: 'GitHub ↗', href: site.github, external: true },
        { label: '文章', href: '#writing' },
      ],
    },
  ],
  copyright: '© 2026 fengfengfeng12',
  credit: {
    label: 'Template by VibeFather',
    href: 'https://vibefather.ai/t/webgl-gradient-saas-landing-page',
  },
};
