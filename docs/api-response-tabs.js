(function () {
  const responseCodes = {
    "/platform/api/submit-async-task": ["201", "401", "404", "422", "500"],
    "/zh/platform/api/submit-async-task": ["201", "401", "404", "422", "500"],
    "/platform/api/query-task-status": ["200", "401", "403", "404", "500"],
    "/zh/platform/api/query-task-status": ["200", "401", "403", "404", "500"],
    "/platform/api/download-task-result": ["200", "401", "403", "404", "500"],
    "/zh/platform/api/download-task-result": ["200", "401", "403", "404", "500"]
  };

  const normalizePath = () => window.location.pathname.replace(/\/$/, "");

  const getResponseTrigger = (group) =>
    Array.from(group.querySelectorAll('button[aria-haspopup="menu"]')).find((button) =>
      /^\d{3}$/.test(button.textContent.trim())
    );

  const updateSelectedTab = (tabs, status) => {
    tabs.querySelectorAll("button").forEach((button) => {
      const selected = button.dataset.status === status;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
  };

  const chooseResponse = (trigger, tabs, status) => {
    if (trigger.textContent.trim() === status) return;

    trigger.click();
    window.requestAnimationFrame(() => {
      const option = Array.from(document.querySelectorAll('[role="menuitem"]')).find(
        (item) => item.textContent.trim() === status
      );

      if (option) option.click();
      else if (trigger.getAttribute("aria-expanded") === "true") trigger.click();

      window.setTimeout(() => {
        updateSelectedTab(tabs, trigger.textContent.trim());
      }, 0);
    });
  };

  const enhanceResponseSelector = () => {
    const codes = responseCodes[normalizePath()];
    if (!codes) return;

    const group = document.querySelector(
      '#content-side-layout [data-testid="code-group-select"]'
    );
    if (!group || group.dataset.responseTabsReady === "true") return;

    const trigger = getResponseTrigger(group);
    if (!trigger) return;

    const tabs = document.createElement("div");
    tabs.className = "api-response-status-tabs";
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "HTTP response status");

    codes.forEach((status) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.dataset.status = status;
      tab.textContent = status;
      tab.setAttribute("role", "tab");
      tab.addEventListener("click", () => chooseResponse(trigger, tabs, status));
      tabs.appendChild(tab);
    });

    trigger.parentElement.insertAdjacentElement("beforebegin", tabs);
    trigger.parentElement.classList.add("api-response-status-select-fallback");
    group.dataset.responseTabsReady = "true";
    updateSelectedTab(tabs, trigger.textContent.trim());

    const selectedObserver = new MutationObserver(() =>
      updateSelectedTab(tabs, trigger.textContent.trim())
    );
    selectedObserver.observe(trigger, { childList: true, subtree: true, characterData: true });
  };

  let scheduled = false;
  const scheduleEnhancement = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      enhanceResponseSelector();
    });
  };

  new MutationObserver(scheduleEnhancement).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.addEventListener("popstate", scheduleEnhancement);
  document.addEventListener("DOMContentLoaded", scheduleEnhancement);
  scheduleEnhancement();
})();
