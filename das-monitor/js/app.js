import { state } from './state.js'
import { loadData } from './api.js'

import { renderFloor } from './views/floor.js'
import { renderAntennas } from './views/antennas.js'
import { renderBuilding } from './views/building.js'

// Global navigation
window.navigate = function(view) {
    state.view = view
    render()
}

// Render view
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

async function init() {
    state.data = await loadData()
    console.log(state.data)
    render()
}

// Init
init()