/**
 * ==========================================================================
 * VERIFIED PHYSICIAN DEMO TELEMETRY REGISTRY DATA
 * ==========================================================================
 */
const DOCTORS_DATA = [
    { id: "doc-1", name: "Dr. Shivam Sinha", specialty: "Cardiologist", rating: 4.9, exp: 14, fee: 800, avatar: "SS" },
    { id: "doc-2", name: "Dr. Priyanka Mal", specialty: "Dermatologist", rating: 4.8, exp: 10, fee: 250, avatar: "PM" },
    { id: "doc-3", name: "Dr. Riya Sinha", specialty: "Neurologist", rating: 5.0, exp: 16, fee: 1000, avatar: "RS" },
    { id: "doc-4", name: "Dr. Manoj Kumar", specialty: "Pulmonologist", rating: 4.7, exp: 9, fee: 200, avatar: "MK" },
    { id: "doc-5", name: "Dr. Praveen Kumar", specialty: "Orthopedic", rating: 4.8, exp: 12, fee: 200, avatar: "PK" },
    { id: "doc-6", name: "Dr. Gaurav Maurya", specialty: "Gastroenterologist", rating: 4.9, exp: 11, fee: 600, avatar: "GM" },
    { id: "doc-7", name: "Dr. Indranil Basu", specialty: "Oncologist", rating: 4.5, exp: 13, fee: 700, avatar: "IB" },
    { id: "doc-8", name: "Dr. Sudha Kumari", specialty: "Gynecologist", rating: 4.3, exp: 11, fee: 300, avatar: "SK" },
    { id: "doc-9", name: "Dr. Nayanika Roy", specialty: "ENT Specialist", rating: 4.2, exp: 10, fee: 150, avatar: "NR" },
];

/**
 * ==========================================================================
 * MAIN VIEW ROUTING CONTEXT & SPA CONTROLLER
 * ==========================================================================
 */
function switchView(viewId) {
    // Collect all valid structural element views
    const sections = ['home', 'scanner', 'analyzer', 'symptoms', 'doctors', 'appointments', 'dashboard', 'contact'];
    
    sections.forEach(sec => {
        const el = document.getElementById(`${sec}-view`);
        if(el) {
            if(sec === viewId) {
                el.classList.remove('view-hidden');
                el.classList.add('view-active');
            } else {
                el.classList.add('view-hidden');
                el.classList.remove('view-active');
            }
        }
    });

    // Update active state markers inside link lists
    document.querySelectorAll('.nav-link').forEach(link => {
        if(link.getAttribute('onclick').includes(`'${viewId}'`)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Collapse mobile menus if active during layout jump transitions
    const navLinks = document.querySelector('.nav-links');
    if(navLinks) navLinks.classList.remove('mobile-open');

    // Scroll back to container top viewport coordinates smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Mapsd to system module: ${viewId.toUpperCase()}`);

    // Lazy load canvas logic contexts only when dashboard parameters align
    if(viewId === 'dashboard') {
        setTimeout(renderDashboardCharts, 100);
    }
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if(navLinks) navLinks.classList.toggle('mobile-open');
}

/**
 * ==========================================================================
 * THEME TOGGLE & TOAST NOTIFICATION EXTENSIONS
 * ==========================================================================
 */
document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    
    const icon = document.querySelector('#theme-toggle i');
    if(targetTheme === 'dark') {
        icon.className = 'fa-solid fa-sun';
        showToast("Switched to system dark framework display.");
    } else {
        icon.className = 'fa-solid fa-moon';
        showToast("Switched to system standard light framework display.");
    }
    // Re-render dashboard graphics parameters to balance contrast changes
    if(document.getElementById('dashboard-view').classList.contains('view-active')) {
        renderDashboardCharts();
    }
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3500);
}

function triggerProcessingOverlay(callback) {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.add('hidden');
        callback();
    }, 1800);
}

/**
 * ==========================================================================
 * DRAG & DROP INFRASTRUCTURE LOADER SETUP
 * ==========================================================================
 */
