document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector("#sidebar");
    const main = document.querySelector("main");
    const BtnNavctrl = document.querySelector("#btn-navctrl");
    const sidebarLinks = document.querySelectorAll("#sidebar a");
    // 更新布局
    function updateLayout() {
        const width = window.innerWidth;

        if (width > 900) {
            sidebar.classList.remove("navopen", "close");
        } else {
            sidebar.classList.remove("navopen");
            sidebar.classList.add("close");
        }
    }

    // 初始页面加载时检测屏幕宽度
    updateLayout();
    window.addEventListener("resize", updateLayout);

    // 左侧边栏控制按钮
    BtnNavctrl.addEventListener("click", function () {
        sidebar.classList.toggle("navopen");
        sidebar.classList.toggle("close");
    });

    // 动态加载内容
    async function loadContent(url) {
        main.innerHTML = `<p>Loading...</p>`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const content = await response.text();
            main.style.opacity = 0;
            setTimeout(() => {
                main.innerHTML = content;
                // 修正图片路径
                const imgs = main.querySelectorAll('img');
                imgs.forEach((img) => {
                    // 假设图片的路径是相对路径，需要补全为正确的路径
                    img.src = 'assets/images/' + img.src.split('/').pop();
                });
                main.style.opacity = 1;
            }, 300);
        } catch (error) {
            console.error("Error loading content:", error);
            main.innerHTML = `<p>Error loading content: ${error.message}</p>`;
        }
    }

    // 默认加载 "Introduction"
    loadContent("pages/introduction.html");

    // 拦截侧边栏链接点击事件
    sidebarLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const url = link.getAttribute("href");
            if (main.getAttribute("data-current-url") === url) return;
            main.setAttribute("data-current-url", url);
            loadContent(url);
            // 点击后隐藏侧边栏
            if (window.innerWidth <= 900) {
                setTimeout(() => {
                    // 等待页面加载完成，模拟点击按钮隐藏侧边栏
                    BtnNavctrl.click();
                }, 300); // 延迟 1 秒（1000 毫秒）后执行
            }
        });
    });
});
