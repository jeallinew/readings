document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector("#sidebar");
    const main = document.querySelector("main");
    const BtnNavctrl = document.querySelector("#btn-navctrl");
    const sidebarLinks = document.querySelectorAll("#sidebar a");
    const abbrElements = document.querySelectorAll("abbr");
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
    //名词定义
    function highlightTrems(){
        const terms = {
            archetypes: `Common system structures that produce characteristic patterns of behavior.`,
            "balancing feedback loop": `A stabilizing, goal-seeking, regulating feedback loop, also know as a “negative feedback loop” because it opposes, or reverses, whatever direction of change is imposed on the system.`,
            "bounded rationality": `The logic that leads to decisions or actions that make sense within one part of a system but are not reasonable within a broader context or when seen as a part of the wider system.`,
            "dynamic equilibrium": `The condition in which the state of a stock (its level or its size) is steady and unchanging, despite inflows and outflows. This is possible only when all inflows equal all outflows.`,
            dynamics: `The behavior over time of a system or any of its components.`,
            "feedback loop": `The mechanism (rule or information flow or signal) that allows a change in a stock to affect a flow into or out of that same stock. A closed chain of causal connections from a stock, through a set of decisions and actions dependent on the level of the stock, and back again through a flow to change the stock.`,
            flow: `Material or information that enters or leaves a stock over a period of time.`,
            hierarchy: `Systems organized in such a way as to create a larger system. Subsystems within systems.`,
            "limiting factor": `A necessary system input that is the one limiting the activity of the system at a particular moment.`,
            "linear relationship": `A relationship between two elements in a system that has constant proportion between cause and effect and so can be drawn with a straight line on a graph. The effect is additive.`,
            "nonlinear relationship": `A relationship between two elements in a system where the cause does not produce a proportional (straight-line) effect.`,
            "reinforcing feedback loop": `An amplifying or enhancing feedback loop, also known as a “positive feedback loop” because it reinforces the direction of change. These are vicious cycles and virtuous circles.`,
            resilience: `The ability of a system to recover from perturbation; the ability to restore or repair or bounce back after a change due to an outside force.`,
            "self-organization": `The ability of a system to structure itself, to create new structure, to learn, or diversify.`,
            "shifting dominance": `The change over time of the relative strengths of competing feedback loops.`,
            stock: `An accumulation of material or information that has built up in a system over time.`,
            suboptimization: `The behavior resulting from a subsystem's goals dominating at the expense of the total system's goals.`,
            system: `A set of elements or parts that is coherently organized and interconnected in a pattern or structure that produces a characteristic set of behaviors, often classified as its “function” or “purpose.”`
    
        };
    
        const content = document.querySelectorAll("article p, article li");
        content.forEach((element) => {
            if (!element.querySelector('abbr')) {  // 确保该元素内没有abbr标签
                element.innerHTML = element.innerHTML.replace(
                    new RegExp(`(${Object.keys(terms).join("|")})`, "gi"),
                    match => `<abbr title="${terms[match.toLowerCase()]}">${match}</abbr>`
                );
            }
         });
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
                // 调用 definitions.js 中的替换逻辑
                if (typeof highlightTrems === 'function') {
                    highlightTrems();
                }
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

    // 为每个 <abbr> 元素添加点击事件监听器
    abbrElements.forEach((abbr) => {
        abbr.addEventListener('touchstart', (event) => {
            const term = abbr.textContent.toLowerCase();
            const definition = terms[term];
            if (definition) {
                // 创建并显示工具提示
                const tooltip = document.createElement('div');
                tooltip.textContent = definition;
                tooltip.style.position = 'absolute';
                tooltip.style.left = `${event.pageX + 5}px`;
                tooltip.style.top = `${event.pageY + 5}px`;
                tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                tooltip.style.color = 'white';
                tooltip.style.padding = '5px';
                tooltip.style.borderRadius = '3px';
                tooltip.style.zIndex = '1000';
                document.body.appendChild(tooltip);

                // 在 3 秒后移除工具提示
                setTimeout(() => {
                    tooltip.remove();
                }, 3000);
            }
        });
    });

});
