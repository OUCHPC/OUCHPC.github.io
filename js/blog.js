// 博客文章配置
const posts = [
    // 示例文章
    {
        id: 'website-launch',
        title: '网站正式上线',
        date: '2025-11-12',
        excerpt: 'OUCHPC社团官方网站正式上线，我们将在这里分享最新的活动信息和学习资源。',
        tags: ['公告', '网站'],
        file: 'posts/2025-11-12-website-launch.md'
    }
];

// 渲染博客文章列表
function renderPosts() {
    const container = document.getElementById('posts-container');
    if (!container) return;

    // 按日期排序（最新的在前面）
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 生成HTML
    const postsHTML = sortedPosts.map(post => `
        <article class="blog-card">
            <div class="blog-header">
                <h3 class="blog-title">
                    <a href="post.html?id=${post.id}">${post.title}</a>
                </h3>
                <p class="blog-date">
                    <i class="far fa-calendar-alt"></i> ${formatDate(post.date)}
                </p>
            </div>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-footer">
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <a href="post.html?id=${post.id}" class="read-more">
                    阅读全文 <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');

    container.innerHTML = postsHTML;
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

// 获取文章详情
function getPostById(id) {
    return posts.find(post => post.id === id);
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 如果是新闻列表页
    if (document.getElementById('posts-container')) {
        renderPosts();
    }
    
    // 如果是文章详情页
    if (document.getElementById('post-content')) {
        loadPostContent();
    }
});

// 加载文章内容
async function loadPostContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    const postContent = document.getElementById('post-content');
    
    if (!postId) {
        postContent.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> <p>未找到文章ID</p></div>';
        return;
    }

    const post = getPostById(postId);
    if (!post) {
        postContent.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> <p>文章不存在</p></div>';
        return;
    }

    try {
        // 加载Markdown文件
        const response = await fetch(post.file);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const markdown = await response.text();
        
        // 使用marked库转换Markdown
        if (typeof marked !== 'undefined') {
            const html = marked.parse(markdown);
            postContent.innerHTML = html;
        } else {
            // 如果没有marked库，显示原始内容
            postContent.innerHTML = `<pre style="white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(markdown)}</pre>`;
        }
        
        // 更新页面标题
        document.title = `${post.title} - OUCHPC`;
        
        // 添加返回顶部功能
        window.scrollTo(0, 0);
        
    } catch (error) {
        console.error('加载文章失败:', error);
        postContent.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>加载文章失败</h3>
                <p>错误信息：${error.message}</p>
                <p>请联系管理员：ouchpc@163.com</p>
                <a href="news.html" class="cta-button">返回文章列表</a>
            </div>
        `;
    }
}

// HTML转义函数
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
