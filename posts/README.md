# 如何添加新的博客文章

本网站采用博客式的新闻系统，每篇文章都是一个独立的Markdown文件。

## 📝 添加新文章的步骤

### 1. 创建Markdown文件

在 `posts/` 目录下创建新的 `.md` 文件，文件命名格式：

```
YYYY-MM-DD-文章标识.md
```

例如：`2025-11-12-new-article.md`

### 2. 编写文章内容

文章开头应包含元信息：

```markdown
# 文章标题

**发布日期：** YYYY年MM月DD日  
**作者：** 作者名  
**标签：** #标签1 #标签2 #标签3

---

## 文章内容...
```

### 3. 更新文章列表配置

编辑 `js/blog.js` 文件，在 `posts` 数组中添加新文章信息：

```javascript
const posts = [
    // ... 已有文章
    {
        id: 'new-article',              // 文章唯一标识（URL参数）
        title: '新文章标题',              // 显示在列表中的标题
        date: '2025-11-12',             // 发布日期（用于排序）
        excerpt: '文章摘要简介...',      // 列表页显示的摘要
        tags: ['标签1', '标签2'],        // 标签数组
        file: 'posts/2025-11-12-new-article.md'  // Markdown文件路径
    }
];
```

### 4. 提交更改

```bash
git add posts/你的文章.md js/blog.js
git commit -m "Add new post: 文章标题"
git push origin main
```

## 📂 目录结构

```
OUCHPC.github.io/
├── posts/                          # 文章目录
│   ├── 2025-11-05-gromacs-simulation.md
│   ├── 2025-10-15-hpc-basics-lecture.md
│   ├── 2025-09-20-recruitment.md
│   └── 2025-09-01-website-launch.md
├── js/
│   └── blog.js                     # 博客系统脚本
├── css/
│   └── style.css                   # 样式文件（包含博客样式）
├── news.html                       # 文章列表页
├── post.html                       # 文章详情页
└── index.html                      # 首页

```

## 🎨 Markdown支持的特性

文章支持标准Markdown语法：

### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 列表
```markdown
- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2
```

### 链接和图片
```markdown
[链接文本](https://example.com)
![图片描述](图片URL)
```

### 代码
```markdown
行内代码：`code`

代码块：
\```python
def hello():
    print("Hello World")
\```
```

### 引用
```markdown
> 这是一段引用文字
```

### 强调
```markdown
**粗体文字**
*斜体文字*
```

## 🔧 技术实现

- **前端框架：** 纯JavaScript（原生JS）
- **Markdown解析：** marked.js
- **样式：** CSS3（自定义样式）
- **托管：** GitHub Pages

## 💡 使用提示

1. **日期格式：** 文章日期会自动格式化为"YYYY年MM月DD日"显示
2. **排序：** 文章列表按日期倒序排列（最新的在前）
3. **标签：** 标签会以彩色胶囊形式显示，自动添加#号
4. **响应式：** 设计完全响应式，支持手机、平板、桌面端
5. **链接格式：** 文章详情页URL格式为 `post.html?id=文章id`

## 📋 示例文章

查看 `posts/` 目录下的现有文章作为参考模板。

## ⚠️ 注意事项

1. 文章ID必须唯一，不能重复
2. 文件路径必须正确对应
3. 日期格式必须为 YYYY-MM-DD
4. 推送前建议本地预览测试
5. Markdown文件使用UTF-8编码

## 🆘 常见问题

**Q: 文章不显示怎么办？**  
A: 检查 `blog.js` 中的配置是否正确，文件路径是否存在。

**Q: 如何修改已发布的文章？**  
A: 直接编辑对应的 `.md` 文件，推送后即可生效。

**Q: 如何删除文章？**  
A: 从 `posts/` 目录删除文件，并从 `blog.js` 的 `posts` 数组中移除对应配置。

**Q: 能否使用图片？**  
A: 可以，建议将图片放在 `images/posts/` 目录下，使用相对路径引用。

---

如有其他问题，请联系：ouchpc@163.com
