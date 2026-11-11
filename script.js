/**
 * FARSEEN AHRAS — EDITORIAL & CINEMATIC PORTFOLIO JAVASCRIPT
 * Frameworks: GSAP 3 + ScrollTrigger
 * Features: Parallax, Timeline Orchestration, Interactive Mockup Terminal, Fast Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Parallax: Giant Background "PORTFOLIO" Text
    const heroBgText = document.getElementById('heroBgText');
    if (heroBgText) {
      gsap.to(heroBgText, {
        y: -120,
        opacity: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // 2. Hero Portrait Parallax
    const heroPortrait = document.getElementById('heroPortrait');
    if (heroPortrait) {
      gsap.to(heroPortrait, {
        y: 40,
        scale: 0.98,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // 3. Staggered Entrance for Hero Stats
    const statCards = document.querySelectorAll('.hero-stat-item');
    if (statCards.length > 0) {
      gsap.from(statCards, {
        opacity: 0,
        x: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.4
      });
    }

    // 4. Staggered Entrance for Project Cards
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
      gsap.from(projectCards, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }

    // 5. Work Process Timeline Step Sequenced Reveal
    const timelineItems = document.querySelectorAll('.process-step-item');
    if (timelineItems.length > 0) {
      gsap.from(timelineItems, {
        opacity: 0,
        x: -30,
        duration: 0.7,
        stagger: 0.18,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#process-column',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }

    // 6. Number Counter Animation for CGPA
    const cgpaElem = document.getElementById('stat-cgpa');
    if (cgpaElem) {
      ScrollTrigger.create({
        trigger: cgpaElem,
        start: 'top 95%',
        once: true,
        onEnter: () => {
          let countObj = { val: 0.0 };
          gsap.to(countObj, {
            val: 8.81,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              cgpaElem.innerText = countObj.val.toFixed(2);
            }
          });
        }
      });
    }
  }

  // --- INTERACTIVE DIGITAL MOCKUP TERMINAL ---
  const terminalInput = document.getElementById('mockupTerminalInput');
  const terminalOutput = document.getElementById('mockupTerminalOutput');
  const terminalBody = document.getElementById('mockupTerminalBody');

  const cliCommands = {
    help: () => `
      <div class="text-[#ef4444] font-bold font-mono text-xs mb-1">AVAILABLE COMMANDS:</div>
      <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-[#a3a3a3] font-mono">
        <div><span class="text-white font-bold">lifelane</span> — LifeLane AI Edge Vision</div>
        <div><span class="text-white font-bold">nexstock</span> — NEXSTOCK AI Inventory</div>
        <div><span class="text-white font-bold">hydro</span> — IoT Hydroponic AgTech</div>
        <div><span class="text-white font-bold">drone</span> — ESP32 Flight Controller</div>
        <div><span class="text-white font-bold">skills</span> — Full Technical Stack</div>
        <div><span class="text-white font-bold">ieee</span> — IEEE GRSS/SPS Leadership</div>
        <div><span class="text-white font-bold">abstracts</span> — IEEE DISCOVER 2025</div>
        <div><span class="text-white font-bold">edu</span> — Academic Profile & CGPA</div>
        <div><span class="text-white font-bold">resume</span> — Open Resume Page</div>
        <div><span class="text-white font-bold">biodata</span> — Open Biodata Page</div>
        <div><span class="text-white font-bold">contact</span> — Direct Contact Links</div>
        <div><span class="text-white font-bold">clear</span> — Clear Console</div>
      </div>
    `,
    lifelane: () => `
      <div class="text-[#ef4444] font-bold font-mono text-xs">LIFELANE AI — EMERGENCY RESPONSE AT THE EDGE:</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">Real-time edge computing using CNN visual recognition on Raspberry Pi to pre-emptively clear traffic corridors for approaching emergency ambulances.</div>
    `,
    nexstock: () => `
      <div class="text-[#ef4444] font-bold font-mono text-xs">NEXSTOCK — AUTONOMOUS INVENTORY &amp; ROUTING:</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">AI-powered enterprise inventory tracking platform with shortest-path aisle routing algorithms and automated stock anomaly prediction.</div>
    `,
    hydro: () => `
      <div class="text-[#ef4444] font-bold font-mono text-xs">SMART IOT HYDROPONICS (2026 - PRESENT):</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">Undergrad Mini-Project Lead: ESP32 telemetry, automated pH/EC nutrient dosing pumps, and cloud telemetry dashboard for indoor vertical farming.</div>
    `,
    drone: () => `
      <div class="text-[#ef4444] font-bold font-mono text-xs">ESP32 DRONE FLIGHT CONTROLLER FIRMWARE:</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">Embedded Systems Lead: Custom real-time control software with MPU6050 6-axis IMU, complementary drift filter, 6-channel PPM receiver decoding, and tuned rate/angle PID loops.</div>
    `,
    skills: () => `
      <div class="text-[#ef4444] font-bold font-mono text-xs">TECHNICAL STACK:</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">Languages: Python, Java, C++, C, Node.js, Express, SQL, JavaScript, HTML5/Tailwind CSS, Lua</div>
      <div class="text-xs text-[#a3a3a3] mt-0.5">Systems & Hardware: Linux / Bash, Git, ESP32, Raspberry Pi, Arduino, FreeRTOS, PlatformIO, Home Assistant</div>
    `,
    ieee: () => `
      <div class="text-[#ef4444] font-bold font-mono text-xs">IEEE LEADERSHIP:</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">• Chair, IEEE GRSS & SPS Student Chapter @ PACE (2023 - Present)</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">• Execom Member, IEEE Student Branch @ PACE</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">• Editorial Committee Member, 2025 IEEE DISCOVER Book of Abstracts</div>
    `,
    abstracts: () => `
      <div class="text-[#ef4444] font-bold font-mono text-xs">2025 IEEE DISCOVER — EDITORIAL COMMITTEE:</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">Official member of the Editors List for the Book of Abstracts of the 2025 IEEE International Conference on Distributed Computing, VLSI, Electrical Circuits and Robotics.</div>
    `,
    edu: () => `
      <div class="text-[#ef4444] font-bold font-mono text-xs">EDUCATION &amp; HONORS:</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">• B.E. Computer Science &amp; Engineering | P A College of Engineering (VTU) | CGPA: 8.81/10 (2022–2026)</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">• High School (PCMC) | Dhakeerath EMHSS | 90% (2020–2022)</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">• CS50x Certificate | Harvard University</div>
    `,
    resume: () => {
      setTimeout(() => { window.location.href = 'resume.html'; }, 1000);
      return `<div class="text-[#ef4444] font-mono text-xs">Redirecting to Resume page (<a href="resume.html" class="underline text-white">resume.html</a>)...</div>`;
    },
    biodata: () => {
      setTimeout(() => { window.location.href = 'biodata.html'; }, 1000);
      return `<div class="text-[#ef4444] font-mono text-xs">Redirecting to Biodata page (<a href="biodata.html" class="underline text-white">biodata.html</a>)...</div>`;
    },
    contact: () => `
      <div class="text-[#ef4444] font-bold font-mono text-xs">CONTACT PARTICULARS:</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">Email: <a href="mailto:farseenahrasraufali@gmail.com" class="text-white underline">farseenahrasraufali@gmail.com</a></div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">Phone: +91 7012653215</div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">GitHub: <a href="https://github.com/Farseen-Ahras" target="_blank" class="text-white underline">github.com/Farseen-Ahras</a></div>
      <div class="text-xs text-[#d4d4d4] mt-0.5">LinkedIn: <a href="https://www.linkedin.com/in/farseen-ahras/" target="_blank" class="text-white underline">linkedin.com/in/farseen-ahras</a></div>
    `,
    clear: () => {
      if (terminalOutput) terminalOutput.innerHTML = '';
      return '';
    }
  };

  function executeCliCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    // Echo command
    const commandEntry = document.createElement('div');
    commandEntry.className = 'flex items-center gap-1.5 text-xs font-mono text-[#a3a3a3] mt-2';
    commandEntry.innerHTML = `
      <span class="text-[#ef4444] font-bold">&gt;</span>
      <span class="text-white font-bold">${cmd}</span>
    `;
    terminalOutput.appendChild(commandEntry);

    // Execute
    const resultEntry = document.createElement('div');
    resultEntry.className = 'mt-1 mb-2 pl-3 border-l border-[#991b1b]/50 text-xs font-mono';
    
    if (cliCommands[cmd]) {
      resultEntry.innerHTML = cliCommands[cmd]();
    } else {
      resultEntry.innerHTML = `
        <div class="text-[#ef4444] font-mono text-xs">Command not found: "${cmd}". Type <span class="text-white font-bold">help</span> to view available operations.</div>
      `;
    }

    terminalOutput.appendChild(resultEntry);
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
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

  // Quick Command Buttons in Terminal
  document.querySelectorAll('.mockup-cli-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const command = btn.getAttribute('data-cmd');
      if (command) {
        executeCliCommand(command);
      }
    });
  });

  // Mobile Navigation Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  if (mobileMenuToggle && mobileNavDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('hidden');
    });
  }
});
