document.addEventListener('DOMContentLoaded', function() {
    loadLots();
    loadLotsForSelect();
});

async function loadLots() {
    try {
        const response = await fetch('php/get_lots.php');
        const lots = await response.json();
        
        const lotsList = document.getElementById('lots-list');
        lotsList.innerHTML = lots.map(lot => `
            <div class="lot-item">
                <h2>${lot.name}</h2>
                <button onclick="deleteLot(${lot.id})">Eliminar Lote</button>
                <div class="plots-list" id="plots-list-${lot.id}"></div>
            </div>
        `).join('');

        lots.forEach(lot => loadPlotsForLot(lot.id));
    } catch (error) {
        console.error('Error cargando los lotes:', error);
        showError('Error al cargar los lotes. Por favor, intente más tarde.');
    }
}

async function loadPlotsForLot(lotId) {
    try {
        const response = await fetch(`php/get_plots.php?lot_id=${lotId}`);
        const plots = await response.json();
        
        const plotsList = document.getElementById(`plots-list-${lotId}`);
        plotsList.innerHTML = plots.map(plot => `
            <div class="plot-item">
                <h3>${plot.plot_name}</h3>
                <p>Ubicación: ${plot.location}</p>
                <p>Tamaño: ${plot.size} m²</p>
                <span class="status-badge ${plot.status.toLowerCase()}">${plot.status}</span>
                <button onclick="deletePlot(${plot.id})">Eliminar Terreno</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error cargando los terrenos:', error);
        showError('Error al cargar los terrenos. Por favor, intente más tarde.');
    }
}

async function loadLotsForSelect() {
    try {
        const response = await fetch('php/get_lots.php');
        const lots = await response.json();
        
        const lotSelect = document.getElementById('plotLotId');
        lotSelect.innerHTML = lots.map(lot => `
            <option value="${lot.id}">${lot.name}</option>
        `).join('');
    } catch (error) {
        console.error('Error cargando los lotes:', error);
        showError('Error al cargar los lotes. Por favor, intente más tarde.');
    }
}

function showAddLotForm() {
    document.getElementById('add-lot-form').style.display = 'block';
    document.getElementById('add-plot-form').style.display = 'none';
}

function showAddPlotForm() {
    document.getElementById('add-plot-form').style.display = 'block';
    document.getElementById('add-lot-form').style.display = 'none';
}

document.getElementById('lotForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const lotName = document.getElementById('lotName').value;
    
    try {
        const response = await fetch('php/add_lot.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: lotName })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Lote agregado exitosamente');
            loadLots();
            loadLotsForSelect();
            document.getElementById('lotForm').reset();
            document.getElementById('add-lot-form').style.display = 'none';
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Error agregando el lote:', error);
        showError('Error al agregar el lote. Por favor, intente más tarde.');
    }
});

document.getElementById('plotForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const plotLotId = document.getElementById('plotLotId').value;
    const plotName = document.getElementById('plotName').value;
    const plotLocation = document.getElementById('plotLocation').value;
    const plotSize = document.getElementById('plotSize').value;
    const plotStatus = document.getElementById('plotStatus').value;
    
    try {
        const response = await fetch('php/add_plot.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lot_id: plotLotId,
                plot_name: plotName,
                location: plotLocation,
                size: plotSize,
                status: plotStatus
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Terreno agregado exitosamente');
            loadPlotsForLot(plotLotId);
            document.getElementById('plotForm').reset();
            document.getElementById('add-plot-form').style.display = 'none';
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Error agregando el terreno:', error);
        showError('Error al agregar el terreno. Por favor, intente más tarde.');
    }
});

async function deleteLot(lotId) {
    if (confirm('¿Está seguro de que desea eliminar este lote y todos sus terrenos?')) {
        try {
            const response = await fetch(`php/delete_lot.php?lot_id=${lotId}`);
            const result = await response.json();
            
            if (result.success) {
                alert('Lote eliminado exitosamente');
                loadLots();
                loadLotsForSelect();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error eliminando el lote:', error);
            showError('Error al eliminar el lote. Por favor, intente más tarde.');
        }
    }
}

async function deletePlot(plotId) {
    if (confirm('¿Está seguro de que desea eliminar este terreno?')) {
        try {
            const response = await fetch(`php/delete_plot.php?plot_id=${plotId}`);
            const result = await response.json();
            
            if (result.success) {
                alert('Terreno eliminado exitosamente');
                loadLots();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error eliminando el terreno:', error);
            showError('Error al eliminar el terreno. Por favor, intente más tarde.');
        }
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}