function bindDragDropContext(zoneId, inputId, containerId, previewImgId, nameId = null) {
    const zone = document.getElementById(zoneId);
    const input = document.getElementById(inputId);
    const container = document.getElementById(containerId);

    zone.addEventListener('click', () => input.click());
    
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if(e.dataTransfer.files.length) {
            input.files = e.dataTransfer.files;
            handleFileDisplay(input.files[0], container, previewImgId, nameId);
        }
    });

    input.addEventListener('change', () => {
        if(input.files.length) {
            handleFileDisplay(input.files[0], container, previewImgId, nameId);
        }
    });
}

function handleFileDisplay(file, container, previewImgId, nameId) {
    container.classList.remove('hidden');
    showToast(`Asset locked locally: ${file.name}`);
    if(nameId) {
        document.getElementById(nameId).innerText = file.name;
    }
    if(previewImgId && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById(previewImgId).src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Instantiate upload pipeline bindings
bindDragDropContext('scanner-drop-zone', 'scanner-file-input', 'scanner-preview-container', 'scanner-preview');
bindDragDropContext('analyzer-drop-zone', 'analyzer-file-input', 'analyzer-preview-container', null, 'analyzer-file-name');

document.getElementById('btn-clear-scanner').addEventListener('click', () => {
    document.getElementById('scanner-file-input').value = '';
    document.getElementById('scanner-preview-container').classList.add('hidden');
});
document.getElementById('btn-clear-analyzer').addEventListener('click', () => {
    document.getElementById('analyzer-file-input').value = '';
    document.getElementById('analyzer-preview-container').classList.add('hidden');
});

/**
 * ==========================================================================
 * ANALYTICAL ENGINES CORE PIPELINE SIMULATION
 * ==========================================================================
 */

// 1. Visual Matrix Scan Pipeline Execution
document.getElementById('btn-run-scanner').addEventListener('click', async () => {

    const fileInput =
        document.getElementById('scanner-file-input');

    if (!fileInput.files.length) {
        showToast("Please upload an image first");
        return;
    }

    const file = fileInput.files[0];

    const notes =
        document.getElementById('scanner-notes').value;

    const formData = new FormData();

    formData.append('data', file);
    formData.append('description', notes);

    try {

        showToast("Sending image to AI engine...");

        const response = await fetch(
            "https://chirag98728.app.n8n.cloud/webhook/image-analysis",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        document.getElementById('scanner-result-pane').innerHTML = `
            <div class="result-card">

                <h3>${result.condition}</h3>

                <p>
                    Confidence:
                    <strong>${result.confidence}%</strong>
                </p>

                <p>
                    Risk Score:
                    <strong>${result.riskScore}</strong>
                </p>

                <p>
                    Risk Level:
                    <strong>${result.riskLevel}</strong>
                </p>

                <p>
                    Specialist:
                    <strong>${result.specialist}</strong>
                </p>

                <h4>Recommendations</h4>

                <ul>
                    ${result.recommendations
                        .map(r => `<li>${r}</li>`)
                        .join('')}
                </ul>

            </div>
        `;

    } catch(err) {

        console.error(err);

        showToast(
            "Unable to connect to analysis server"
        );
    }
});

// 2. OCR Laboratory Document Telemetry Parser Engine
document.getElementById('btn-run-analyzer').addEventListener('click', () => {
    if(!document.getElementById('analyzer-file-input').files.length) {
        showToast("Error: No document asset loaded into parser context staging buffer.");
        return;
    }
    triggerProcessingOverlay(() => {
        const pane = document.getElementById('analyzer-result-pane');
        pane.innerHTML = `
            <div class="result-card">
                <h3>Bio-Marker OCR Structural Diagnostics</h3>
                <p style="margin-bottom: 20px; font-size: 0.9rem;">Extracted Reference Levels mapped to Standard Distribution Bounds:</p>
                
                <div class="metric-row">
                    <div class="metric-info"><span>Hemoglobin Count (Serum)</span><span class="indicator-badge low">Low Baseline</span></div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 35%; background: #0D47A1;"></div></div>
                </div>
                <div class="metric-row">
                    <div class="metric-info"><span>Fasting Blood Glucose Profile</span><span class="indicator-badge normal">Normal Range</span></div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 70%; background: var(--secondary)"></div></div>
                </div>
                <div class="metric-row">
                    <div class="metric-info"><span>Vitamin D3 (25-Hydroxy)</span><span class="indicator-badge deficient">Deficient</span></div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 18%; background: var(--danger)"></div></div>
                </div>

                <div class="summary-box medium-risk-border">
                    <h4>Consolidated Parsing Conclusion</h4>
                    <p style="font-size:0.9rem; margin-top:6px;">Biochemical records capture minor clinical anemia traits combined with severe vitamin component insufficiency thresholds.</p>
                    <p style="margin-top:8px; font-size:0.9rem;"><strong>Target Routing Action:</strong> General Consulting Physician Matrix Recommended.</p>
                </div>
                <button class="btn btn-primary w-100" style="margin-top:15px;" onclick="switchView('doctors')">
                    <i class="fa-solid fa-users"></i> Load Primary Care Registry
                </button>
            </div>
        `;
    });
});

// 3. Multi-Parameter Physiological Symptom Vector Engine
document.getElementById('btn-run-symptoms').addEventListener('click', async function () {

    const selectedSymptoms = [...document.querySelectorAll('input[name="symptom-check"]:checked')]
        .map(cb => cb.value);

    const description = document.getElementById('symptom-description').value.trim();

    console.log("Selected Symptoms:", selectedSymptoms);
    console.log("Description:", description);

    const payload = {
        symptoms: selectedSymptoms.join(', '),
        description: description
    };

    console.log("Sending Payload:", payload);

    if (!payload.symptoms && !payload.description) {
        alert("Please select at least one symptom or enter a description.");
        return;
    }

    try {

        document.getElementById('symptoms-result-pane').innerHTML =
            "<p>Analyzing symptoms...</p>";

        const response = await fetch(
            "https://chirag98728.app.n8n.cloud/webhook/symptom-analysis",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        console.log("Response:", data);

        if (!response.ok) {
            throw new Error(data.error || "Request failed");
        }

        const result = Array.isArray(data) ? data[0] : data;

        document.getElementById('symptoms-result-pane').innerHTML = `
            <div class="result-card">
                <h3>AI Symptom Analysis</h3>

                <p><strong>Possible Diseases:</strong>
                ${
                    result.possibleDiseases?.length
                    ? result.possibleDiseases.join(", ")
                    : "No disease identified"
                }</p>

                <p><strong>Risk Score:</strong> ${result.riskScore}</p>
                <p><strong>Risk Level:</strong> ${result.riskLevel}</p>
                <p><strong>Specialist:</strong> ${result.specialist}</p>
                <p><strong>Advice:</strong> ${result.advice}</p>
                <p><strong>Emergency:</strong> ${result.emergency ? "Yes" : "No"}</p>

                <hr>

                <small>${result.disclaimer}</small>
            </div>
        `;

    } catch (error) {

        console.error(error);

        document.getElementById('symptoms-result-pane').innerHTML = `
            <div class="result-card">
                <h3>Error</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
});

// function routeToDoctorMatch(specialty) {
//     switchView('doctors');
//     const specDropdown = document.getElementById('filter-specialty');
//     if(specDropdown) {
//         specDropdown.value = specialty;
//         renderDoctorsDirectory();
//     }
// }

/**
 * ==========================================================================
 * PHYSICIAN DIRECTORY QUERY SEARCH ENGINE & FILTER CONTROLS
 * ==========================================================================
 */
const searchInput = document.getElementById('doctor-search');
const specFilter = document.getElementById('filter-specialty');
const rateFilter = document.getElementById('filter-rating');

if(searchInput) searchInput.addEventListener('input', renderDoctorsDirectory);
if(specFilter) specFilter.addEventListener('change', renderDoctorsDirectory);
if(rateFilter) rateFilter.addEventListener('change', renderDoctorsDirectory);

function renderDoctorsDirectory() {
    const grid = document.getElementById('doctors-directory-grid');
    if(!grid) return;

    const query = searchInput.value.toLowerCase();
    const specialty = specFilter.value;
    const ratingThreshold = parseFloat(rateFilter.value);

    const filtered = DOCTORS_DATA.filter(doc => {
        const matchesQuery = doc.name.toLowerCase().includes(query) || doc.specialty.toLowerCase().includes(query);
        const matchesSpec = specialty === 'All' || doc.specialty === specialty;
        const matchesRating = doc.rating >= ratingThreshold;
        return matchesQuery && matchesSpec && matchesRating;
    });

    if(!filtered.length) {
        grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><i class="fa-solid fa-user-slash"></i><p>No medical practitioner profiles align with target criteria filters.</p></div>`;
        return;
    }

    grid.innerHTML = filtered.map(doc => `
        <div class="doctor-card glass-card">
            <div class="doc-avatar">${doc.avatar}</div>
            <h3>${doc.name}</h3>
            <div class="doc-card-spec">${doc.specialty}</div>
            <div><i class="fa-solid fa-star rating-color"></i> <strong>${doc.rating}</strong> Verified Score</div>
            <div class="doc-meta-row">
                <span>Exp: <strong>${doc.exp} Years</strong></span>
                <span>Consult Fee: <strong>${doc.fee}</strong></span>
            </div>
            <button class="btn btn-primary w-100" style="margin-top: 15px; padding: 8px 0;" onclick="initiateSchedulerContext('${doc.name}')">
                <i class="fa-solid fa-calendar-plus"></i> Lock Appointment Slot
            </button>
        </div>
    `).join('');
}

function updateSchedulerSelectDropdown() {
    const dropdown = document.getElementById('book-doctor');
    if(dropdown) {
        dropdown.innerHTML = DOCTORS_DATA.map(d => `<option value="${d.name}">${d.name} (${d.specialty})</option>`).join('');
    }
}

function initiateSchedulerContext(docName) {
    switchView('appointments');
    const dropdown = document.getElementById('book-doctor');
    if(dropdown) dropdown.value = docName;
}

// Instantiate target components at launch bounds
renderDoctorsDirectory();
updateSchedulerSelectDropdown();

/**
 * ==========================================================================
 * ACTION HANDLERS: SCHEDULER SIGN-OFFS & COMMUNICATIONS
 * ==========================================================================
 */
async function handleBooking(event) {

    event.preventDefault();

    const bookingData = {

        patientName:
            document.getElementById("book-name").value,

        email:
            document.getElementById("book-email").value,

        phone:
            document.getElementById("book-phone").value,

        doctor:
            document.getElementById("book-doctor").value,

        date:
            document.getElementById("book-date").value,

        time:
            document.getElementById("book-time").value,

        reason:
            document.getElementById("book-reason").value
    };

    try {

        const response = await fetch(
            "https://chirag98728.app.n8n.cloud/webhook/book-appointment",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(bookingData)
            }
        );

        const result = await response.json();

        if(result.success){

            document.getElementById(
                'modal-token-display'
            ).innerText =
            result.appointmentId;

            document
                .getElementById('success-modal')
                .classList.remove('hidden');

        } else {

            showToast(result.message);
        }

    } catch(error){

        showToast(
            "Unable to connect to appointment server."
        );

        console.error(error);
    }
}

function closeModal() {
    document.getElementById('success-modal').classList.add('hidden');
    switchView('dashboard');
}

async function handleContactSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-msg').value.trim();

    if (!name || !email || !message) {
        showToast("Please fill all required fields.");
        return;
    }

    try {
        console.log({
    name,
    email,
    message
});
        const response = await fetch(
            "https://chirag98728.app.n8n.cloud/webhook/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                })
            }
        );

        const result = await response.json();

        console.log("Contact Response:", result);

        showToast("Message sent successfully.");

        document.getElementById('contact-form').reset();

    } catch (error) {

        console.error(error);

        showToast("Unable to send message.");
    }
}

/**
 * ==========================================================================
 * HIGH PERFORMANCE DYNAMIC CANVAS DATA VISUALIZATION SYSTEM
 * ==========================================================================
 */
function renderDashboardCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridTextColor = isDark ? '#94A3B8' : '#546E7A';
    
    // 1. Risk Factor Distribution: Render Simple Native Donut Segment Blocks
    const canvasRisk = document.getElementById('chart-risk-dist');
    if(canvasRisk) {
        const ctx = canvasRisk.getContext('2d');
        ctx.clearRect(0,0,300,300);
        
        const data = [15, 45, 40]; // High, Medium, Low breakdown parameters
        const colors = ['#D32F2F', '#EF6C00', '#2E7D32'];
        let total = data.reduce((a,b) => a+b, 0);
        let startAngle = 0;

        data.forEach((val, i) => {
            let sliceAngle = (val / total) * 2 * Math.PI;
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.arc(150, 150, 90, startAngle, startAngle + sliceAngle);
            ctx.lineTo(150, 150);
            ctx.fill();
            startAngle += sliceAngle;
        });
        
        // Internal Ring cutout logic execution
        ctx.fillStyle = isDark ? '#1E293B' : '#FFFFFF';
        ctx.beginPath();
        ctx.arc(150, 150, 55, 0, 2 * Math.PI);
        ctx.fill();

        // Draw basic layout legend tags inside Canvas bounds
        ctx.fillStyle = gridTextColor;
        ctx.font = "bold 11px sans-serif";
        ctx.fillText("■ Low (40%)", 10, 280);
        ctx.fillText("■ Med (45%)", 110, 280);
        ctx.fillText("■ High (15%)", 210, 280);
    }

    // 2. Morbidity Category Bars Matrix
    const canvasCat = document.getElementById('chart-categories');
    if(canvasCat) {
        const ctx = canvasCat.getContext('2d');
        ctx.clearRect(0,0,300,300);
        
        const categories = ['Cardio', 'Derm', 'Neuro', 'Pulmo', 'Orth'];
        const values = [65, 120, 45, 95, 70];
        const maxVal = 140;

        ctx.fillStyle = gridTextColor;
        ctx.font = "10px sans-serif";

        categories.forEach((cat, idx) => {
            const x = 35 + (idx * 52);
            const barHeight = (values[idx] / maxVal) * 180;
            const y = 240 - barHeight;

            // Render primary linear bar gradients dynamically
            let gradient = ctx.createLinearGradient(0, y, 0, 240);
            gradient.addColorStop(0, '#4CAF50');
            gradient.addColorStop(1, '#2E7D32');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, 32, barHeight);
            
            // Render text indexes alongside label boundaries
            ctx.fillStyle = gridTextColor;
            ctx.fillText(cat, x + 2, 255);
            ctx.fillText(values[idx].toString(), x + 6, y - 8);
        });
    }

    // 3. System Throughput Trends Over Time Sequence Path Rendering
    const canvasTrends = document.getElementById('chart-trends');
    if(canvasTrends) {
        const ctx = canvasTrends.getContext('2d');
        const w = canvasTrends.width;
        const h = canvasTrends.height;
        ctx.clearRect(0, 0, w, h);

        const pts = [20, 45, 28, 60, 55, 80, 95];
        const stepX = w / (pts.length - 1);
        
        ctx.strokeStyle = '#2E7D32';
        ctx.lineWidth = 4;
        ctx.beginPath();
        
        pts.forEach((pt, i) => {
            let x = i * stepX;
            let y = h - 20 - (pt / 100) * (h - 40);
            if(i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Render point tracking dots along historical graph paths
        ctx.fillStyle = '#81C784';
        pts.forEach((pt, i) => {
            let x = i * stepX;
            let y = h - 20 - (pt / 100) * (h - 40);
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
}

// Numerical animation logic targets for stats counters
document.querySelectorAll('.stat-number').forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / 60; // Increment rate mapped to target frame count configurations

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});

/**
 * ==========================================================================
 * INTERACTIVE TELEMETRY CHATBOT CONTROLLER LOGIC
 * ==========================================================================
 */
function toggleChatbot() {
    const chat = document.getElementById('ai-chatbot');
    if(chat.classList.contains('closed')) {
        chat.classList.remove('closed');
        chat.classList.add('open');
    } else {
        chat.classList.remove('open');
        chat.classList.add('closed');
    }
}

function handleChatKey(e) {
    if(e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chat-user-input');
    const logs = document.getElementById('chat-logs-container');
    const txt = input.value.trim();
    if(!txt) return;

    // Render local user response layer
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.innerHTML = `<p>${escapeHTML(txt)}</p><span class="chat-time">Just Now</span>`;
    logs.appendChild(userMsg);
    
    input.value = '';
    logs.scrollTop = logs.scrollHeight;

    // Evaluate response parameters programmatically
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot';
        
        let reply = "Your message payload data has been parsed by the engine layer. For robust diagnostic profiles, leverage our visual scanning or multi-symptom processing arrays.";
        const lower = txt.toLowerCase();

        if(lower.includes('fever') || lower.includes('cough')) {
            reply = "Telemetry warning: Present symptoms match standard viral respiratory profiles. If breathing resistance surfaces, transition to emergency routing workflows immediately. Otherwise, consult a verified Pulmonologist.";
        } else if(lower.includes('skin') || lower.includes('rash') || lower.includes('itch')) {
            reply = "Dermal inflammation symptoms processed. Recommend visual matrix loading via our Disease Image Scanner for spatial confidence verification metrics.";
        } else if(lower.includes('heart') || lower.includes('chest pain')) {
            reply = "CRITICAL METRIC WARNING: Chest anomaly flags require swift medical practitioner diagnostic oversight. Avoid software latency routes if pain spikes; engage local critical care responders.";
        }
        else if(lower.includes('skin') || lower.includes('rash') || lower.includes('itch')) {
    reply = "Dermatology advisory: Symptoms indicate possible skin irritation, allergic reaction, eczema, or fungal infection. Upload an image through the Disease Image Scanner for AI-assisted evaluation and consult a verified Dermatologist for clinical diagnosis.";
        }
else if(lower.includes('ear') || lower.includes('nose') || lower.includes('throat') || lower.includes('sinus') || lower.includes('hearing')) {
    reply = "ENT assessment triggered: Reported symptoms may indicate ear infection, sinusitis, tonsillitis, or other ENT conditions. Persistent pain, hearing loss, or breathing difficulty requires prompt consultation with a verified ENT Specialist.";
}
else if(lower.includes('cancer') || lower.includes('tumor') || lower.includes('lump') || lower.includes('chemotherapy') || lower.includes('oncology')) {
    reply = "Oncology alert: Reported symptoms may require specialized cancer screening or diagnostic evaluation. Early detection significantly improves treatment outcomes. Schedule an appointment with a verified Oncologist for comprehensive assessment.";
}
else if(lower.includes('heart') || lower.includes('chest pain') || lower.includes('palpitations') || lower.includes('blood pressure')) {
    reply = "Cardiology warning: Symptoms may indicate cardiovascular abnormalities including hypertension, arrhythmia, or coronary conditions. If severe chest pain, shortness of breath, or dizziness occurs, seek emergency medical assistance immediately. Otherwise, consult a verified Cardiologist.";
}
else if(lower.includes('headache') || lower.includes('migraine') || lower.includes('seizure') || lower.includes('memory') || lower.includes('dizziness') || lower.includes('numbness')) {
    reply = "Neurological assessment: Reported symptoms may involve disorders affecting the brain or nervous system, including migraine, nerve dysfunction, or neurological conditions. Persistent weakness, seizures, or sudden numbness requires immediate medical attention. Consult a verified Neurologist.";
}
        botMsg.innerHTML = `<p>${reply}</p><span class="chat-time">Just Now</span>`;
        logs.appendChild(botMsg);
        logs.scrollTop = logs.scrollHeight;
    }, 1000);
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}
