// Main JavaScript for SignalAI Pro Landing Page

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeTypedText();
    initializeCounters();
    initializeParticles();
    initializeSimulator();
    initializePerformanceChart();
    initializeRecentSignals();
    initializeScrollAnimations();
});

// Typed.js initialization
function initializeTypedText() {
    new Typed('#typed-text', {
        strings: ['Trading', 'Signal', 'Analysis'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Animated counters
function initializeCounters() {
    const counters = [
        { id: 'accuracy-counter', target: 90, suffix: '%' },
        { id: 'signals-counter', target: 15.2, suffix: 'M' },
        { id: 'models-counter', target: 4, suffix: '' },
        { id: 'ensemble-accuracy', target: 94.2, suffix: '%' },
        { id: 'signals-generated', target: 1247, suffix: '' }
    ];

    counters.forEach(counter => {
        animateCounter(counter.id, counter.target, counter.suffix);
    });
}

function animateCounter(elementId, target, suffix) {
    const element = document.getElementById(elementId);
    if (!element) return;

    anime({
        targets: { value: 0 },
        value: target,
        duration: 2000,
        delay: 500,
        easing: 'easeOutExpo',
        update: function(anim) {
            const value = anim.animatables[0].target.value;
            if (target > 1000) {
                element.textContent = Math.floor(value).toLocaleString() + suffix;
            } else {
                element.textContent = value.toFixed(1) + suffix;
            }
        }
    });
}

// Floating particles animation
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = 3 + Math.random() * 4;
    particle.style.animation = `float ${duration}s infinite ease-in-out`;
    
    container.appendChild(particle);
    
    // Animate particle
    anime({
        targets: particle,
        translateY: [-20, 20],
        translateX: [-10, 10],
        opacity: [0.3, 0.8, 0.3],
        duration: duration * 1000,
        loop: true,
        easing: 'easeInOutSine',
        delay: Math.random() * 2000
    });
}

// Signal Simulator functionality
function initializeSimulator() {
    const generateBtn = document.getElementById('generate-signal');
    const timeframeBtns = document.querySelectorAll('.timeframe-btn');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generateSignal);
    }
    
    timeframeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            timeframeBtns.forEach(b => b.classList.remove('bg-blue-600'));
            timeframeBtns.forEach(b => b.classList.add('bg-gray-800'));
            this.classList.remove('bg-gray-800');
            this.classList.add('bg-blue-600');
        });
    });
    
    // Initialize chart
    initializeSignalChart();
}

function initializeSignalChart() {
    const chartDom = document.getElementById('signal-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    // Generate sample candlestick data
    const data = generateCandlestickData();
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '10%',
            right: '10%',
            top: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: data.map(item => item[0]),
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#999' }
        },
        yAxis: {
            type: 'value',
            scale: true,
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#999' },
            splitLine: { lineStyle: { color: '#333' } }
        },
        series: [{
            type: 'candlestick',
            data: data.map(item => [item[1], item[2], item[3], item[4]]),
            itemStyle: {
                color: '#00ff88',
                color0: '#ff4757',
                borderColor: '#00ff88',
                borderColor0: '#ff4757'
            }
        }]
    };
    
    myChart.setOption(option);
}

function generateCandlestickData() {
    const data = [];
    let basePrice = 43000;
    
    for (let i = 0; i < 30; i++) {
        const open = basePrice + (Math.random() - 0.5) * 200;
        const close = open + (Math.random() - 0.5) * 400;
        const high = Math.max(open, close) + Math.random() * 200;
        const low = Math.min(open, close) - Math.random() * 200;
        
        data.push([
            `${i + 1}`,
            open.toFixed(2),
            close.toFixed(2),
            low.toFixed(2),
            high.toFixed(2)
        ]);
        
        basePrice = close;
    }
    
    return data;
}

