document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    
    // Buscar usuario en la base de datos
    const usuario = usuariosDB.find(u => u.username === username && u.password === password);
    
    if (usuario) {
        messageElement.textContent = '¡Inicio de sesión exitoso!';
        messageElement.className = 'message success';
        
        // Simular redirección después del login exitoso
        setTimeout(() => {
            alert('Redirigiendo al dashboard...');
        }, 1000);
    } else {
        messageElement.textContent = 'Usuario o contraseña incorrectos';
        messageElement.className = 'message error';
    }
});