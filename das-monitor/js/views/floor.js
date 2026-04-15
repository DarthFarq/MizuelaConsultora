import { state } from '../state.js'

function getIcon(status) {
    if (status === 'ok') return 'beacon_green.png'
    if (status === 'warning') return 'beacon_yellow.png'
    if (status === 'fault') return 'beacon_red.png'
    if (status === 'offline') return 'beacon_gray.png'
}

window.toggleCard = function toggleCard(id) {
    const card = document.getElementById(`card-${id}`);
    if (card) card.classList.toggle('expanded');
}
window.openAntennaFromMap = function(id) {

    const card = document.getElementById(`card-${id}`)
    if (!card) return

    const isOpen = card.classList.contains('expanded')

    // Cerrar todas las demás
    document.querySelectorAll('.card.expanded')
        .forEach(c => {
            if (c.id !== `card-${id}`) {
                c.classList.remove('expanded')
            }
        })

    if (isOpen) {
        // Si ya estaba abierta → la cerramos
        card.classList.remove('expanded')
    } else {
        // Si estaba cerrada → la abrimos
        card.classList.add('expanded')

        // Scroll hacia la card
        card.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    }
}

window.goToAntenna = function(id) {
    window.__targetAntenna = id
    navigate('antennas')
}

export function renderFloor(container) {

    const floor = state.data?.floors?.find(f => f.id === state.selectedFloor)

    const antennas = state.data.antennas
        .filter(a => a.floorid === state.selectedFloor)

    container.innerHTML = `
<div class="floor">

    <!-- LEFT: MAP AREA -->
    <div class="floor-map">

        <div class="floor-map-container">

            <!-- TITLE -->
            <div class="floor-map-title">
                ${floor ? floor.name : 'Unknown Floor'}
            </div>

            <!-- MAP CANVAS -->
            <div class="floor-map-canvas">

                <img 
                    src="Media/Floors/${state.selectedFloor}.webp" 
                    class="floor-map-image"
                >

                ${antennas.map(a => `
                    <div 
                        class="floor-beacon ${a.status}"
                        style="left:${a.x}%; top:${a.y}%;"
                        data-name="${a.name}"
                        data-status="${a.status.toUpperCase()}"
                        onclick="openAntennaFromMap(${a.id})"
                    ></div>
                `).join('')}

            </div>

        </div>

    </div>

    <!-- RIGHT: ANTENNAS (FULL CARDS) -->
    <div class="floor-preview">

        <div id="hub-status" class="hub-status">
            <div id="hub-dot" class="dot dot-online"></div>
            <span id="hub-text">HUB CONNECTED</span>
        </div>

        <div class="floor-preview-title">
            ANTENNAS
        </div>

        <div class="floor-preview-list">

            ${antennas.map(a => `
                <div class="card ${a.status === 'offline' ? 'is-offline' : ''}" id="card-${a.id}">

                    <!-- HEADER -->
                    <div class="card-row" onclick="toggleCard(${a.id})">
                        
                        <img src="Media/${getIcon(a.status)}"
                        class="beacon-img-small">

                        <div class="row-main">
                            <div class="row-title">
                                ${a.name}
                            </div>
                        </div>

                        <div class="badge-group">
                            <div class="badge badge-sync ${a.status === 'offline' ? 'unsynced' : ''}">
                                ${a.status === 'offline' ? 'UNSYNCED' : 'SYNCED'}
                            </div>

                            <div class="badge badge-${a.status}">
                                ${a.status.toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <!-- DETAIL -->
                    <div class="card-detail">

                        <div class="data-row">

                            <div class="data-item">
                                <div class="label">Signal</div>
                                <div class="value">${a.metrics.rssi} dBm</div>
                            </div>

                            <div class="data-item">
                                <div class="label">Temp</div>
                                <div class="value">${a.metrics.temp} °C</div>
                            </div>

                            <div class="data-item">
                                <div class="label">Voltage</div>
                                <div class="value">${a.metrics.voltage} V</div>
                            </div>

                            <div class="data-item">
                                <div class="label">Altitude</div>
                                <div class="value">${a.metrics.altitude} m</div>
                            </div>

                            <div class="data-item">
                                <div class="label">Uptime</div>
                                <div class="value">${a.metrics.uptime}</div>
                            </div>

                        </div>

                        <div class="footer">
                            <form style="width:100%; display:flex; justify-content:space-between; align-items:center;">

                                <div class="footer-left">

                                    <div class="input-row">
                                        <span class="label">REF RSSI:</span>
                                        <input type="number" value="${a.metrics.refrssi || ''}">
                                        <button type="button" class="button">SET</button>
                                    </div>

                                    <div class="input-row">
                                        <span class="label">REF ALTITUDE:</span>
                                        <input type="number" value="${a.metrics.refaltitude || ''}">
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

        <button id="reset-system-btn" class="reset-hub-button">
            Reset Database
        </button>

    </div>

</div>
`
}