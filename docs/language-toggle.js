(function () {
  const zhRoutes = new Set([
    "/zh/docs/quick-start",
    "/zh/docs/overview",
    "/zh/cli/overview",
    "/zh/sdk/overview",
    "/zh/mcp/overview",
    "/zh/reference/overview",
    "/zh/skills/overview"
  ]);

  const enToZhRoutes = new Set([
    "/docs/quick-start",
    "/docs/overview",
    "/cli/overview",
    "/sdk/overview",
    "/mcp/overview",
    "/reference/overview",
    "/skills/overview"
  ]);

  function normalizePath(pathname) {
    const path = pathname.replace(/\/$/, "");
    return path || "/docs/quick-start";
  }

  function getEnglishHref(pathname) {
    const path = normalizePath(pathname);
    if (path.startsWith("/zh/")) {
      return path.slice(3) || "/docs/quick-start";
    }
    return path;
  }

  function getChineseHref(pathname) {
    const path = normalizePath(pathname);
    if (path.startsWith("/zh/")) {
      return zhRoutes.has(path) ? path : "/zh/docs/quick-start";
    }
    return enToZhRoutes.has(path) ? `/zh${path}` : "/zh/docs/quick-start";
  }

  function createLink(label, href, active) {
    const link = document.createElement("a");
    link.textContent = label;
    link.href = href;
    link.dataset.active = active ? "true" : "false";
    link.setAttribute("aria-current", active ? "page" : "false");
    return link;
  }

  function renderLanguageSwitch() {
    const header = document.querySelector("#sidebar-content > .flex:first-child");
    if (!header) return false;

    document.querySelectorAll("#localization-select-trigger, #localization-select-content").forEach((element) => {
      element.setAttribute("hidden", "");
      element.style.display = "none";
    });

    const isChinese = normalizePath(window.location.pathname).startsWith("/zh/");
    let switcher = document.getElementById("deck-language-switch");
    if (!switcher) {
      switcher = document.createElement("nav");
      switcher.id = "deck-language-switch";
      switcher.setAttribute("aria-label", "Language");
    }

    switcher.replaceChildren(
      createLink("EN", getEnglishHref(window.location.pathname), !isChinese),
      createLink("ZH", getChineseHref(window.location.pathname), isChinese)
    );

    const themeToggle = header.querySelector('[data-component-name="theme-toggle"], button[aria-label*="Toggle dark mode" i]');
    if (themeToggle && switcher.nextElementSibling !== themeToggle) {
      header.insertBefore(switcher, themeToggle);
    } else if (!switcher.parentElement) {
      header.appendChild(switcher);
    }

    return true;
  }

  function scheduleRender() {
    window.requestAnimationFrame(renderLanguageSwitch);
  }

  document.addEventListener("DOMContentLoaded", scheduleRender);
  window.addEventListener("popstate", scheduleRender);
  document.addEventListener("click", () => window.setTimeout(renderLanguageSwitch, 150));

  const observer = new MutationObserver(() => {
    if (!document.getElementById("deck-language-switch")) {
      renderLanguageSwitch();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  scheduleRender();
})();
