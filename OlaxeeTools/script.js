document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll("#bottom-nav .nav-item");
  const pages = document.querySelectorAll(".page");

  function showPage(id) {
    pages.forEach(p => p.classList.toggle("current", p.id === id));
    navItems.forEach(item => item.classList.toggle("active", item.dataset.target === id));
    const activePage = document.getElementById(id);
    if(activePage){
      const scrollable = activePage.querySelector(".readme-content, .readme");
      if(scrollable) scrollable.focus();
      else activePage.focus();
    }
  }

  navItems.forEach(item => item.addEventListener("click", () => showPage(item.dataset.target)));

  document.getElementById("to-download").addEventListener("click", () => showPage("download"));
  document.getElementById("to-readme").addEventListener("click", () => showPage("readme"));

  const readmeContentEl = document.getElementById("readme-content");
  const arrowLeft = document.getElementById("arrow-left");
  const arrowRight = document.getElementById("arrow-right");
  const pageCounter = document.getElementById("page-counter");

  const readmePages = [
    `<h3>But</h3><p>L'exécutable <code>iP_OlaxeeTools.exe</code> permet de détecter votre IP privée et lance directement le serveur local et l'interface web.</p>`,
    `<h3>Contenu</h3><ul>
      <li><code>iP_OlaxeeTools.exe</code> — exécutable principal.</li>
    </ul>`,
    `<h3>Instructions</h3>
      <ol>
        <li>Double-cliquez sur <code>iP_OlaxeeTools.exe</code> pour lancer le serveur et ouvrir l'interface.</li>
      </ol>`,
    `<h3>Détails techniques</h3>
      <p>L'outil utilise une socket UDP pour détecter l'IP locale. L'interface web affiche l'adresse. Valeur de secours en cas d'échec : <code>1.1.1.1</code>.</p>`,
    `<h3>Dépannage</h3>
      <ul>
        <li>Si aucune IP affichée, assurez-vous que <code>iP_OlaxeeTools.exe</code> est lancé et que le pare-feu autorise les connexions locales.</li>
      </ul>`,
    `<h3>Sécurité</h3>
      <p>Usage local uniquement. Ne publiez pas vos IP privées.</p>`
  ];

  let currentPage = 0;
  const totalPages = readmePages.length;

  function updateReadme(){
    readmeContentEl.innerHTML = readmePages[currentPage];
    pageCounter.textContent = `${currentPage+1} / ${totalPages}`;
    arrowLeft.classList.toggle("disabled", currentPage===0);
    arrowLeft.setAttribute("aria-disabled", currentPage===0 ? "true":"false");
    arrowRight.classList.toggle("disabled", currentPage===totalPages-1);
    arrowRight.setAttribute("aria-disabled", currentPage===totalPages-1 ? "true":"false");
    readmeContentEl.scrollTop = 0;
  }

  arrowLeft.addEventListener("click", () => { if(currentPage>0) currentPage--; updateReadme(); });
  arrowRight.addEventListener("click", () => { if(currentPage<totalPages-1) currentPage++; updateReadme(); });

  [arrowLeft, arrowRight].forEach(arrow=>{
    arrow.addEventListener("keydown", e=>{
      if(["Enter"," ","Spacebar"].includes(e.key)){ e.preventDefault(); arrow.click(); }
    });
  });

  updateReadme();

  const readmeDiv = document.querySelector("#readme .readme-content");
  if(readmeDiv){
    readmeDiv.addEventListener('wheel', e=>{
      const delta = e.deltaY;
      if((delta<0 && readmeDiv.scrollTop===0) || (delta>0 && readmeDiv.scrollHeight - readmeDiv.clientHeight - readmeDiv.scrollTop <=1)){
        e.preventDefault();
      }
    }, { passive:false });
  }
});
