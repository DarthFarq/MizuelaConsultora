import { state } from '../state.js'

export function renderBuilding(container) {
    const data = state.data;

    container.innerHTML = `
        <div class="floor"> <!-- reutilizamos layout de floor -->

            <!-- LEFT: BUILDING MAP -->
            <div class="floor-map">

                <div class="floor-map-container">

                    <div class="floor-map-title">
                        BUILDING
                    </div>

                    <div class="floor-map-canvas">

                        <img 
                            src="Media/Building/building.webp" 
                            class="floor-map-image"
                        >

                        ${data.floors.map(floor => {
                            return `
                                <div 
                                    class="building-floor-hitbox"
                                    style="top:${floor.y}%"
                                    onclick="goToFloor(${floor.id})"
                                ></div>
                            `
                        }).join('')}

                    </div>

                </div>

            </div>

            <!-- RIGHT: FLOOR LIST -->
            <div class="floor-preview">

                <div class="floor-preview-title">
                    FLOORS
                </div>

                <div class="floor-preview-list">
                    ${data.floors.map(floor => {

                        const beacons = data.antennas.filter(a => a.floorid === floor.id);
                        const total = beacons.length;
                        const online = beacons.filter(b => b.status === "ok" || b.status === "warning").length;

                        return `
                            <div class="floor-preview-row"
                                onclick="goToFloor(${floor.id})">

                                <div class="floor-info">
                                    <div>${floor.name}</div>
                                    <small>${online}/${total}</small>
                                </div>

                                <div class="building-beacon-dots">
                                    ${beacons.map(b => `
                                        <div class="dot ${b.status}"></div>
                                    `).join('')}
                                </div>

                            </div>
                        `
                    }).join('')}
                </div>

            </div>

        </div>
    `
}

window.goToFloor = function(id) {
    state.selectedFloor = id
    navigate('floor')
}