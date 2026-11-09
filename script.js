/**
 * FARSEEN AHRAS RAUFALI — HAND-DRAWN SKETCHBOOK PORTFOLIO SCRIPT
 * Interactive Hand-Drawn Avionics Canvas, IoT Telemetry, Spiral Notebook CLI & Modals
 */

document.addEventListener('DOMContentLoaded', () => {

  // 0. STARTUP SPLASH ANIMATION (Displays name, then minimizes to top left unveiling website)
  const splash = document.getElementById('startupSplash');
  if (splash) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      splash.classList.add('is-hidden');
    } else {
      let dismissed = false;
      const dismissSplash = () => {
        if (dismissed) return;
        dismissed = true;
        splash.classList.add('is-minimizing');
        setTimeout(() => {
          splash.classList.add('is-hidden');
        }, 700);
      };

      // Auto-minimize in ~1.8 seconds to top-left
      setTimeout(dismissSplash, 1800);

      // Tap or click to unveil immediately
      splash.addEventListener('click', dismissSplash);
    }
  }


  // ==========================================
  // 1. NAVBAR SCROLL EFFECT & MOBILE MENU
  // ==========================================
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const closeIcon = document.getElementById('closeIcon');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = !mobileMenu.classList.contains('hidden');
      if (isExpanded) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      } else {
        mobileMenu.classList.remove('hidden');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // Active section scrollspy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLinks = document.querySelectorAll(`.nav-link[href*="${sectionId}"]`);

      matchingLinks.forEach(matchingLink => {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          if (!matchingLink.classList.contains('active-nav')) {
            matchingLink.classList.add('active-nav');
            const parentNav = matchingLink.closest('nav');
            if (parentNav && parentNav.scrollWidth > parentNav.clientWidth) {
              matchingLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
          }
        } else {
          matchingLink.classList.remove('active-nav');
        }
      });
    });
  });


  // ==========================================
  // 2. PROJECT CATEGORY FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active-filter');
      });
      btn.classList.add('active-filter');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });


  // ==========================================
  // 5. PROJECT DETAILS DEEP-DIVE MODAL (LAB DOSSIER)
  // ==========================================
  const projectData = {
    drone: {
      title: "ESP32 Drone Flight Controller & Control Software",
      subtitle: "Custom FreeRTOS C++ Software • 1kHz Loop • MPU-6050 6-DOF IMU • PID Closed-Loop",
      period: "2025 - 2026 | Project Lead",
      content: `
        <div class="space-y-4 text-slate-300 text-sm font-body leading-relaxed">
          <div class="p-3.5 bg-[#fbf9f4] rounded-xl border-2 border-[#1e2022] shadow-[2px_2px_0px_#1e2022]">
            <h4 class="font-display text-cyan-400 text-sm font-bold uppercase mb-1">Software Architecture & Task Isolation</h4>
            <p>Built directly around the ESP32 dual-core Xtensa 32-bit LX6 processor running at 240MHz. The flight controller operates a deterministic 1kHz control loop pinned to Core 1, isolating sensor reading and motor calculation from Core 0 which handles wireless telemetry and PPM receiver decoding.</p>
          </div>
          <div>
            <h4 class="font-display text-slate-200 text-sm font-bold uppercase mb-2">Key Technical Feats & Field Notes:</h4>
            <ul class="list-disc list-inside space-y-1.5 text-slate-300">
              <li><strong>Raw I2C Fast-Mode Communication:</strong> Configured ESP32 I2C peripheral to 400kHz to extract raw gyro and accelerometer readings at sub-millisecond intervals.</li>
              <li><strong>Vibration & Drift Mitigation:</strong> Resolved severe physical drone motor vibration inducing false G-forces on the MPU6050 by implementing mechanical TPU dampening standoffs coupled with an algorithmic digital Low-Pass Filter (DLPF) and complementary filtering.</li>
              <li><strong>PPM Input Interrupt Decoding:</strong> Decoded 8-channel RC transmitter PPM pulse trains using hardware edge interrupts with microsecond precision.</li>
              <li><strong>High-Resolution PWM Output:</strong> Configured ESP32 LEDC hardware timers to generate 490Hz PWM signals for 30A SimonK Electronic Speed Controllers (ESCs).</li>
              <li><strong>Iterative PID Tuning:</strong> Built custom serial telemetry logging scripts to capture angular rate error graphs and systematically tune P, I, and D parameters on pitch, roll, and yaw axes to achieve zero overshoot.</li>
            </ul>
          </div>
        </div>
      `
    },
    hydroponics: {
      title: "Smart Hydroponic Farming System with IoT",
      subtitle: "Automated Nutrient Dosing • ESP32 / NodeMCU • MQTT Telemetry • Climate Closed-Loop",
      period: "2026 - Present | Lead Developer",
      content: `
        <div class="space-y-4 text-slate-300 text-sm font-body leading-relaxed">
          <div class="p-3.5 bg-[#fbf9f4] rounded-xl border-2 border-[#1e2022] shadow-[2px_2px_0px_#1e2022]">
            <h4 class="font-display text-emerald-400 text-sm font-bold uppercase mb-1">Project Scope & Leadership</h4>
            <p>Leading the mini-project development team at P A College of Engineering to build a resilient, automated indoor hydroponics setup that eliminates manual chemical testing and maximizes crop growth velocity through real-time feedback loops.</p>
          </div>
          <div>
            <h4 class="font-display text-slate-200 text-sm font-bold uppercase mb-2">System Components & Automation:</h4>
            <ul class="list-disc list-inside space-y-1.5 text-slate-300">
              <li><strong>Analog Sensor Signal Conditioning:</strong> Interfaced industrial-grade analog pH probes and Electrical Conductivity (EC) sensors with ADC calibration curves to counteract analog voltage noise.</li>
              <li><strong>Automated Micro-Dosing:</strong> Controlled 12V peristaltic pumps via MOSFET drivers to micro-dose pH-Up, pH-Down, and nutrient A/B solutions when readings drift outside tight threshold windows.</li>
              <li><strong>Submersible Circulation & Oxygenation:</strong> Automated cyclic pump schedules with ultrasonic water reservoir level sensing to prevent dry runs.</li>
              <li><strong>MQTT Cloud Pipeline:</strong> Pushes live sensor metrics to a cloud broker and mobile-accessible dashboard, triggering instant SMS/Telegram alerts if water temperature or pH hits critical thresholds.</li>
            </ul>
          </div>
        </div>
      `
    },
    homeauto: {
      title: "Home Assistant IoT Hub & Hands-on Workshops",
      subtitle: "Local-First Architecture • ESP32 & Relays • OTA Firmware • Student Mentorship",
      period: "2024 - 2025 | Project Lead & Instructor",
      content: `
        <div class="space-y-4 text-slate-300 text-sm font-body leading-relaxed">
          <div class="p-3.5 bg-[#fbf9f4] rounded-xl border-2 border-[#1e2022] shadow-[2px_2px_0px_#1e2022]">
            <h4 class="font-display text-indigo-400 text-sm font-bold uppercase mb-1">Decoupled Local Architecture</h4>
            <p>Designed a zero-cloud-dependency home automation hub using Raspberry Pi / Home Assistant Core alongside custom ESP32 peripheral boards distributed across rooms.</p>
          </div>
          <div>
            <h4 class="font-display text-slate-200 text-sm font-bold uppercase mb-2">Features & Workshop Impact:</h4>
            <ul class="list-disc list-inside space-y-1.5 text-slate-300">
              <li><strong>Fail-Safe Electrical Relay Design:</strong> Optocoupler-isolated relay boards wired with 2-way manual physical rocker switches, ensuring appliances remain fully operational even if the Wi-Fi or microcontroller restarts.</li>
              <li><strong>Over-The-Air (OTA) Updates:</strong> Implemented ESP-IDF OTA partitions for flashing firmware over local Wi-Fi without needing USB physical access.</li>
              <li><strong>Workshops & Hands-on Teaching:</strong> Authored complete modular lab manuals and taught over 40+ engineering juniors how to wire GPIOs, calibrate DHT22/PIR sensors, write C++ firmware, and bridge MQTT packets.</li>
            </ul>
          </div>
        </div>
      `
    },
    rccar: {
      title: "IEEE Robotics & Firmware Workshop Lead",
      subtitle: "IEEE Student Branch PACE & ComedKares • Motor Drivers • Volunteer Leadership",
      period: "2024 - 2025 | Head Volunteer",
      content: `
        <div class="space-y-4 text-slate-300 text-sm font-body leading-relaxed">
          <div class="p-3.5 bg-[#fbf9f4] rounded-xl border-2 border-[#1e2022] shadow-[2px_2px_0px_#1e2022]">
            <h4 class="font-display text-cyan-400 text-sm font-bold uppercase mb-1">Event Leadership & Technical Operations</h4>
            <p>Spearheaded the student volunteer team responsible for organizing, staging, and mentoring participants at the university-wide IEEE RC Car Workshop in partnership with ComedKares.</p>
          </div>
          <div>
            <h4 class="font-display text-slate-200 text-sm font-bold uppercase mb-2">Volunteer Duties & Mentorship:</h4>
            <ul class="list-disc list-inside space-y-1.5 text-slate-300">
              <li><strong>Rapid Hardware Diagnostic Desk:</strong> Managed a live technical triage station, diagnosing burned L298N drivers, battery brownouts, faulty solder joints, and misconfigured HC-05/RF modules.</li>
              <li><strong>Hands-on Firmware Coaching:</strong> Mentored junior engineering students in writing bidirectional PWM motor control routines and debugging Bluetooth serial communication packets.</li>
              <li><strong>High Completion Rate:</strong> 100% of participating teams successfully assembled, flashed, and raced their custom RC rovers on the obstacle track.</li>
            </ul>
          </div>
        </div>
      `
    }
  };

  const projectDetailButtons = document.querySelectorAll('.project-details-btn');
  projectDetailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (data) {
        showCustomModal(data.title, data.subtitle, data.content);
      }
    });
  });

  function showCustomModal(title, subtitle, htmlContent) {
    let existingModal = document.getElementById('dynamicProjectModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'dynamicProjectModal';
    modal.className = 'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-[#faf8f5] border-3 border-[#1e2022] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-[8px_8px_0px_#1e2022] relative">
        <div class="washi-tape"></div>
        <div class="flex items-center justify-between px-6 py-4 bg-[#f4f0e6] border-b-2 border-[#1e2022]">
          <div>
            <h3 class="font-display font-bold text-dark text-lg">${title}</h3>
            <p class="text-xs font-mono text-cyan-400 font-bold">${subtitle}</p>
          </div>
          <button id="closeProjModalBtn" class="text-slate-600 hover:text-black p-1 rounded-lg hover:bg-black/5" aria-label="Close modal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="p-6 overflow-y-auto">
          ${htmlContent}
        </div>
        <div class="px-6 py-3.5 bg-[#f4f0e6] border-t-2 border-[#1e2022] flex justify-end">
          <button id="closeProjModalBtn2" class="btn-stamp-secondary text-sm px-5 py-2 font-display font-bold">Close Dossier</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeHandler = () => modal.remove();
    modal.querySelector('#closeProjModalBtn').addEventListener('click', closeHandler);
    modal.querySelector('#closeProjModalBtn2').addEventListener('click', closeHandler);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }


  // ==========================================
  // 6. INTERACTIVE SPIRAL LOGBOOK / CLI PLAYGROUND
  // ==========================================
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBody = document.getElementById('terminalBody');
  const cliQuickBtns = document.querySelectorAll('.cli-quick-btn');

  const cliCommands = {
    help: () => `
      <div class="text-cyan-400 font-bold mb-1 font-display text-sm">AVAILABLE FIELD COMMANDS:</div>
      <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
        <div><span class="text-amber-400 font-bold font-mono">skills</span> - Software stack & developer tools</div>
        <div><span class="text-amber-400 font-bold font-mono">drone</span> - ESP32 flight controller notes</div>
        <div><span class="text-amber-400 font-bold font-mono">hydro</span> - Hydroponic AgTech telemetry</div>
        <div><span class="text-amber-400 font-bold font-mono">ieee</span> - IEEE SB, GRSS & SPS leadership</div>
        <div><span class="text-amber-400 font-bold font-mono">abstracts</span> - IEEE DISCOVER 2025 Book of Abstracts</div>
        <div><span class="text-amber-400 font-bold font-mono">clubs</span> - EMBED Club & GLUB activities</div>
        <div><span class="text-amber-400 font-bold font-mono">edu</span> - Academic background & CGPA</div>
        <div><span class="text-amber-400 font-bold font-mono">resume</span> - Official Resume & CV Page</div>
        <div><span class="text-amber-400 font-bold font-mono">biodata</span> - Official Personal & Academic Biodata</div>
        <div><span class="text-amber-400 font-bold font-mono">github</span> - Official GitHub profile & repos</div>
        <div><span class="text-amber-400 font-bold font-mono">contact</span> - Email, WhatsApp, LinkedIn & GitHub</div>
        <div><span class="text-amber-400 font-bold font-mono">pid-tune</span> - ESP32 PID loop parameters</div>
        <div><span class="text-amber-400 font-bold font-mono">clear</span> - Clear logbook screen</div>
      </div>
    `,
    resume: () => {
      setTimeout(() => { window.location.href = 'resume.html'; }, 1200);
      return `
        <div class="text-cyan-400 font-bold font-display text-sm">OFFICIAL RESUME & CURRICULUM VITAE:</div>
        <div>• Document: Interactive CV & Official PDF (Farseen Ahras Raufali)</div>
        <div>• Direct URL: <a href="resume.html" class="text-pen-blue underline font-bold">resume.html</a></div>
        <div class="text-amber-400 font-mono text-xs mt-1">Navigating to Resume page in 1.2s...</div>
      `;
    },
    biodata: () => {
      setTimeout(() => { window.location.href = 'biodata.html'; }, 1200);
      return `
        <div class="text-cyan-400 font-bold font-display text-sm">OFFICIAL BIODATA DOSSIER:</div>
        <div>• Document: Personal & Academic Biodata Sheet (Farseen Ahras Raufali)</div>
        <div>• Direct URL: <a href="biodata.html" class="text-pen-blue underline font-bold">biodata.html</a></div>
        <div class="text-amber-400 font-mono text-xs mt-1">Navigating to Biodata page in 1.2s...</div>
      `;
    },
    skills: () => `
      <div class="text-cyan-400 font-bold font-display text-sm">TECHNICAL ARSENAL:</div>
      <div>• <span class="font-bold text-dark">Languages:</span> Python, Java, C++, C, JavaScript, SQL, HTML/CSS, Lua</div>
      <div>• <span class="font-bold text-dark">Software & Systems:</span> OOP Architecture, RESTful APIs, FreeRTOS Multithreading, MQTT Telemetry, PID Algorithms, State Machines</div>
      <div>• <span class="font-bold text-dark">DevOps & Linux:</span> Linux / Bash (GLUB), Git/GitHub, Node.js, Home Assistant, VS Code, PlatformIO</div>
    `,
    drone: () => `
      <div class="text-amber-400 font-bold font-display text-sm">ESP32 DRONE CONTROL SOFTWARE:</div>
      <div>Software Lead: Architected real-time flight-control software with MPU-6050 IMU, PPM pulse decoding, high-resolution PWM loops & PID algorithms. Eliminated sensor drift with digital complementary filtering.</div>
    `,
    hydro: () => `
      <div class="text-emerald-500 font-bold font-display text-sm">SMART HYDROPONIC FARMING (2026 - CURRENT):</div>
      <div>Mini-project Lead: Automated indoor cultivation using ESP32, pH & EC probes, automated nutrient dosing pumps, and real-time MQTT telemetry.</div>
    `,
    ieee: () => `
      <div class="text-indigo-400 font-bold font-display text-sm">IEEE LEADERSHIP & PUBLICATIONS:</div>
      <div>• <span class="font-bold text-dark">Chair:</span> IEEE GRSS (Geoscience & Remote Sensing) & SPS (Signal Processing) Student Chapters (since 1st/2nd yr to current 3rd yr).</div>
      <div>• <span class="font-bold text-dark">Execom:</span> IEEE Student Branch @ PA College of Engineering.</div>
      <div>• <span class="font-bold text-dark">Publication:</span> Editorial Committee Member, Book of Abstracts — 2025 IEEE DISCOVER (International Conference on Distributed Computing, VLSI, Electrical Circuits and Robotics).</div>
      <div>• <span class="font-bold text-dark">Head Volunteer:</span> IEEE & ComedKares RC Car Workshop.</div>
    `,
    abstracts: () => `
      <div class="text-amber-400 font-bold font-display text-sm">2025 IEEE DISCOVER — BOOK OF ABSTRACTS:</div>
      <div>• <span class="font-bold text-dark">Conference:</span> 2025 IEEE International Conference on Distributed Computing, VLSI, Electrical Circuits and Robotics (IEEE DISCOVER).</div>
      <div>• <span class="font-bold text-dark">Role:</span> Member of the Editors List / Editorial Committee for the official conference Book of Abstracts during 3rd year.</div>
      <div>• <span class="font-bold text-dark">Scope:</span> Peer-reviewed technical research abstracts across distributed computing, VLSI, smart electrical circuits, and robotics.</div>
    `,
    clubs: () => `
      <div class="text-cyan-400 font-bold font-display text-sm">CAMPUS CLUBS:</div>
      <div>• <span class="text-amber-400 font-bold">GLUB (PACE):</span> GNU/Linux Users' Branch — promoting open-source software, terminal tools, Git workflows, and Linux adoption.</div>
      <div>• <span class="text-emerald-500 font-bold">EMBED Club:</span> Microcontroller software, sensor telemetry, and embedded logic programming.</div>
    `,
    edu: () => `
      <div class="text-dark font-bold font-display text-sm">EDUCATION:</div>
      <div>• <span class="text-cyan-400 font-bold">B.E. Computer Science & Engineering</span> | P A College of Engineering (PACE) | CGPA: 8.81/10 (3rd Year)</div>
      <div>• <span class="text-cyan-400 font-bold">High School (PCMC)</span> | Dhakeerath EMHSS | 90%</div>
      <div>• <span class="text-cyan-400 font-bold">CS50x</span> | Harvard University</div>
    `,
    github: () => `
      <div class="text-cyan-400 font-bold font-display text-sm">GITHUB PROFILE & OPEN-SOURCE CODE:</div>
      <div>• <span class="font-bold text-dark">URL:</span> <a href="https://github.com/Farseen-Ahras" target="_blank" class="text-pen-blue underline font-bold">github.com/Farseen-Ahras</a></div>
      <div>• Explore source code repositories, ESP32 flight controller firmware, hydroponic AgTech modules, and computer science projects.</div>
    `,
    contact: () => `
      <div class="text-cyan-400 font-bold font-display text-sm">DIRECT CONTACT INFO:</div>
      <div>Email: <a href="mailto:farseenahrasraufali@gmail.com" class="text-pen-blue underline">farseenahrasraufali@gmail.com</a></div>
      <div>Phone: <a href="tel:+917012653215" class="text-pen-blue underline">+91 7012653215</a></div>
      <div>GitHub: <a href="https://github.com/Farseen-Ahras" target="_blank" class="text-pen-blue underline">github.com/Farseen-Ahras</a></div>
      <div>LinkedIn: <a href="https://www.linkedin.com/in/farseen-ahras/" target="_blank" class="text-pen-blue underline">linkedin.com/in/farseen-ahras</a></div>
      <div>Location: Mogral Puthur, Kasaragod, Kerala, India</div>
    `,
    "pid-tune": () => {
      return `<div class="text-amber-400 font-mono">[FIRMWARE DIAGNOSTIC]: ESP32 Rate PID loop configured (Kp: 1.45, Ki: 0.08, Kd: 0.22). MPU-6050 complementary filter active (1000Hz).</div>`;
    },
    clear: () => {
      if (terminalOutput) terminalOutput.innerHTML = '';
      return '';
    },
    whoami: () => `guest@farseen-sketchbook-v2`,
    uname: () => `ESP32 FreeRTOS v10.4.3-esp32-2026 SMP xtensa-esp32-elf`
  };

  function executeCliCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      cliCommands.clear();
      return;
    }

    const commandEntry = document.createElement('div');
    commandEntry.className = 'pt-1 font-mono text-xs';
    commandEntry.innerHTML = `<span class="text-cyan-400 font-bold">farseen@logbook:~$</span> <span class="text-dark font-semibold">${escapeHtml(cmdRaw)}</span>`;
    terminalOutput.appendChild(commandEntry);

    const resultEntry = document.createElement('div');
    resultEntry.className = 'text-slate-300 pl-2 border-l-2 border-slate-700 font-mono text-xs';

    if (cliCommands[cmd]) {
      const output = cliCommands[cmd]();
      resultEntry.innerHTML = output;
    } else {
      resultEntry.innerHTML = `<span class="text-rose-400">command not found: ${escapeHtml(cmd)}</span>. Type <span class="text-amber-400 font-bold font-mono">'help'</span> for list of commands.`;
    }

    terminalOutput.appendChild(resultEntry);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(string) {
    return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        executeCliCommand(val);
      }
    });
  }

  cliQuickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) executeCliCommand(cmd);
    });
  });


  // ==========================================
  // 7. TOAST NOTIFICATION SYSTEM
  // ==========================================
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.remove('opacity-0', 'translate-y-24');
    toastNotification.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toastNotification.classList.remove('opacity-100', 'translate-y-0');
      toastNotification.classList.add('opacity-0', 'translate-y-24');
    }, 3200);
  }


  // ==========================================
  // 8. RESUME MODAL HANDLERS (RESPONSIVE TEXT VIEW)
  // ==========================================
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalContainer = document.getElementById('resumeModalContainer');
  const resumeModalOpenBtn = document.getElementById('resumeModalOpenBtn');
  const mobileResumeBtn = document.getElementById('mobileResumeBtn');
  const heroResumeModalBtn = document.getElementById('heroResumeModalBtn');
  const resumeModalCloseBtn = document.getElementById('resumeModalCloseBtn');
  const resumeModalExpandBtn = document.getElementById('resumeModalExpandBtn');
  const expandIcon = document.getElementById('expandIcon');
  const collapseIcon = document.getElementById('collapseIcon');
  const expandText = document.getElementById('expandText');
  const resumePrintBtn = document.getElementById('resumePrintBtn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Locks body to prevent double-scroll glitch
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('hidden');
      document.body.style.overflow = ''; // Restores body scrolling
      if (resumeModalContainer && resumeModalContainer.classList.contains('is-maximized')) {
        resumeModalContainer.classList.remove('is-maximized');
        if (expandIcon) expandIcon.classList.remove('hidden');
        if (collapseIcon) collapseIcon.classList.add('hidden');
        if (expandText) expandText.textContent = 'Fullscreen';
      }
    }
  }

  function toggleModalMaximize() {
    if (!resumeModalContainer) return;
    const isMax = resumeModalContainer.classList.toggle('is-maximized');
    if (expandIcon) expandIcon.classList.toggle('hidden', isMax);
    if (collapseIcon) collapseIcon.classList.toggle('hidden', !isMax);
    if (expandText) expandText.textContent = isMax ? 'Exit Fullscreen' : 'Fullscreen';
  }

  if (resumeModalOpenBtn) resumeModalOpenBtn.addEventListener('click', openResumeModal);
  if (mobileResumeBtn) mobileResumeBtn.addEventListener('click', () => {
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
      if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
    openResumeModal();
  });
  if (heroResumeModalBtn) heroResumeModalBtn.addEventListener('click', openResumeModal);
  if (resumeModalCloseBtn) resumeModalCloseBtn.addEventListener('click', closeResumeModal);
  if (resumeModalExpandBtn) resumeModalExpandBtn.addEventListener('click', toggleModalMaximize);

  if (resumePrintBtn) {
    resumePrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (resumeModalContainer && resumeModalContainer.classList.contains('is-maximized')) {
        toggleModalMaximize();
        return;
      }
      closeResumeModal();
      const projModal = document.getElementById('dynamicProjectModal');
      if (projModal) projModal.remove();
    }
  });


  // ==========================================
  // 9. CONTACT FORM INTERACTION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const subject = document.getElementById('messageSubject').value || 'Portfolio Contact';
      const body = document.getElementById('messageText').value;

      // Construct mailto link
      const mailtoUrl = `mailto:farseenahrasraufali@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + body)}`;
      
      if (formFeedback) {
        formFeedback.textContent = "Opening your email app to dispatch message...";
      }

      window.location.href = mailtoUrl;

      showToast("Opening mail dispatch for Farseen Ahras...");
      setTimeout(() => {
        contactForm.reset();
        if (formFeedback) formFeedback.textContent = "Dispatched! Check your mail composer.";
      }, 1500);
    });
  }

});
