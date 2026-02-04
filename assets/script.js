// Minimal interactivity: theme toggle, project filter, copy email, smooth in-page links
(function(){
  const themeToggle = document.getElementById('theme-toggle');
  const projectFilter = document.getElementById('project-filter');
  const projectsGrid = document.getElementById('projects-grid');
  const copyEmailBtn = document.getElementById('copy-email');

  // theme
  function setTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    themeToggle.textContent = t === 'light' ? '🌙' : '☀️';
  }
  const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark');
  setTheme(saved);

  themeToggle.addEventListener('click', ()=>{
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });

  // filter
  function filterProjects(q){
    q = (q || '').trim().toLowerCase();
    const cards = projectsGrid.querySelectorAll('.project');
    cards.forEach(c=>{
      const tags = c.dataset.tags || '';
      const text = (c.textContent || '') + ' ' + tags;
      c.style.display = q === '' || text.toLowerCase().includes(q) ? '' : 'none';
    });
  }
  projectFilter.addEventListener('input', ()=> filterProjects(projectFilter.value));
  filterProjects('');

  // copy email
  copyEmailBtn.addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText('mihir.ranade@outlook.com');
      copyEmailBtn.textContent = 'Copied!';
      setTimeout(()=> copyEmailBtn.textContent = 'Copy email', 2000);
    }catch(e){
      window.location.href = 'mailto:mihir.ranade@outlook.com';
    }
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

})();
