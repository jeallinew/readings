function highlightTrems(){
    const terms = {
        Archetypes: `Common system structures that produce characteristic patterns of behavior.`,
        "Balancing feedback loop": `A stabilizing, goal-seeking, regulating feedback
        loop, also know as a “negative feedback loop” because it opposes, or reverses, whatever direction of change is imposed on the system.`,
        "Bounded rationality": `The logic that leads to decisions or actions that make
        sense within one part of a system but are not reasonable within a broader context or when seen as a part of the wider system.`,
        "Dynamic equilibrium": `The condition in which the state of a stock (its level
        or its size) is steady and unchanging, despite inflows and outflows. This is possible only when all inflows equal all outflows.`,
        Dynamics: `The behavior over time of a system or any of its components.`,
        "Feedback loop": `The mechanism (rule or information flow or signal) that allows a change in a stock to affect a flow into or out of that same stock. A closed chain of causal connections from a stock, through a set of decisions and actions dependent on the level of the stock, and back again through a flow to change the stock.`,
        Flow: `Material or information that enters or leaves a stock over a period
        of time.`,
        Hierarchy: `Systems organized in such a way as to create a larger system. Subsystems within systems.`,
        "Limiting factor": `A necessary system input that is the one limiting the activity of the system at a particular moment.`,
        "Linear relationship": `A relationship between two elements in a system that has constant proportion between cause and effect and so can be drawn with a straight line on a graph. The effect is additive.`,
        "Nonlinear relationship": `A relationship between two elements in a system
        where the cause does not produce a proportional (straight-line) effect.`,
        "Reinforcing feedback loop": `An amplifying or enhancing feedback loop, also known as a “positive feedback loop” because it reinforces the direction of change. These are vicious cycles and virtuous circles.`,
        Resilience: `The ability of a system to recover from perturbation; the ability to restore or repair or bounce back after a change due to an outside force.`,
        "Self-organization": `The ability of a system to structure itself, to create new structure, to learn, or diversify.`,
        "Shifting dominance": `The change over time of the relative strengths of competing feedback loops.`,
        Stock: `An accumulation of material or information that has built up in a
        system over time.`,
        Suboptimization: `The behavior resulting from a subsystem's goals dominating at the expense of the total system's goals.`,
        System: `A set of elements or parts that is coherently organized and interconnected in a pattern or structure that produces a characteristic set of behaviors, often classified as its “function” or “purpose.”`

    };

    const content = document.querySelectorAll("article p, article li");
    content.forEach((element) => {
        if (!element.querySelector('abbr')) {  // 确保该元素内没有abbr标签
            element.innerHTML = element.innerHTML.replace(
                new RegExp(`(${Object.keys(terms).join("|")})`, "gi"),
                match => `<abbr title="${terms[match]}">${match}</abbr>`
            );
        }
     });
 }