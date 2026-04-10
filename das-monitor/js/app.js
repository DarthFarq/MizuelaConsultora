import { state } from './state.js'

import { renderFloor } from './views/floor.js'
import { renderAntennas } from './views/antennas.js'
import { renderBuilding } from './views/building.js'

// navegación global
window.navigate = function(view) {
    state.view = view
    render()
}

// render principal
function render() {
    const container = document.getElementById('app')

    if (state.view === 'floor') {
        renderFloor(container)
    }

    if (state.view === 'antennas') {
        renderAntennas(container)
    }

    if (state.view === 'building') {
        renderBuilding(container)
    }
}

// init
render()