function generateSignal() {
    const generateBtn = document.getElementById('generate-signal');
    const resultsDiv = document.getElementById('signal-results');
    
    // Show loading state
    generateBtn.textContent = 'Analyzing Chart...';
    generateBtn.disabled = true;
    
    // Simulate AI processing
    setTimeout(() => {
        // Generate random signal data
        const signalData = {
            direction: Math.random() > 0.5 ? 'LONG' : 'SHORT',
            entry: 43250 + (Math.random() - 0.5) * 1000,
            confidence: 90 + Math.random() * 8,
            tp1: 0,
            tp2: 0,
            sl: 0
        };
        
        // Calculate TP and SL based on direction
        if (signalData.direction === 'LONG') {
            signalData.tp1 = signalData.entry + 400;
            signalData.tp2 = signalData.entry + 800;
            signalData.sl = signalData.entry - 400;
        } else {
            signalData.tp1 = signalData.entry - 400;
            signalData.tp2 = signalData.entry - 800;
            signalData.sl = signalData.entry + 400;
        }
        
        // Update UI
        document.getElementById('signal-direction').textContent = signalData.direction;
        document.getElementById('signal-direction').className = signalData.direction === 'LONG' ? 
            'font-semibold text-green-400' : 'font-semibold text-red-400';
        document.getElementById('entry-price').textContent = `$${signalData.entry.toFixed(2)}`;
        document.getElementById('confidence').textContent = `${signalData.confidence.toFixed(1)}%`;
        document.getElementById('tp1').textContent = `$${signalData.tp1.toFixed(2)}`;
        document.getElementById('tp2').textContent = `$${signalData.tp2.toFixed(2)}`;
        document.getElementById('sl').textContent = `$${signalData.sl.toFixed(2)}`;
        
        // Show results with animation
        resultsDiv.classList.remove('hidden');
        anime({
            targets: resultsDiv,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutExpo'
        });
        
        // Reset button
        generateBtn.textContent = 'Generate AI Signal';
        generateBtn.disabled = false;
        
    }, 2000);
}

// Performance Chart
function initializePerformanceChart() {
    const chartDom = document.getElementById('performance-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const winRates = [89.2, 91.5, 88.7, 92.1, 90.3, 89.8, 91.2, 90.7, 92.5, 89.9, 91.8, 90.4];
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '10%',
            right: '10%',
            top: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: months,
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#999' }
        },
        yAxis: {
            type: 'value',
            min: 85,
            max: 95,
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#999', formatter: '{value}%' },
            splitLine: { lineStyle: { color: '#333' } }
        },
        series: [{
            type: 'line',
            data: winRates,
            smooth: true,
            lineStyle: {
                color: '#00d4ff',
                width: 3
            },
            itemStyle: {
                color: '#00d4ff'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                        { offset: 1, color: 'rgba(0, 212, 255, 0)' }
                    ]
                }
            }
        }]
    };
    
    myChart.setOption(option);
}

// Recent Signals
function initializeRecentSignals() {
    const container = document.getElementById('recent-signals');
    if (!container) return;
    
    const signals = [
        { pair: 'BTC/USDT', direction: 'LONG', outcome: 'WIN', pnl: '+2.8%', time: '2 hours ago' },
        { pair: 'EUR/USD', direction: 'SHORT', outcome: 'WIN', pnl: '+1.5%', time: '4 hours ago' },
        { pair: 'GOLD', direction: 'LONG', outcome: 'LOSS', pnl: '-0.8%', time: '6 hours ago' },
        { pair: 'ETH/USDT', direction: 'LONG', outcome: 'WIN', pnl: '+3.2%', time: '8 hours ago' },
        { pair: 'NAS100', direction: 'SHORT', outcome: 'WIN', pnl: '+2.1%', time: '10 hours ago' }
    ];
    
    signals.forEach(signal => {
        const signalElement = createSignalElement(signal);
        container.appendChild(signalElement);
    });
}

function createSignalElement(signal) {
    const div = document.createElement('div');
    div.className = 'flex items-center justify-between p-3 bg-gray-800 rounded-lg';
    
    const outcomeColor = signal.outcome === 'WIN' ? 'text-green-400' : 'text-red-400';
    const directionColor = signal.direction === 'LONG' ? 'text-green-400' : 'text-red-400';
    
    div.innerHTML = `
        <div class="flex items-center space-x-3">
            <div class="text-sm font-medium">${signal.pair}</div>
            <div class="text-xs ${directionColor}">${signal.direction}</div>
        </div>
        <div class="flex items-center space-x-3">
            <div class="text-xs ${outcomeColor} font-mono">${signal.pnl}</div>
            <div class="text-xs text-gray-500">${signal.time}</div>
        </div>
    `;
    
    return div;
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                anime({
                    targets: element,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutExpo',
                    delay: anime.stagger(100)
                });
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.signal-card, .model-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Utility functions
function scrollToSimulator() {
    document.getElementById('simulator').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToPerformance() {
    document.getElementById('performance-preview').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize general animations
function initializeAnimations() {
    // Animate accuracy bars
    setTimeout(() => {
        document.querySelectorAll('.accuracy-bar').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            anime({
                targets: bar,
                width: width,
                duration: 1500,
                delay: 500,
                easing: 'easeOutExpo'
            });
        });
    }, 1000);
    
    // Add hover effects to cards
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        25% { transform: translateY(-10px) translateX(5px); }
        50% { transform: translateY(0px) translateX(-5px); }
        75% { transform: translateY(10px) translateX(5px); }
    }
`;
document.head.appendChild(style);