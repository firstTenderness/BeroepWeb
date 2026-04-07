<template>
    <div class="tools-container">
        <!-- 移动端菜单切换按钮 -->
        <button class="mobile-menu-toggle" @click="toggleSidebar">
            <span class="menu-icon">☰</span>
        </button>

        <!-- 左侧侧边栏 -->
        <aside class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
            <div class="sidebar-header">
                <h2 class="sidebar-title">业务功能</h2>
            </div>
            <div class="sidebar-content">
                <button class="back-home-btn" @click="goHome">
                    <span class="back-icon">←</span>
                    <span>返回首页</span>
                </button>
                <nav class="sidebar-nav">
                    <button
                        v-for="item in menuItems"
                        :key="item.id"
                        class="menu-item"
                        :class="{ 'menu-item-active': currentMenu === item.id }"
                        @click="selectMenu(item.id)"
                    >
                        <span class="menu-icon-text">{{ item.icon }}</span>
                        <span class="menu-text">{{ item.name }}</span>
                    </button>
                </nav>
            </div>
        </aside>

        <!-- 遮罩层（移动端） -->
        <div
            class="sidebar-overlay"
            :class="{ 'overlay-visible': isSidebarOpen }"
            @click="closeSidebar"
        ></div>

        <!-- 右侧内容区 -->
        <main class="content-area">
            <transition name="fade-slide" mode="out-in">
                <div :key="currentMenu" class="content-wrapper">
                    <!-- 动态内容区域 -->
                    <div v-if="currentFeature" class="content-section">
                        <div class="content-header">
                            <span class="content-icon">{{ currentFeature.icon }}</span>
                            <h1 class="content-title">{{ currentFeature.title }}</h1>
                        </div>
                        <div class="content-body">
                            <div class="feature-card">
                                <h3>{{ currentFeature.subtitle }}</h3>
                                <p>{{ currentFeature.description }}</p>
                                <ul class="feature-list">
                                    <li v-for="(feature, index) in currentFeature.features" :key="index">
                                        {{ feature }}
                                    </li>
                                </ul>
                            </div>
                            <div class="placeholder-box">
                                <p>{{ currentFeature.placeholder }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
const goHome = () => {
    router.push('/home')
}

// 菜单项数据
const menuItems = [
    { id: 'resume', name: '简历优化分析', icon: '📄' },
    { id: 'interview', name: '面试模拟', icon: '🎤' },
    { id: 'job', name: '职位分析/推荐', icon: '💼' },
    { id: 'learning', name: '学习路径定制/帮助', icon: '📚' }
]

// 功能详情数据
const featuresData = {
    resume: {
        id: 'resume',
        title: '简历优化分析',
        subtitle: '智能简历诊断',
        description: '通过 AI 技术分析您的简历内容，识别关键问题并提供专业优化建议。',
        icon: '📄',
        features: [
            '关键词匹配度分析',
            '格式排版优化建议',
            '内容完整性检查',
            '行业适配性评估'
        ],
        placeholder: '📊 简历分析工具区域'
    },
    interview: {
        id: 'interview',
        title: '面试模拟',
        subtitle: 'AI 面试助手',
        description: '模拟真实面试场景，帮助您提前准备，提升面试表现。',
        icon: '🎤',
        features: [
            '常见面试题库',
            '行为面试模拟',
            '技术面试练习',
            '面试表现反馈'
        ],
        placeholder: '🎯 面试模拟区域'
    },
    job: {
        id: 'job',
        title: '职位分析/推荐',
        subtitle: '智能职位匹配',
        description: '基于您的技能和偏好，推荐最适合的职位机会。',
        icon: '💼',
        features: [
            '个性化职位推荐',
            '薪资水平分析',
            '公司背景调查',
            '职位趋势洞察'
        ],
        placeholder: '🔍 职位推荐区域'
    },
    learning: {
        id: 'learning',
        title: '学习路径定制/帮助',
        subtitle: '个性化学习规划',
        description: '根据您的职业目标，制定专属的学习成长路径。',
        icon: '📚',
        features: [
            '技能差距分析',
            '学习资源推荐',
            '进度跟踪管理',
            '职业发展规划'
        ],
        placeholder: '🎓 学习路径区域'
    }
}

// 当前选中的菜单
const currentMenu = ref('resume')

// 侧边栏开关状态（移动端）
const isSidebarOpen = ref(false)

// 当前功能详情
const currentFeature = computed(() => featuresData[currentMenu.value])

// 选择菜单
const selectMenu = (menuId) => {
    currentMenu.value = menuId
    closeSidebar()
}

// 切换侧边栏
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

// 关闭侧边栏
const closeSidebar = () => {
    isSidebarOpen.value = false
}
</script>

<style scoped>
/* 容器样式 */
.tools-container {
    display: flex;
    min-height: 100vh;
    background-color: #f5f7fa;
}

/* 移动端菜单切换按钮 */
.mobile-menu-toggle {
    display: none;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 1001;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: #fff;
    font-size: 22px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
}

.mobile-menu-toggle:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

/* 侧边栏样式 */
.sidebar {
    width: 280px;
    background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
    color: #fff;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    box-shadow: 4px 0 20px rgba(99, 102, 241, 0.25);
    transition: all 0.3s ease;
}

.sidebar-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow-y: auto;
}

