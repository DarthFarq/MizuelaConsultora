import { state } from '../state.js'

function getIcon(status) {
    if (status === 'ok') return 'beacon_green.png'
    if (status === 'warning') return 'beacon_yellow.png'
    if (status === 'fault') return 'beacon_red.png'
    if (status === 'offline') return 'beacon_gray.png'
}

window.toggleCard = function toggleCard(id) {
    const card = document.getElementById(`card-${id}`);
    card.classList.toggle('expanded');
}

export function renderAntennas(container) {

    const antennas = state.data.antennas
    .filter(a => a.floorid === state.selectedFloor)

    container.innerHTML = `
                <div class="back-general-button" onclick="navigate('floor')">
                <img src="Media/back.png" alt="back">
            </div>
        <div id="antenna-list" class="antennas">


            <div id="hub-status" class="hub-status">
                <div id="hub-dot" class="dot dot-online"></div>
                <span id="hub-text">HUB CONNECTED</span>
            </div>

            <button id="reset-system-btn" class="reset-hub-button">
                Reset Database
            </button>

            <div id="toast" class="toast"></div>

            <div class="h1">BEACONS FLOOR ${state.selectedFloor}</div>
            
            <div class="grid">
                ${antennas.map(a => `
                <div class="card ${a.status === 'offline' ? 'is-offline' : ''}" id="card-${a.id}">

                    <!-- Header -->

                    <div class="card-row" onclick="toggleCard(${a.id})">
                        
                        <img id="img-x" src="Media/${getIcon(a.status)}"
                        class="beacon-img-small">

                        <div class="row-main">
                            <div class="row-title">
                                ${a.name}
                            </div>
                        </div>

                        <div class="badge-group">
                            <div id="badge-sync-x" class="badge badge-sync ${a.status === 'offline' ? 'unsynced' : ''}">
                                ${a.status === 'offline' ? 'UNSCYNCED' : 'SYNCED'}
                            </div>

                            <div id="badge-health-x" class="badge badge-${a.status}">
                                ${a.status.toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <!-- Expand details -->

                    <div class="card-detail" id="detail-x">

                        <div class="data-row">
                            <div class="data-item">
                                <div class="label">Signal</div>
                                <div class="value"><span class="rssi-val">${a.metrics.rssi}</span> dBm</div>
                            </div>

                            <div class="data-item">
                                <div class="label">Temp</div>
                                <div class="value"><span class="temp-val">${a.metrics.temp}</span> °C</div>
                            </div>

                            <div class="data-item">
                                <div class="label">Voltage</div>
                                <div class="value"><span class="volt-val">${a.metrics.voltage}</span> V</div>
                            </div>

                            <div class="data-item">
                                <div class="label">Altitude</div>
                                <div class="value"><span class="curr-val">${a.metrics.altitude}</span> mA</div>
                            </div>

                            <div class="data-item">
                                <div class="label">Uptime</div>
                                <div class="value"><span class="uptime-val">${a.metrics.uptime}</span></div>
                            </div>
                        </div>

                        <div class="footer">
                            <form 
                                style="width:100%; display:flex; justify-content:space-between; align-items:center;">

                                <div class="footer-left">

                                <div class="input-row">
                                    <span class="label">REF RSSI:</span>
                                    <input type="number" name="ref_rssi" value="${a.metrics.refrssi || ''}">
                                    <button type="button" class="button">SET</button>
                                </div>

                                <div class="input-row">
                                    <span class="label">REF ALTITUDE:</span>
                                    <input type="number" name="ref_altitude" value="${a.metrics.refaltitude || ''}">
                                    <button type="button" class="button">SET</button>
                                </div>

                                </div>

                                <button type="submit" class="button">RESET</button>

                            </form>
                        </div>

                    </div>
                </div>
    `).join('')}
    </div>
`

if (window.__targetAntenna) {
    const id = window.__targetAntenna

    setTimeout(() => {
        if (window.toggleCard) {
            window.toggleCard(id)
        }
    }, 0)

    window.__targetAntenna = null
}

}