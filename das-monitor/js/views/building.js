import { state } from '../state.js'

export function renderBuilding(container) {
    const data = state.data;
    
    container.innerHTML = `
        <div class="building-container">
            <div class="building-visual" id="buildingVisual"></div>
            <div class="divider"></div>
            <div class="floor-list" id="floorList"></div>
        </div>
    `;

    const building = container.querySelector("#buildingVisual");
    const list = container.querySelector("#floorList");

    // 2. Recorrer Pisos
    data.floors.forEach(floor => {
        const beacons = data.antennas.filter(a => a.floorid === floor.id);
        const total = beacons.length;
        const online = beacons.filter(b => b.status === "ok" || b.status === "warning").length;

        // --- LÓGICA DEL EDIFICIO (IZQUIERDA) ---
        const floorDiv = document.createElement("div");
        floorDiv.className = "floor-from-building";
        floorDiv.innerHTML = `<small>${floor.name}</small>`
        
        // Hacemos que todo el bloque del piso sea clickeable
        floorDiv.onclick = () => {
            state.selectedFloor = floor.id; // Coincide con state.selectedFloor de tu floor.js
            window.navigate('floor');
        };

        beacons.forEach(beacon => {
            const windowDiv = document.createElement("div");
            windowDiv.className = `window ${beacon.status}`;
            windowDiv.title = `${beacon.name} (${beacon.status})`;
            floorDiv.appendChild(windowDiv);
        });

        building.appendChild(floorDiv);

        // --- LÓGICA DE LA LISTA (DERECHA) ---
        const item = document.createElement("div");
        item.className = "floor-item";
        item.style.cursor = "pointer"; 

        item.innerHTML = `
            <strong>${floor.name}</strong><br>
            <small>Beacons online: ${online} / ${total}</small>
        `;

        item.onclick = () => {
            state.selectedFloor = floor.id;
            window.navigate('floor');
        };

        list.appendChild(item);
        
    });
    // 3. Agregamos el techo AL FINAL del código (aparecerá arriba de todo físicamente)
    const roof = document.createElement("div");
    roof.className = "roof";
    building.appendChild(roof);
}