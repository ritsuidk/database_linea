document.addEventListener('DOMContentLoaded', function() {
    // Cargar los lotes al iniciar la página
    loadLots();
});

async function loadLots() {
    try {
        const response = await fetch('php/get_lots.php');
        const lots = await response.json();
        
        const lotsContainer = document.getElementById('lots-container');
        lotsContainer.innerHTML = lots.map(lot => `
            <div class="lot-card" onclick="showPlots(${lot.id})">
                <h2>${lot.name}</h2>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error cargando los lotes:', error);
        showError('Error al cargar los lotes. Por favor, intente más tarde.');
    }
}

async function showPlots(lotId) {
    try {
        const response = await fetch(`php/get_plots.php?lot_id=${lotId}`);
        const plots = await response.json();
        
        const plotsList = document.getElementById('plots-list');
        const plotsContainer = document.getElementById('plots-container');
        
        if (plots.error) {
            throw new Error(plots.error);
        }
        
        plotsList.innerHTML = plots.map(plot => `
            <div class="plot-item">
                <h3>${plot.plot_name}</h3>
                <p>Ubicación: ${plot.location}</p>
                <p>Tamaño: ${plot.size} m²</p>
                <span class="status-badge ${plot.status.toLowerCase()}">${plot.status}</span>
            </div>
        `).join('');
        
        plotsContainer.style.display = 'block';
        
        // Scroll suave hasta los plots
        plotsContainer.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error:', error);
        showError('Error al cargar los terrenos. Por favor, intente más tarde.');
    }
}

function showError(message) {
    // Crear un elemento para mostrar el error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // Remover el mensaje después de 5 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}