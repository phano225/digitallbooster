(function initAdminLogin() {
  function byId(id) {
    return document.getElementById(id);
  }

  function setStatus(text, isError) {
    const node = byId("loginStatus");
    node.textContent = text || "";
    node.style.color = isError ? "#b3261e" : "#1f5ea8";
  }

  async function bootstrap() {
    if (!window.CMS_API) {
      setStatus("CMS API indisponible.", true);
      return;
    }

    if (!window.CMS_API.isSupabaseEnabled()) {
      window.location.href = "./admin.html";
      return;
    }

    const session = await window.CMS_API.getSession();
    if (session) {
      window.location.href = "./admin.html";
      return;
    }

    byId("loginForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        setStatus("Connexion en cours...");
        const email = byId("loginEmail").value.trim();
        const password = byId("loginPassword").value;
        await window.CMS_API.login(email, password);
        setStatus("Connexion reussie.");
        window.location.href = "./admin.html";
      } catch (error) {
        setStatus(error.message || "Echec de connexion.", true);
      }
    });
  }

  bootstrap();
})();
