document.addEventListener("DOMContentLoaded", () => {
  // Application State
  let currentProject = "sand"; // "sand" or "land"
  let currentRequestIndex = 0;
  let currentStepIndex = null; // null means show overview
  let searchQuery = "";

  // DOM Elements
  const tabSand = document.getElementById("tab-sand");
  const tabLand = document.getElementById("tab-land");
  const requestListContainer = document.getElementById("request-list");
  const activeTitle = document.getElementById("active-title");
  const activeDesc = document.getElementById("active-desc");
  const searchInput = document.getElementById("search-input");
  const btnResetView = document.getElementById("btn-reset-view");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");
  const diagramContainer = document.getElementById("diagram-container");
  const stepDetailContent = document.getElementById("step-detail-content");
  const meetingNotesText = document.getElementById("meeting-notes-text");

  // System Specific Colors mapping for aesthetics
  function getSystemStyle(sys, theme) {
    const colors = {
      REG: {
        dark: { bg: "rgba(34, 197, 94, 0.15)", text: "#4ade80", border: "#22c55e" },
        light: { bg: "#dcfce7", text: "#15803d", border: "#86efac" }
      },
      EXP: {
        dark: { bg: "rgba(236, 72, 153, 0.15)", text: "#f472b6", border: "#ec4899" },
        light: { bg: "#fce7f3", text: "#be185d", border: "#f9a8d4" }
      },
      ELS: {
        dark: { bg: "rgba(234, 179, 8, 0.15)", text: "#facc15", border: "#eab308" },
        light: { bg: "#fef9c3", text: "#a16207", border: "#fde047" }
      },
      ELV: {
        dark: { bg: "rgba(249, 115, 22, 0.15)", text: "#fb923c", border: "#f97316" },
        light: { bg: "#ffedd5", text: "#c2410c", border: "#fdba74" }
      },
      Citizen: {
        dark: { bg: "rgba(14, 165, 233, 0.15)", text: "#38bdf8", border: "#0ea5e9" },
        light: { bg: "#e0f2fe", text: "#0369a1", border: "#bae6fd" }
      },
      User: {
        dark: { bg: "rgba(6, 182, 212, 0.15)", text: "#22d3ee", border: "#06b6d4" },
        light: { bg: "#ecfeff", text: "#0891b2", border: "#a5f3fc" }
      },
      Developer: {
        dark: { bg: "rgba(99, 102, 241, 0.15)", text: "#818cf8", border: "#6366f1" },
        light: { bg: "#e0e7ff", text: "#3730a3", border: "#c7d2fe" }
      },
      Portal: {
        dark: { bg: "rgba(168, 85, 247, 0.15)", text: "#c084fc", border: "#a855f7" },
        light: { bg: "#f3e8ff", text: "#6d28d9", border: "#e9d5ff" }
      },
      FIN: {
        dark: { bg: "rgba(16, 185, 129, 0.15)", text: "#34d399", border: "#10b981" },
        light: { bg: "#d1fae5", text: "#047857", border: "#6ee7b7" }
      },
      "เจ้าหน้าที่": {
        dark: { bg: "rgba(244, 63, 94, 0.15)", text: "#fb7185", border: "#f43f5e" },
        light: { bg: "#ffe4e6", text: "#be123c", border: "#fda4af" }
      },
      Officer: {
        dark: { bg: "rgba(244, 63, 94, 0.15)", text: "#fb7185", border: "#f43f5e" },
        light: { bg: "#ffe4e6", text: "#be123c", border: "#fda4af" }
      },
      RPT: {
        dark: { bg: "rgba(217, 70, 239, 0.15)", text: "#f5d0fe", border: "#d946ef" },
        light: { bg: "#fae8ff", text: "#a21caf", border: "#f5d0fe" }
      }
    };
    
    const defaultColors = {
      dark: { bg: "rgba(100, 116, 139, 0.15)", text: "#94a3b8", border: "#64748b" },
      light: { bg: "#f1f5f9", text: "#475569", border: "#cbd5e1" }
    };

    return colors[sys] ? colors[sys][theme] : defaultColors[theme];
  }

  // --- Initializer ---
  function init() {
    setupEventListeners();
    setupTheme();
    
    // Update request count badges on tabs dynamically (counting only actual request flows)
    if (document.getElementById("count-sand")) {
      const sandCount = WORKFLOWS_DATA.sand.requests.filter(r => r.title.includes("คำขอ") || r.title.includes("คำรับ")).length;
      document.getElementById("count-sand").textContent = `${sandCount} คำขอ`;
    }
    if (document.getElementById("count-land")) {
      const landCount = WORKFLOWS_DATA.land.requests.filter(r => r.title.includes("คำขอ") || r.title.includes("คำรับ")).length;
      document.getElementById("count-land").textContent = `${landCount} คำขอ`;
    }
    if (document.getElementById("count-others")) {
      const othersCount = WORKFLOWS_DATA.others ? WORKFLOWS_DATA.others.requests.length : 0;
      document.getElementById("count-others").textContent = `${othersCount} รายการ`;
    }

    renderRequestList();
    loadRequest(0);

    // Collapse sidebar by default on mobile screens on initial load
    if (window.innerWidth <= 768) {
      const sidebarEl = document.querySelector(".sidebar");
      const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
      if (sidebarEl) sidebarEl.classList.add("collapsed");
      if (btnToggleSidebar) btnToggleSidebar.classList.remove("active");
    }
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    tabSand.addEventListener("click", () => switchProject("sand"));
    tabLand.addEventListener("click", () => switchProject("land"));
    const tabOthers = document.getElementById("tab-others");
    if (tabOthers) {
      tabOthers.addEventListener("click", () => switchProject("others"));
    }

    // Search input
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderRequestList();
    });

    // Reset view
    btnResetView.addEventListener("click", () => {
      currentStepIndex = null;
      renderDiagram();
      renderDetails();
    });

    // Theme toggle
    themeToggleBtn.addEventListener("click", toggleTheme);

    // Sidebar panel toggle
    const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
    const sidebarEl = document.querySelector(".sidebar");
    btnToggleSidebar.addEventListener("click", () => {
      sidebarEl.classList.toggle("collapsed");
      btnToggleSidebar.classList.toggle("active");
    });

    // Sidebar overlay click (to close sidebar on mobile)
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener("click", () => {
        if (sidebarEl) sidebarEl.classList.add("collapsed");
        if (btnToggleSidebar) btnToggleSidebar.classList.remove("active");
      });
    }

    // Details panel toggle
    const btnToggleDetails = document.getElementById("btn-toggle-details");
    const detailPaneEl = document.querySelector(".detail-pane");
    btnToggleDetails.addEventListener("click", () => {
      detailPaneEl.classList.toggle("collapsed");
      btnToggleDetails.classList.toggle("active");
    });
  }

  // --- Theme Controller ---
  function setupTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
    
    // Re-render diagram to apply theme-appropriate colors for nodes
    renderDiagram();
    renderDetails();
  }

  function updateThemeIcon(theme) {
    if (theme === "light") {
      themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />`;
    } else {
      themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />`;
    }
  }

  // --- Project Switcher ---
  function switchProject(project) {
    if (currentProject === project) return;
    currentProject = project;

    const tabs = document.querySelectorAll(".project-tabs .tab-btn");
    tabs.forEach((tab) => {
      if (tab.getAttribute("data-project") === project) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    currentRequestIndex = 0;
    currentStepIndex = null;
    searchInput.value = "";
    searchQuery = "";

    renderRequestList();
    loadRequest(0);
  }

  // --- Render Sidebar Request List ---
  function renderRequestList() {
    requestListContainer.innerHTML = "";
    const projectData = WORKFLOWS_DATA[currentProject];
    const requests = projectData.requests;

    let filteredCount = 0;
    let firstVisibleIndex = -1;

    requests.forEach((req, idx) => {
      const isMatch = checkSearchMatch(req);
      if (!isMatch) return;

      filteredCount++;
      if (firstVisibleIndex === -1) firstVisibleIndex = idx;

      const itemBtn = document.createElement("button");
      itemBtn.className = `request-item ${idx === currentRequestIndex ? "active" : ""}`;
      itemBtn.innerHTML = `
        <div class="item-title">${req.title}</div>
        <div class="item-desc">${req.description}</div>
      `;

      itemBtn.addEventListener("click", () => {
        selectRequest(idx);
      });

      requestListContainer.appendChild(itemBtn);
    });

    if (filteredCount > 0 && !checkSearchMatch(requests[currentRequestIndex])) {
      selectRequest(firstVisibleIndex);
    } else if (filteredCount === 0) {
      requestListContainer.innerHTML = `<div class="empty-state" style="padding: 20px;"><div class="empty-state-title">ไม่พบผลการค้นหา</div></div>`;
    }
  }

  function checkSearchMatch(req) {
    if (!searchQuery) return true;
    
    if (req.title.toLowerCase().includes(searchQuery)) return true;
    if (req.description.toLowerCase().includes(searchQuery)) return true;
    if (req.meetingNotes.toLowerCase().includes(searchQuery)) return true;

    for (const step of req.steps) {
      if (step.label.toLowerCase().includes(searchQuery)) return true;
      if (step.api.toLowerCase().includes(searchQuery)) return true;
      if (step.params && step.params.toLowerCase().includes(searchQuery)) return true;
      if (step.db && step.db.toLowerCase().includes(searchQuery)) return true;
      if (step.notes && step.notes.toLowerCase().includes(searchQuery)) return true;
      if (step.screen && step.screen.toLowerCase().includes(searchQuery)) return true;
    }

    return false;
  }

  // --- Select Request ---
  function selectRequest(index) {
    currentRequestIndex = index;
    currentStepIndex = null;
    
    const items = requestListContainer.querySelectorAll(".request-item");
    const requests = WORKFLOWS_DATA[currentProject].requests;
    const targetTitle = requests[index].title;
    
    items.forEach((item) => {
      const itemTitle = item.querySelector(".item-title").textContent;
      if (itemTitle === targetTitle) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    loadRequest(index);
  }

  // --- Load Request Info ---
  function loadRequest(index) {
    const request = WORKFLOWS_DATA[currentProject].requests[index];
    
    activeTitle.textContent = request.title;
    activeDesc.textContent = request.description;
    meetingNotesText.textContent = request.meetingNotes || "ยังไม่มีข้อมูลบันทึกในคำขอนี้";

    renderDiagram();
    renderDetails();
  }

  // --- Detect API Method ---
  function getApiMethod(step) {
    if (step.method) {
      return step.method.toUpperCase();
    }
    if (!step.api) {
      if (step.db) return "DB";
      return "POST";
    }
    
    const label = step.label || "";
    if (label.includes("พิมพ์ใบแจ้งชำระเงิน")) {
      return "POST";
    }
    if (label.includes("กดดูไฟล์") || (label.includes("ตรวจผ่าน") && label.includes("ชำระเงิน")) || label.includes("เช็คสถานะ") || label.includes("แบบพิมพ์") || label.includes("ค้นหา")) {
      return "GET";
    }
    
    const apiLower = step.api.toLowerCase();
    if (apiLower.startsWith("get ") || apiLower.startsWith("get/") || apiLower.startsWith("get:") || apiLower.startsWith("get :")) {
      return "GET";
    }
    
    if (apiLower.includes("put")) return "PUT";
    if (apiLower.includes("delete")) return "DELETE";
    
    return "POST";
  }

  // --- Auto-expand Details Panel Helper ---
  function expandDetailsPanel() {
    const detailPaneEl = document.querySelector(".detail-pane");
    const btnToggleDetails = document.getElementById("btn-toggle-details");
    if (detailPaneEl && detailPaneEl.classList.contains("collapsed")) {
      detailPaneEl.classList.remove("collapsed");
    }
    if (btnToggleDetails && !btnToggleDetails.classList.contains("active")) {
      btnToggleDetails.classList.add("active");
    }
  }

  // --- Dynamic SVG Sequence Diagram Generator ---
  function renderDiagram() {
    const request = WORKFLOWS_DATA[currentProject].requests[currentRequestIndex];
    const rawSystems = request.systems || [];
    const steps = request.steps;
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";

    if (rawSystems.length === 0) {
      diagramContainer.innerHTML = `<div class="empty-state">ไม่มีระบบกำหนดไว้ในคำขอนี้</div>`;
      return;
    }

    const elicenseGroup = ["User", "Citizen", "Developer", "Portal", "minio", "ELS", "PAY", "ELV", "Payment", "schedule", "RPT"];
    const dol2Group = ["เจ้าหน้าที่", "Officer", "REG", "EXP", "FIN", "EVD"];

    // Ensure double-sided rendering: always have at least one system from each side
    let systems = [...rawSystems];
    const hasElicense = systems.some(sys => elicenseGroup.includes(sys));
    const hasDol2 = systems.some(sys => dol2Group.includes(sys));

    if (!hasElicense) {
      systems.unshift("User");
    }
    if (!hasDol2) {
      systems.push("เจ้าหน้าที่");
    }

    const paddingX = 110;
    const gapX = 160;
    const headerHeight = 100; // Increased from 65 to 100
    const gapY = 85;
    const footerHeight = 45;
    
    const svgWidth = (systems.length - 1) * gapX + paddingX * 2;
    const svgHeight = headerHeight + steps.length * gapY + footerHeight;

    let svgHeaderHtml = `
      <svg class="sequence-diagram sequence-diagram-header" width="${svgWidth}" height="${headerHeight}" viewBox="0 0 ${svgWidth} ${headerHeight}" xmlns="http://www.w3.org/2000/svg">
    `;

    let svgBodyHtml = `
      <svg class="sequence-diagram sequence-diagram-body" width="${svgWidth}" height="${svgHeight - headerHeight}" viewBox="0 ${headerHeight} ${svgWidth} ${svgHeight - headerHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-POST" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-post)" />
          </marker>
          <marker id="arrow-GET" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-get)" />
          </marker>
          <marker id="arrow-PUT" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-put)" />
          </marker>
          <marker id="arrow-DELETE" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-delete)" />
          </marker>
          <marker id="arrow-DB" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-db)" />
          </marker>
        </defs>
    `;

    const elicenseCoords = [];
    const dol2Coords = [];

    const systemCoords = {};
    systems.forEach((sys, idx) => {
      const x = paddingX + idx * gapX;
      systemCoords[sys] = x;
      if (sys) {
        systemCoords[sys.toLowerCase()] = x;
      }

      if (elicenseGroup.includes(sys)) {
        elicenseCoords.push(x);
      } else if (dol2Group.includes(sys)) {
        dol2Coords.push(x);
      }
    });

    // 1. Draw Background Lanes FIRST (so they are behind lifelines and arrows)
    if (elicenseCoords.length > 0) {
      const minX = Math.min(...elicenseCoords);
      const maxX = Math.max(...elicenseCoords);
      const boxX = minX - 52;
      const boxW = (maxX - minX) + 104;
      
      svgHeaderHtml += `
        <rect class="group-background-lane elicense-lane" x="${boxX}" y="8" width="${boxW}" height="${headerHeight - 8}" rx="8" 
              fill="${currentTheme === 'dark' ? 'rgba(34, 211, 238, 0.05)' : 'rgba(8, 145, 178, 0.07)'}" 
              stroke="${currentTheme === 'dark' ? 'rgba(34, 211, 238, 0.25)' : 'rgba(8, 145, 178, 0.3)'}" 
              stroke-width="1.8" stroke-dasharray="6 4" />
      `;
      svgBodyHtml += `
        <rect class="group-background-lane elicense-lane" x="${boxX}" y="${headerHeight}" width="${boxW}" height="${svgHeight - headerHeight - 8}" rx="8" 
              fill="${currentTheme === 'dark' ? 'rgba(34, 211, 238, 0.05)' : 'rgba(8, 145, 178, 0.07)'}" 
              stroke="${currentTheme === 'dark' ? 'rgba(34, 211, 238, 0.25)' : 'rgba(8, 145, 178, 0.3)'}" 
              stroke-width="1.8" stroke-dasharray="6 4" />
      `;
    }

    if (dol2Coords.length > 0) {
      const minX = Math.min(...dol2Coords);
      const maxX = Math.max(...dol2Coords);
      const boxX = minX - 52;
      const boxW = (maxX - minX) + 104;
      
      svgHeaderHtml += `
        <rect class="group-background-lane dol2-lane" x="${boxX}" y="8" width="${boxW}" height="${headerHeight - 8}" rx="8" 
              fill="${currentTheme === 'dark' ? 'rgba(168, 85, 247, 0.05)' : 'rgba(109, 40, 217, 0.07)'}" 
              stroke="${currentTheme === 'dark' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(109, 40, 217, 0.3)'}" 
              stroke-width="1.8" stroke-dasharray="6 4" />
      `;
      svgBodyHtml += `
        <rect class="group-background-lane dol2-lane" x="${boxX}" y="${headerHeight}" width="${boxW}" height="${svgHeight - headerHeight - 8}" rx="8" 
              fill="${currentTheme === 'dark' ? 'rgba(168, 85, 247, 0.05)' : 'rgba(109, 40, 217, 0.07)'}" 
              stroke="${currentTheme === 'dark' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(109, 40, 217, 0.3)'}" 
              stroke-width="1.8" stroke-dasharray="6 4" />
      `;
    }

    // 2. Draw Group Header Boxes (on top of background lanes)
    if (elicenseCoords.length > 0) {
      const minX = Math.min(...elicenseCoords);
      const maxX = Math.max(...elicenseCoords);
      const boxX = minX - 52;
      const boxW = (maxX - minX) + 104;
      svgHeaderHtml += `
        <g class="group-header-block elicense">
          <rect x="${boxX}" y="10" width="${boxW}" height="30" rx="6" 
                fill="${currentTheme === 'dark' ? 'rgba(34, 211, 238, 0.08)' : 'rgba(8, 145, 178, 0.08)'}" 
                stroke="${currentTheme === 'dark' ? 'rgba(34, 211, 238, 0.3)' : 'rgba(8, 145, 178, 0.4)'}" 
                stroke-width="1.2" stroke-dasharray="4 3" />
          <text x="${boxX + boxW / 2}" y="28" text-anchor="middle" font-weight="700" font-size="11px" 
                fill="${currentTheme === 'dark' ? '#22d3ee' : '#0891b2'}">eLicense (ประชาชน)</text>
        </g>
      `;
    }

    if (dol2Coords.length > 0) {
      const minX = Math.min(...dol2Coords);
      const maxX = Math.max(...dol2Coords);
      const boxX = minX - 52;
      const boxW = (maxX - minX) + 104;
      svgHeaderHtml += `
        <g class="group-header-block dol2">
          <rect x="${boxX}" y="10" width="${boxW}" height="30" rx="6" 
                fill="${currentTheme === 'dark' ? 'rgba(168, 85, 247, 0.08)' : 'rgba(109, 40, 217, 0.08)'}" 
                stroke="${currentTheme === 'dark' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(109, 40, 217, 0.4)'}" 
                stroke-width="1.2" stroke-dasharray="4 3" />
          <text x="${boxX + boxW / 2}" y="28" text-anchor="middle" font-weight="700" font-size="11px" 
                fill="${currentTheme === 'dark' ? '#c084fc' : '#6d28d9'}">DOL2 (เจ้าหน้าที่)</text>
        </g>
      `;
    }

    systems.forEach((sys, idx) => {
      const x = systemCoords[sys];

      svgBodyHtml += `
        <line class="lifeline-line" x1="${x}" y1="${headerHeight}" x2="${x}" y2="${svgHeight - footerHeight}" />
      `;

      svgHeaderHtml += `
        <line class="lifeline-line" x1="${x}" y1="84" x2="${x}" y2="${headerHeight}" />
      `;

      // Colorize system nodes dynamically based on project name mappings (mimicking user image style)
      const sysStyle = getSystemStyle(sys, currentTheme);

      // Header Node (Top) - shifted down to y=50
      svgHeaderHtml += `
        <g class="lifeline-node">
          <rect class="lifeline-rect" x="${x - 55}" y="50" width="110" height="34" fill="${sysStyle.bg}" stroke="${sysStyle.border}" />
          <text class="lifeline-text" x="${x}" y="71" fill="${sysStyle.text}">${sys}</text>
        </g>
      `;

      // Footer Node (Bottom)
      svgBodyHtml += `
        <g class="lifeline-node">
          <rect class="lifeline-rect" x="${x - 55}" y="${svgHeight - 38}" width="110" height="28" fill="${sysStyle.bg}" stroke="${sysStyle.border}" />
          <text class="lifeline-text" x="${x}" y="${svgHeight - 20}" fill="${sysStyle.text}">${sys}</text>
        </g>
      `;
    });

    steps.forEach((step, stepIdx) => {
      const y = headerHeight + stepIdx * gapY + gapY / 2;
      const xFrom = systemCoords[step.from] || (step.from ? systemCoords[step.from.toLowerCase()] : undefined);
      const xTo = systemCoords[step.to] || (step.to ? systemCoords[step.to.toLowerCase()] : undefined);

      if (xFrom) {
        svgBodyHtml += `<rect class="activation-box" x="${xFrom - 5}" y="${y - 10}" width="10" height="30" />`;
      }
      if (xTo && xFrom !== xTo) {
        svgBodyHtml += `<rect class="activation-box" x="${xTo - 5}" y="${y - 5}" width="10" height="30" />`;
      }
    });

    steps.forEach((step, stepIdx) => {
      const y = headerHeight + stepIdx * gapY + gapY / 2;
      const xFrom = systemCoords[step.from] || (step.from ? systemCoords[step.from.toLowerCase()] : undefined);
      const xTo = systemCoords[step.to] || (step.to ? systemCoords[step.to.toLowerCase()] : undefined);
      
      const method = getApiMethod(step);
      const isActive = currentStepIndex === stepIdx;
      const activeClass = isActive ? "active" : "";
      
      if (!xFrom || !xTo) return;

      if (xFrom !== xTo) {
        const directionRight = xTo > xFrom;
        const arrowStart = directionRight ? xFrom + 5 : xFrom - 5;
        const arrowEnd = directionRight ? xTo - 8 : xTo + 8;

        svgBodyHtml += `
          <g class="arrow-group" data-step-index="${stepIdx}" style="cursor: pointer;">
            <line x1="${arrowStart}" y1="${y}" x2="${arrowEnd}" y2="${y}" stroke="transparent" stroke-width="12" />
            <line class="message-arrow method-${method} ${activeClass}" 
                  x1="${arrowStart}" y1="${y}" x2="${arrowEnd}" y2="${y}" 
                  marker-end="url(#arrow-${method})" />
            
            <circle class="step-number-bubble ${activeClass}" cx="${(xFrom + xTo) / 2}" cy="${y - 20}" r="10" />
            <text class="step-number-text ${activeClass}" x="${(xFrom + xTo) / 2}" y="${y - 20}">${stepIdx + 1}</text>

            <text class="message-text ${activeClass}" x="${(xFrom + xTo) / 2}" y="${y - 6}" text-anchor="middle">
              ${truncateString(cleanLabel(step.label), 26)}
            </text>
          </g>
        `;
      } else {
        const loopRadiusX = 40;
        const loopHeight = 25;
        const startX = xFrom + 5;
        const activeClass = isActive ? "active" : "";

        svgBodyHtml += `
          <g class="arrow-group self-loop" data-step-index="${stepIdx}" style="cursor: pointer;">
            <path d="M ${startX} ${y - 12} 
                     C ${startX + loopRadiusX * 1.5} ${y - 12}, 
                       ${startX + loopRadiusX * 1.5} ${y + loopHeight}, 
                       ${startX + 6} ${y + loopHeight}" 
                  stroke="transparent" stroke-width="12" fill="none" />
            
            <path class="message-arrow method-${method} ${activeClass}" 
                  d="M ${startX} ${y - 12} 
                     C ${startX + loopRadiusX} ${y - 12}, 
                       ${startX + loopRadiusX} ${y + loopHeight}, 
                       ${startX + 6} ${y + loopHeight}" 
                  fill="none" marker-end="url(#arrow-${method})" />

            <circle class="step-number-bubble ${activeClass}" cx="${xFrom + loopRadiusX + 5}" cy="${y + 5}" r="10" />
            <text class="step-number-text ${activeClass}" x="${xFrom + loopRadiusX + 5}" y="${y + 5}">${stepIdx + 1}</text>

            <text class="message-text ${activeClass}" x="${xFrom + 12}" y="${y - 16}" text-anchor="start">
              ${truncateString(cleanLabel(step.label), 24)}
            </text>
          </g>
        `;
      }
    });

    svgHeaderHtml += `</svg>`;
    svgBodyHtml += `</svg>`;
    
    diagramContainer.innerHTML = `
      <div class="diagram-header-sticky">
        ${svgHeaderHtml}
      </div>
      <div class="diagram-body-scroll">
        ${svgBodyHtml}
      </div>
    `;

    const arrowGroups = diagramContainer.querySelectorAll(".arrow-group");
    arrowGroups.forEach((group) => {
      group.addEventListener("click", () => {
        const stepIdx = parseInt(group.getAttribute("data-step-index"));
        currentStepIndex = stepIdx;
        expandDetailsPanel();
        renderDiagram();
        renderDetails();
      });
    });
  }

  // --- Render Details Pane ---
  function renderDetails() {
    const request = WORKFLOWS_DATA[currentProject].requests[currentRequestIndex];

    if (currentStepIndex === null) {
      let timelineHtml = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; flex-direction: column; gap: 8px;">
      `;

      request.steps.forEach((step, idx) => {
        const method = getApiMethod(step);
        timelineHtml += `
          <div class="step-detail-card" style="cursor: pointer; padding: 12px 14px; transition: all 0.2s;" onclick="window.selectStep(${idx})">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 8px; max-width: 80%;">
                <span class="step-number-bubble active" style="position: static; display: inline-flex; width: 20px; height: 20px; font-size: 10px; font-weight: 700; align-items: center; justify-content: center; border-radius: 50%; color: #fff; background-color: var(--accent-color); flex-shrink: 0;">${idx + 1}</span>
                <span class="step-label" style="font-size: 0.88rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 600;">${cleanLabel(step.label)}</span>
              </div>
              <span class="step-badge ${method}" style="font-size: 0.65rem; padding: 2px 5px;">${method}</span>
            </div>
            ${step.api ? `<div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${step.api}</div>` : ""}
          </div>
        `;
      });

      timelineHtml += `
          </div>
        </div>
      `;

      stepDetailContent.innerHTML = timelineHtml;

      window.selectStep = (idx) => {
        currentStepIndex = idx;
        expandDetailsPanel();
        renderDiagram();
        renderDetails();
      };
      
    } else {
      const step = request.steps[currentStepIndex];
      const method = getApiMethod(step);

      let detailHtml = `
        <div class="step-detail-card">
          <div class="step-header">
            <div style="display: flex; flex-direction: column; gap: 4px; max-width: 80%;">
              <div style="font-size: 0.78rem; color: var(--accent-color); font-weight: 700;">ขั้นตอนที่ ${currentStepIndex + 1} จาก ${request.steps.length}</div>
              <div class="step-label">${cleanLabel(step.label)}</div>
            </div>
            <span class="step-badge ${method}">${method}</span>
          </div>

          <div style="border-top: 1px solid var(--border-color); margin: 4px 0;"></div>
          
          <div class="detail-item">
            <div class="detail-item-label">SYSTEMS LINK</div>
            <div style="font-size: 0.88rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-color);">${step.from}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 14px; height: 14px; color: var(--text-muted);">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span style="color: #10b981; font-weight: 700;">${step.to}</span>
            </div>
          </div>
      `;

      if (step.api) {
        detailHtml += `
          <div class="detail-item">
            <div class="detail-item-label">API ENDPOINT</div>
            <div class="detail-item-value">${step.api}</div>
          </div>
        `;
      }



      if (step.screen) {
        detailHtml += `
          <div class="detail-item">
            <div class="detail-item-label">OPERATOR SCREEN</div>
            <div>
              <span class="screen-code-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 14px; height: 14px;">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
                ${step.screen}
              </span>
            </div>
            <div style="background-color: var(--bg-primary); border: 1px dashed var(--border-color); border-radius: 8px; padding: 14px; margin-top: 6px; font-size: 0.78rem; text-align: center; color: var(--text-secondary); display: flex; flex-direction: column; align-items: center; gap: 6px;">
              <span style="font-weight: 600; font-size: 0.85rem; color: var(--text-primary);">[หน้าจอระบบ ${step.from === 'EXP' ? 'เจ้าหน้าที่ดำเนินการ' : 'ลงทะเบียน'}]</span>
              <span style="font-size: 0.72rem; color: var(--text-muted);">จำลองการทำงานหน้าเว็บ ${step.screen}</span>
              <div style="width: 100%; height: 64px; background-color: var(--bg-secondary); border-radius: 6px; border: 1px solid var(--border-color); margin-top: 8px; position: relative; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);">
                <div style="width: 75%; height: 8px; background-color: var(--bg-tertiary); border-radius: 4px;"></div>
                <div style="position: absolute; bottom: 8px; right: 8px; width: 34px; height: 16px; border-radius: 4px; background: var(--accent-gradient); font-size: 7px; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; box-shadow: 0 2px 6px rgba(99, 102, 241, 0.3);">SAVE</div>
              </div>
            </div>
          </div>
        `;
      }

      if (step.notes) {
        detailHtml += `
          <div class="detail-item">
            <div class="detail-item-label">BUSINESS NOTES / ALERTS</div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6; background-color: rgba(99, 102, 241, 0.05); border-left: 4px solid var(--accent-color); padding: 10px 14px; border-radius: 0 8px 8px 0;">
              ${step.notes}
            </div>
          </div>
        `;
      }

      detailHtml += `
        </div>
      `;

      stepDetailContent.innerHTML = detailHtml;
    }
  }

  function cleanLabel(label) {
    return label.replace(/^\d+(\.\d+)?\.\s*/, "");
  }

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  init();
});
