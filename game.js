document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    const levelElement = document.getElementById('level');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Mobile controls
    const upBtn = document.getElementById('upBtn');
    const downBtn = document.getElementById('downBtn');
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');

    // Game state
    let score = 0;
    let lives = 3;
    let level = 1;
    let gameRunning = false;
    let gameLoop;
    let invincible = false;
    let invincibleTimer = 0;
    
    // Player
    const player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 20,
        speed: 5,
        dx: 0,
        dy: 0,
        color: '#00ccff'
    };
    
    // Coins
    let coins = [];
    const coinCount = 5;
    const coinSize = 10;
    
    // Enemies
    let enemies = [];
    const enemyCount = 3;
    const enemySize = 15;
    
    // Power-ups
    let powerUps = [];
    const powerUpCount = 1;
    const powerUpSize = 15;
    const powerUpDuration = 5000; // 5 seconds
    
    // Initialize game
    function init() {
        createCoins();
        createEnemies();
        createPowerUps();
        draw();
    }
    
    // Create coins
    function createCoins() {
        coins = [];
        for (let i = 0; i < coinCount + level; i++) {
            coins.push({
                x: Math.random() * (canvas.width - coinSize),
                y: Math.random() * (canvas.height - coinSize),
                size: coinSize,
                collected: false
            });
        }
    }
    
    // Create enemies
    function createEnemies() {
        enemies = [];
        for (let i = 0; i < enemyCount + Math.floor(level/2); i++) {
            enemies.push({
                x: Math.random() * (canvas.width - enemySize),
                y: Math.random() * (canvas.height - enemySize),
                size: enemySize,
                dx: (Math.random() - 0.5) * 3,
                dy: (Math.random() - 0.5) * 3
            });
        }
    }
    
    // Create power-ups
    function createPowerUps() {
        powerUps = [];
        for (let i = 0; i < powerUpCount; i++) {
            powerUps.push({
                x: Math.random() * (canvas.width - powerUpSize),
                y: Math.random() * (canvas.height - powerUpSize),
                size: powerUpSize,
                collected: false
            });
        }
    }
    
    // Draw game elements
    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw player
        ctx.fillStyle = invincible ? '#ff00ff' : player.color;
        ctx.fillRect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);
        
        // Draw eyes to show direction
        ctx.fillStyle = '#000';
        const eyeOffsetX = player.dx !== 0 ? (player.dx > 0 ? 3 : -3) : 0;
        const eyeOffsetY = player.dy !== 0 ? (player.dy > 0 ? 3 : -3) : 0;
        ctx.fillRect(player.x + eyeOffsetX - 3, player.y + eyeOffsetY - 3, 3, 3);
        ctx.fillRect(player.x + eyeOffsetX + 3, player.y + eyeOffsetY - 3, 3, 3);
        
        // Draw coins
        ctx.fillStyle = '#ffcc00';
        coins.forEach(coin => {
            if (!coin.collected) {
                // Draw star shape for coin
                drawStar(coin.x, coin.y, 5, coin.size/2, coin.size/4);
            }
        });
        
        // Draw enemies
        ctx.fillStyle = '#ff3300';
        enemies.forEach(enemy => {
            // Draw skull shape for enemy
            drawSkull(enemy.x, enemy.y, enemy.size);
        });
        
        // Draw power-ups
        ctx.fillStyle = '#00ff00';
        powerUps.forEach(powerUp => {
            if (!powerUp.collected) {
                // Draw lightning bolt for power-up
                drawLightning(powerUp.x, powerUp.y, powerUp.size);
            }
        });
        
        // Draw invincibility indicator
        if (invincible) {
            ctx.strokeStyle = '#ff00ff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.size + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    // Helper function to draw a star
    function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }
    
    // Helper function to draw a skull
    function drawSkull(x, y, size) {
        // Skull head
        ctx.beginPath();
        ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + size/2 - size/4, y + size/3, size/6, 0, Math.PI * 2);
        ctx.arc(x + size/2 + size/4, y + size/3, size/6, 0, Math.PI * 2);
        ctx.fill();
        
        // Teeth
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + size/2 - size/4, y + size/2 + size/6, size/2, size/6);
        ctx.fillStyle = '#000';
        ctx.fillRect(x + size/2 - size/4, y + size/2 + size/6, size/2, size/12);
    }
    
    // Helper function to draw a lightning bolt
    function drawLightning(x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x + size/2, y);
        ctx.lineTo(x + size/4, y + size/2);
        ctx.lineTo(x + size/2, y + size/2);
        ctx.lineTo(x + size/4, y + size);
        ctx.lineTo(x + size/2, y + size);
        ctx.lineTo(x, y + size/2);
        ctx.lineTo(x + size/2, y);
        ctx.closePath();
        ctx.fill();
    }
    
    // Update game state
    function update() {
        // Move player
        player.x += player.dx;
        player.y += player.dy;
        
        // Boundary check
        if (player.x < player.size/2) player.x = player.size/2;
        if (player.x > canvas.width - player.size/2) player.x = canvas.width - player.size/2;
        if (player.y < player.size/2) player.y = player.size/2;
        if (player.y > canvas.height - player.size/2) player.y = canvas.height - player.size/2;
        
        // Move enemies
        enemies.forEach(enemy => {
            enemy.x += enemy.dx;
            enemy.y += enemy.dy;
            
            // Bounce off walls
            if (enemy.x < 0 || enemy.x > canvas.width - enemy.size) {
                enemy.dx = -enemy.dx;
            }
            if (enemy.y < 0 || enemy.y > canvas.height - enemy.size) {
                enemy.dy = -enemy.dy;
            }
        });
        
        // Check coin collection
        coins.forEach(coin => {
            if (!coin.collected && checkCollision(
                player.x, player.y, player.size, 
                coin.x + coin.size/2, coin.y + coin.size/2, coin.size
            )) {
                coin.collected = true;
                score += 10 * level;
                scoreElement.textContent = score;
                
                // Check if all coins collected
                if (coins.every(c => c.collected)) {
