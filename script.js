document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    });
  }

  const themeBtn = document.querySelector('.btn-theme-atelier');
  const savedTheme = localStorage.getItem('purseheritage_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('theme-atelier-light');
    if (themeBtn) themeBtn.textContent = 'Atelier Dark';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('theme-atelier-light');
      themeBtn.textContent = isLight ? 'Atelier Dark' : 'Atelier Light';
      localStorage.setItem('purseheritage_theme', isLight ? 'light' : 'dark');
    });
  }

  const mobileToggle = document.querySelector('.mobile-toggle-purse');
  const navMenu = document.querySelector('.purse-nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      navMenu.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--bg-purse-surface)';
        navMenu.style.padding = '1.75rem';
        navMenu.style.boxShadow = 'var(--shadow-purse)';
        navMenu.style.borderBottom = '1px solid var(--border-purse)';
      }
    });
  }

  /* ==========================================================================
     1. HAUTE LEATHERCRAFT WORKBENCH ENGINE
  ========================================================================== */
  let currentSilhouette = 'trapezoid';
  let currentLeather = 'box';
  let currentHardware = 'vermeil';

  const silhouetteCards = document.querySelectorAll('.wb-silhouette-card');
  const leatherBtns = document.querySelectorAll('#leather-badges .wb-badge-btn');
  const hardwareBtns = document.querySelectorAll('#hardware-badges .wb-badge-btn');

  const gSpiNum = document.getElementById('gauge-spi-num');
  const gSpiBadge = document.getElementById('gauge-spi-badge');
  const gSpiBar = document.getElementById('gauge-spi-bar');
  const gSpiNote = document.getElementById('gauge-spi-note');

  const gLifeNum = document.getElementById('gauge-life-num');
  const gLifeBadge = document.getElementById('gauge-life-badge');
  const gLifeNote = document.getElementById('gauge-life-note');
  const barPhase1 = document.getElementById('bar-phase1-val');
  const barPhase2 = document.getElementById('bar-phase2-val');
  const barPhase3 = document.getElementById('bar-phase3-val');

  const gEdgeNum = document.getElementById('gauge-edge-num');
  const gEdgeBadge = document.getElementById('gauge-edge-badge');
  const gEdgeBar = document.getElementById('gauge-edge-bar');
  const gEdgeNote = document.getElementById('gauge-edge-note');

  const tStitch = document.getElementById('telem-stitch');
  const tTannage = document.getElementById('telem-tannage');
  const tHardware = document.getElementById('telem-hardware');
  const tEdge = document.getElementById('telem-edge');

  function updatePurseWorkbench() {
    if (!gSpiNum) return;

    let spiVal = 8.5;
    let spiBadge = 'Haute Couturier SPI';
    let spiNote = 'Point Sellier Two-Needle Hand Saddle Stitch';

    let lifeNum = '85+';
    let lifeBadge = 'Century Heirloom';
    let lifeNote = 'French Box Calf Glass Glaze Patina';
    let bP1 = 'Decade 0-2 (Mirror Glass)';
    let bP2 = 'Decade 2-5 (Rich Honey Gloss)';
    let bP3 = 'Decade 5-8+ (Pristine Antique)';

    let edgeVal = 7;
    let edgeBadge = '7-Layer Matte Finish';
    let edgeNote = 'Hot Iron Beeswax Filetage Creased';

    let stitch = 'Lin Câblé #532 Waxed Linen';
    let tannage = 'Full-Grain French Box Calfskin';
    let hardware = '24k Gold Vermeil Guilloché';
    let edge = '7-Coat Hand Edge Paint & Wax';

    if (currentSilhouette === 'flap') {
      spiVal = 9.0;
      spiBadge = 'Micro Saddle Stitch';
      edgeVal = 8;
    } else if (currentSilhouette === 'bucket') {
      spiVal = 7.0;
      spiBadge = 'Heavy Saddle Stitch';
      edgeVal = 6;
    } else if (currentSilhouette === 'clutch') {
      spiVal = 10.0;
      spiBadge = 'Ultra-Fine SPI';
      edgeVal = 9;
    }

    if (currentLeather === 'barenia') {
      tannage = 'Vegetable-Tanned Barenia Saddle Leather';
      lifeNum = '100+';
      lifeBadge = 'Living Saddle Patina';
      lifeNote = 'Self-Healing Natural Sebaceous Oils';
      bP1 = 'Year 0-5 (Warm Ochre)';
      bP2 = 'Year 5-20 (Deep Amber)';
      bP3 = 'Year 20-100+ (Rich Mahogany)';
    } else if (currentLeather === 'epsom') {
      tannage = 'Embossed Grain Rigid Epsom Calf';
      lifeNum = '60+';
      lifeBadge = 'Scratch Impervious';
      lifeNote = 'Rigid Architectural Shape Hold';
    } else if (currentLeather === 'togo') {
      tannage = 'Supple Grained Baby Calfskin (Togo)';
      lifeNum = '75+';
      lifeBadge = 'Resilient Grain';
      lifeNote = 'Natural Drumming Pebble Rebound';
    }

    if (currentHardware === 'palladium') {
      hardware = 'Mirror Hand-Polished Palladium';
    } else if (currentHardware === 'ruthenium') {
      hardware = 'Gunmetal Brushed Ruthenium PVD';
    }

    gSpiNum.innerHTML = spiVal.toFixed(1);
    gSpiBadge.innerHTML = spiBadge;
    gSpiBar.style.width = (spiVal / 12 * 100) + '%';
    gSpiNote.innerHTML = spiNote;

    gLifeNum.innerHTML = lifeNum;
    gLifeBadge.innerHTML = lifeBadge;
    gLifeNote.innerHTML = lifeNote;
    barPhase1.innerHTML = bP1;
    barPhase2.innerHTML = bP2;
    barPhase3.innerHTML = bP3;

    gEdgeNum.innerHTML = edgeVal;
    gEdgeBadge.innerHTML = edgeBadge;
    gEdgeBar.style.width = (edgeVal / 10 * 100) + '%';
    gEdgeNote.innerHTML = edgeNote;

    tStitch.innerHTML = stitch;
    tTannage.innerHTML = tannage;
    tHardware.innerHTML = hardware;
    tEdge.innerHTML = edge;
  }

  silhouetteCards.forEach(card => {
    card.addEventListener('click', () => {
      silhouetteCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentSilhouette = card.getAttribute('data-silhouette');
      updatePurseWorkbench();
    });
  });

  leatherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      leatherBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLeather = btn.getAttribute('data-leather');
      updatePurseWorkbench();
    });
  });

  hardwareBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hardwareBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentHardware = btn.getAttribute('data-hardware');
      updatePurseWorkbench();
    });
  });

  updatePurseWorkbench();

  /* ==========================================================================
     2. 5-STAGE HAUTE LEATHER CRAFTSMANSHIP DIAGNOSTIC MATRIX
  ========================================================================== */
  const matrixData = {
    "1": {
      tag: "Stage 01: Hide Selection",
      title: "Full-Grain French Calfskin Inspection & Grain Matching",
      desc: "Master leather artisans inspect prime calfskin hides under grazing daylight lamps, rejecting over 85% of hides. Only flawless grain zones from the back and rump are selected for bag body panels, ensuring symmetrical grain flow.",
      spi: "Grain Flow Symmetry",
      tannage: "Tanneries du Puy / d'Annonay",
      edge: "Zero Surface Flaws Allowed",
      time: "4 Hours Visual Curation",
      action: "Hand Grain Mapping",
      artifact: "Bespoke Cut Pattern Templates",
      metric: "100% Full-Grain Integrity",
      cue: "<strong>Atelier Conservator Cue:</strong> Symmetrical grain orientation across front, gussets, and flap ensures the bag maintains balanced structural tension over decades."
    },
    "2": {
      tag: "Stage 02: Hand Clicking & Skiving",
      title: "Precision Clicking Knife Cutting & Beveled Edge Skiving",
      desc: "Using hand-forged clicking blades, pattern pieces are cut by hand. Edges are then skived (thinned with a French skiving knife) from 1.6mm down to 0.6mm at seam junctions, eliminating bulky layered seams.",
      spi: "0.6mm Precision Skive",
      tannage: "Calibrated Thickness Taper",
      edge: "Feathered Overlap Seam",
      time: "6 Hours Clicking & Skiving",
      action: "Beveled Hand Skiving",
      artifact: "Skived Leather Component Suite",
      metric: "Sub-Millimeter Edge Uniformity",
      cue: "<strong>Atelier Conservator Cue:</strong> Skiving must taper gradually without gouging the grain; flawless skiving allows leather seams to fuse invisibly."
    },
    "3": {
      tag: "Stage 03: Point Sellier Saddle Stitching",
      title: "Two-Needle Waxed Linen Hand Saddle Stitching (Point Sellier)",
      desc: "Executed using a wooden stitching clamp (pince à coudre), an awl, and a single strand of beeswaxed Lin Câblé thread with two needles. Each stitch forms a double-interlocked figure-eight that cannot unravel even if a stitch is cut.",
      spi: "8.5 Stitches Per Inch (SPI)",
      tannage: "Waxed Lin Câblé #532",
      edge: "45° Pricking Iron Angle",
      time: "18-24 Hours Pure Hand Stitching",
      action: "Two-Needle Awl Piercing",
      artifact: "Interlocked Saddle Seam",
      metric: "Indestructible Tensile Bond",
      cue: "<strong>Atelier Conservator Cue:</strong> Machine lockstitches unravel if one thread breaks; authentic two-needle hand saddle stitches remain permanently locked."
    },
    "4": {
      tag: "Stage 04: Edge Finishing & Filetage",
      title: "7-Layer Hand Edge Painting, Sanding & Hot Iron Beeswax Creasing",
      desc: "Raw leather edges are sanded, coated with high-solid edge paint, dried, and re-sanded through 7 consecutive cycles. Finally, a heated brass creaser (filetuse) applies hot natural beeswax to burnish a smooth, glass-like edge.",
      spi: "7 Consecutive Paint Layers",
      tannage: "Natural Yellow Beeswax",
      edge: "Glass-Polished Matte Bevel",
      time: "12 Hours Multi-Day Finishing",
      action: "Hot Brass Iron Creasing (Filetage)",
      artifact: "Glass-Sealed Leather Edge",
      metric: "Zero Moisture Ingress Barrier",
      cue: "<strong>Atelier Conservator Cue:</strong> Hot filetage creasing compresses leather fibers and melts wax deep into the edge, creating a permanent barrier against delamination."
    },
    "5": {
      tag: "Stage 05: Guilloché Hardware Assembly",
      title: "24k Gold Vermeil & Palladium Riveting & Sangle Turnlock Mounting",
      desc: "Solid forged brass hardware electroplated with 3 microns of 24k gold or palladium is mounted by hand. Screws and pearled rivets are secured and polished to mirror perfection, completing the bespoke heirloom creation.",
      spi: "3-Micron Vermeil Plating",
      tannage: "Solid Forged Marine Brass",
      edge: "Hand-Pearled Rivet Heads",
      time: "5 Hours Final Bench Assembly",
      action: "Precision Riveting & Lock Fit",
      artifact: "Finished Bespoke Handbag",
      metric: "Silky 100,000-Cycle Turnlock",
      cue: "<strong>Atelier Conservator Cue:</strong> Hand-pearling rivet heads with a round brass cup hammer locks the plaque securely without scratching the mirror gold finish."
    }
  };

  const matrixStepBtns = document.querySelectorAll('.matrix-step-btn');
  const dTag = document.getElementById('matrix-display-tag');
  const dTitle = document.getElementById('matrix-display-title');
  const dDesc = document.getElementById('matrix-display-desc');
  const dSpi = document.getElementById('matrix-spi-val');
  const dTannage = document.getElementById('matrix-tannage-val');
  const dEdge = document.getElementById('matrix-edge-val');
  const dTime = document.getElementById('matrix-time-val');
  const dAct = document.getElementById('matrix-act-val');
  const dArtifact = document.getElementById('matrix-artifact-val');
  const dMetric = document.getElementById('matrix-metric-val');
  const dCue = document.getElementById('matrix-culinary-text');

  if (matrixStepBtns.length > 0) {
    matrixStepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        matrixStepBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const phaseKey = btn.getAttribute('data-phase');
        const data = matrixData[phaseKey];
        if (data && dTitle) {
          dTag.innerHTML = data.tag;
          dTitle.innerHTML = data.title;
          dDesc.innerHTML = data.desc;
          dSpi.innerHTML = data.spi;
          dTannage.innerHTML = data.tannage;
          dEdge.innerHTML = data.edge;
          dTime.innerHTML = data.time;
          dAct.innerHTML = data.action;
          dArtifact.innerHTML = data.artifact;
          dMetric.innerHTML = data.metric;
          dCue.innerHTML = data.cue;
        }
      });
    });
  }

  /* ==========================================================================
     3. FAQ & BLOG SEARCH
  ========================================================================== */
  const faqBtns = document.querySelectorAll('.faq-purse-btn');
  if (faqBtns.length > 0) {
    faqBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-purse-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }

  const searchInput = document.getElementById('purse-search-input');
  const blogCards = document.querySelectorAll('.blog-purse-card');
  if (searchInput && blogCards.length > 0) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      blogCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = (q === '' || text.includes(q)) ? 'flex' : 'none';
      });
    });
  }
});
