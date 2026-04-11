import { state } from '../state.js'

function getPreviewIcon(status) {
    if (status === 'ok') return 'beacon_green.png'
    if (status === 'warning') return 'beacon_yellow.png'
    if (status === 'fault') return 'beacon_red.png'
    if (status === 'offline') return 'beacon_gray.png'
}

export function renderFloor(container) {
    const antennas = state.data.antennas
    .filter(a => a.floorid === state.selectedFloor)

container.innerHTML = `
    <div class="back-general-button" onclick="navigate('building')">
    <img src="Media/back.png" alt="back">
    </div>
<div class="floor">

    <!-- LEFT: MAP AREA -->
    <div class="floor-map">

        <div class="floor-map-container">

            <!-- TITLE -->
            <div class="floor-map-title">
                FLOOR ${state.selectedFloor}
            </div>

            <!-- MAP CANVAS -->
            <div class="floor-map-canvas">

                <img 
                    src="Media/Floors/${state.selectedFloor}.webp" 
                    class="floor-map-image"
                >

                ${state.data.antennas
                    .filter(a => a.floorid === state.selectedFloor)
                    .map(a => `
                        <div 
                            class="floor-beacon ${a.status}"
                            style="left:${a.x}%; top:${a.y}%;"
                            data-name="${a.name}"
                            data-status="${a.status.toUpperCase()}"
                            onclick="goToAntenna(${a.id})"
                        ></div>
                    `).join('')}

            </div>

        </div>

    </div>

    <!-- RIGHT: PREVIEW -->
    <div class="floor-preview">

        <div class="floor-preview-title">
            ANTENNAS
        </div>

        <div class="floor-preview-list">
            ${antennas.map(a => `
                <div class="floor-preview-row ${a.status === 'offline' ? 'is-offline' : ''}"
                    onclick="goToAntenna(${a.id})">
                    <img src="Media/${getPreviewIcon(a.status)}" class="floor-preview-img">
                    <div class="floor-preview-name">
                        ${a.name}
                    </div>
                    <div class="floor-preview-badges">
                        <div class="floor-badge-sync ${a.status === 'offline' ? 'unsynced' : ''}">
                            ${a.status === 'offline' ? 'UNSYNCED' : 'SYNCED'}
                        </div>
                        <div class="floor-badge-health ${a.status}">
                            ${a.status.toUpperCase()}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>

</div>
`
}

window.goToAntenna = function(id) {
    window.__targetAntenna = id
    navigate('antennas')
}