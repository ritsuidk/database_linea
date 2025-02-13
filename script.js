// Datos iniciales
let terrenos = [
    { id: 1, nombre: "Lote 101", estado: "Disponible" },
    { id: 2, nombre: "Lote 102", estado: "Disponible" },
    { id: 3, nombre: "Lote 103", estado: "Vendido" }
];

// Renderizar tabla
function renderizarTabla() {
    const tbody = document.getElementById("terrenos");
    tbody.innerHTML = "";
    terrenos.forEach(terreno => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${terreno.id}</td>
            <td>${terreno.nombre}</td>
            <td class="${terreno.estado.toLowerCase()}">${terreno.estado}</td>
            <td><button onclick="cambiarEstado(${terreno.id})">Cambiar Estado</button></td>
        `;
        tbody.appendChild(fila);
    });
}

// Cambiar estado
function cambiarEstado(id) {
    let terreno = terrenos.find(t => t.id === id);
    if (terreno.estado === "Disponible") {
        terreno.estado = "En Proceso";
    } else if (terreno.estado === "En Proceso") {
        terreno.estado = "Vendido";
    } else {
        alert("El terreno ya está vendido.");
        return;
    }
    renderizarTabla();
}

// Agregar terreno
function agregarTerreno() {
    let nombre = document.getElementById("terrenoNombre").value;
    if (!nombre) {
        alert("Ingresa un nombre para el terreno.");
        return;
    }
    let nuevoTerreno = { id: terrenos.length + 1, nombre: nombre, estado: "Disponible" };
    terrenos.push(nuevoTerreno);
    renderizarTabla();
    document.getElementById("terrenoNombre").value = ""; // Limpiar input
}

// Cargar la tabla al inicio
renderizarTabla();