/* 滚动条样式 */
.sidebar-content::-webkit-scrollbar {
    width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

.sidebar-header {
    padding: 24px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-title {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin: 0;
    letter-spacing: 0.5px;
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
}

/* 返回首页按钮 */
.back-home-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.back-home-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3);
}

.back-icon {
    font-size: 16px;
    font-weight: 600;
}

/* 菜单项样式 */
.menu-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 18px;
    border: none;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.9);
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
}

.menu-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: #fcd34d;
    transform: scaleY(0);
    transition: transform 0.3s ease;
}

.menu-item:hover {
    background-color: rgba(255, 255, 255, 0.15);
    color: #fff;
    transform: translateX(6px) translateY(-2px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3);
}

.menu-item:hover::before {
    transform: scaleY(1);
}

.menu-item-active {
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.menu-item-active::before {
    transform: scaleY(1);
}

.menu-icon-text {
    font-size: 18px;
    flex-shrink: 0;
}

.menu-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 遮罩层 */
.sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.sidebar-overlay.overlay-visible {
    opacity: 1;
    pointer-events: auto;
}

/* 内容区域样式 */
.content-area {
    flex: 1;
    margin-left: 280px;
    padding: 40px;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8faff 0%, #eef2ff 100%);
    transition: all 0.3s ease;
}

.content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
}

.content-section {
    animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.content-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 40px;
    padding: 24px 32px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
    color: #fff;
}

.content-icon {
    font-size: 40px;
    padding: 16px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    backdrop-filter: blur(10px);
}

.content-title {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    margin: 0;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
}

/* 功能卡片样式 */
.feature-card {
    background: linear-gradient(135deg, #fff 0%, #f8faff 100%);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
    transition: all 0.3s ease;
    border: 1px solid rgba(99, 102, 241, 0.1);
    position: relative;
    overflow: hidden;
}

.feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
}

.feature-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 16px 32px rgba(99, 102, 241, 0.25);
}

.feature-card h3 {
    font-size: 22px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.feature-card h3::before {
    content: '';
    width: 4px;
    height: 24px;
    background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 2px;
}

.feature-card p {
    font-size: 16px;
    color: #6b7280;
    line-height: 1.6;
    margin: 0 0 24px 0;
}

.feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.feature-list li {
    padding: 12px 0;
    padding-left: 32px;
    position: relative;
    color: #4b5563;
    font-size: 15px;
    transition: all 0.3s ease;
}

.feature-list li:hover {
    color: #4f46e5;
    transform: translateX(4px);
}

.feature-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    top: 12px;
    color: #4f46e5;
    font-weight: 600;
    background-color: rgba(79, 70, 229, 0.1);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

/* 占位区域样式 */
.placeholder-box {
    background: linear-gradient(135deg, #f8faff 0%, #eef2ff 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 320px;
    border: 2px dashed rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.placeholder-box:hover {
    background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
    border-color: rgba(99, 102, 241, 0.5);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.2);
}

.placeholder-box p {
    font-size: 20px;
    color: #6366f1;
    font-weight: 500;
    text-align: center;
    padding: 0 32px;
    position: relative;
    z-index: 1;
}

.placeholder-box::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        45deg,
        transparent 48%,
        rgba(99, 102, 241, 0.15) 49%,
        rgba(99, 102, 241, 0.15) 51%,
        transparent 52%
    );
    background-size: 20px 20px;
    animation: move 15s linear infinite;
}

@keyframes move {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(20px, 20px);
    }
}

/* 过渡动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}

/* 响应式样式 */
@media (max-width: 1200px) {
    .content-body {
        grid-template-columns: 1fr;
    }
    
    .content-area {
        padding: 32px;
    }
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sidebar {
        width: 260px;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }

    .sidebar.sidebar-open {
        transform: translateX(0);
    }

    .sidebar-overlay {
        display: block;
        pointer-events: none;
    }

    .content-area {
        margin-left: 0;
        padding: 80px 24px 32px;
    }

    .content-header {
        padding: 20px 24px;
        margin-bottom: 32px;
    }

    .content-title {
        font-size: 28px;
    }

    .content-icon {
        font-size: 32px;
        padding: 8px;
    }

    .feature-card {
        padding: 24px;
    }
    
    .feature-card h3 {
        font-size: 20px;
    }
    
    .placeholder-box {
        min-height: 280px;
    }
}

@media (max-width: 480px) {
    .content-area {
        padding: 80px 16px 24px;
    }

    .content-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        padding: 16px 20px;
    }

    .content-title {
        font-size: 24px;
    }
    
    .content-icon {
        font-size: 28px;
    }
    
    .feature-card {
        padding: 20px;
    }
    
    .feature-list li {
        padding-left: 28px;
        font-size: 14px;
    }
    
    .feature-list li::before {
        width: 18px;
        height: 18px;
        font-size: 11px;
    }
    
    .placeholder-box p {
        font-size: 18px;
        padding: 0 20px;
    }
}
</style>
