/**
 * M.E.C.O. Docs — Lógica Interactiva para la Documentación Técnica
 * Estilo GLPI / ReadTheDocs: ScrollSpy, Búsqueda instantánea, Copia de código y Mobile Drawer
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Drawer
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const sidebar = document.getElementById("docsSidebar");

  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

    // Close when clicking a link on mobile
    sidebar.querySelectorAll(".sidebar-link").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 860) {
          sidebar.classList.remove("open");
        }
      });
    });
  }

  // 2. Copy Code Buttons
  document.querySelectorAll(".copy-button").forEach(btn => {
    btn.addEventListener("click", () => {
      const codeBlock = btn.closest(".code-container").querySelector("pre code");
      if (!codeBlock) return;

      navigator.clipboard.writeText(codeBlock.innerText).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          ¡Copiado!
        `;
        btn.classList.add("copied");

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove("copied");
        }, 2000);
      }).catch(err => {
        console.error("Error al copiar al portapapeles:", err);
      });
    });
  });

  // 3. Instant Sidebar Search
  const searchInput = document.getElementById("docsSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const sidebarLinks = document.querySelectorAll(".sidebar-item");

      sidebarLinks.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (query === "" || text.includes(query)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });

      // Hide category if all children are hidden
      document.querySelectorAll(".sidebar-category").forEach(cat => {
        const visibleItems = cat.querySelectorAll(".sidebar-item:not([style*='display: none'])");
        if (visibleItems.length === 0 && query !== "") {
          cat.style.display = "none";
        } else {
          cat.style.display = "";
        }
      });
    });
  }

  // 4. ScrollSpy for TOC & Sidebar Links
  const sections = document.querySelectorAll("section[id], article[id]");
  const tocLinks = document.querySelectorAll(".toc-link");
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  function updateActiveLink() {
    let currentId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    if (!currentId && sections.length > 0) {
      currentId = sections[0].getAttribute("id");
    }

    if (currentId) {
      tocLinks.forEach(link => {
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      sidebarLinks.forEach(link => {
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();
});
