let antennas = generateMockData(); // 🔥 se genera UNA sola vez

fetch("data/antennas.json")
  .then(res => res.json())
  .then(data => {
    antennas = data;
    renderCards();
  });

export function renderAntennas(container) {
  container.innerHTML = `
    <div class="antennas-view">
      <h2>ANTENNAS</h2>
      <div id="antenna-list" class="grid"></div>
    </div>
  `;

  renderCards();
}

function renderCards() {
  const list = document.getElementById("antenna-list");

list.innerHTML = antennas.map(a => `
    <div class="card ${a.status === 'offline' ? 'is-offline' : ''}" id="card-${a.id}">
      
      <div class="card-row" onclick="toggleCard(${a.id})">
        <img class="beacon-img-small" src="${getIconByStatus(a.status)}" />
        
        <div class="row-main">
          <div class="row-title">
            ANTENNA ${a.id}
            <span class="name">${a.name}</span>
          </div>
        </div>

        <div class="badge-group">
          <div class="badge badge-sync ${a.status === 'offline' ? 'unsynced' : ''}">
            ${a.status === 'offline' ? 'UNSYNCED' : 'SYNCED'}
          </div>
          <div class="badge badge-${a.status}">
            ${formatStatus(a.status)}
          </div>
        </div>
      </div>

      <div class="card-detail">
        <div class="data-row">
          <div class="data-item">
            <div class="label">Signal</div>
            <div class="value">${a.rssi} dBm</div>
          </div>

          <div class="data-item">
            <div class="label">Temp</div>
            <div class="value">${a.temp} °C</div>
          </div>

          <div class="data-item">
            <div class="label">Voltage</div>
            <div class="value">${a.volt} V</div>
          </div>

          <div class="data-item">
            <div class="label">Current</div>
            <div class="value">${a.curr} mA</div>
          </div>
        </div>

        <div class="footer">
            <form action="/update_ref/${a.id}" method="POST" style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="label">REF:</span>
                    <input type="number" name="ref_rssi" value="${a.ref_rssi || ''}" style="width: 70px; padding: 4px; border-radius: 4px;">
                </div>
                <button type="submit">RESET</button>
            </form>
        </div>
      </div>
    </div>
`).join("");
}



//# 🔹 ICONOS SEGÚN ESTADO (ACÁ CONECTÁS TUS IMÁGENES)
function getIconByStatus(status) {
  switch (status) {
    case "ok": return "static/beacon_green.png";
    case "warning": return "static/beacon_yellow.png";
    case "fault": return "static/beacon_red.png";
    case "offline": return "static/beacon_gray.png";
    default: return "static/beacon_gray.png";
  }
}



//# 🔹 HELPERS

function generateMockData() {
  return Array.from({ length: 6 }, (_, i) => ({
    id: i,
    name: "Waiting...",
    rssi: random(-90, -30),
    temp: random(20, 60),
    volt: (Math.random() * 5).toFixed(2),
    curr: random(100, 500),
    status: randomStatus()
  }));
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomStatus() {
  const states = ["ok", "warning", "fault", "offline"];
  return states[Math.floor(Math.random() * states.length)];
}

function formatStatus(status) {
  return status === "offline" ? "OFFLINE" : status.toUpperCase();
}

//# 🔹 EXPAND / COLLAPSE
window.toggleCard = function(id) {
  document.getElementById(`card-${id}`).classList.toggle("expanded");
};