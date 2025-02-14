document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const radius = 300;
    const angles = [215, 175, -240, 50, 1, -40];
    const points = [];
    
    if (window.innerWidth > 768) {
        steps.forEach((step, index) => {
            const angle = angles[index] * (Math.PI / 180);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            points.push({
                x: 450 + x, 
                y: 450 + y  
            });
            
            // Position steps
            step.style.left = `calc(50% + ${x}px)`;
            step.style.top = `calc(50% + ${y}px)`;
            
            const stepContent = step.querySelector('.step-content');
            const stepNumber = step.querySelector('.step-number');
    
            // Basic content styling
            stepContent.style.marginLeft = '20px';
            stepContent.style.marginRight = '0';
            stepContent.style.textAlign = 'left';
            stepContent.style.order = '2';
            stepNumber.style.order = '1';

            // Position adjustments for each step
            switch(index) {
                case 0: // Step 1
                    stepContent.style.marginLeft = '0';
                    stepContent.style.marginRight = '30px';
                    stepContent.style.textAlign = 'right';
                    stepContent.style.order = '1';
                    stepNumber.style.order = '2';
                    step.style.transform = 'translate(-90%, -50%)';
                    break;
                case 1: // Step 2
                    stepContent.style.marginLeft = '0';
                    stepContent.style.marginRight = '30px';
                    stepContent.style.textAlign = 'right';
                    stepContent.style.order = '1';
                    stepNumber.style.order = '2';
                    step.style.transform = 'translate(-90%, -55%)';
                    break;
                case 2: // Step 3
                    stepContent.style.marginLeft = '0';
                    stepContent.style.marginRight = '30px';
                    stepContent.style.textAlign = 'right';
                    stepContent.style.order = '1';
                    stepNumber.style.order = '2';
                    step.style.transform = 'translate(-100%, -60%)';
                    break;
                case 3: // Step 4
                    step.style.transform = 'translate(-12%, -45%)';
                    break;
                case 4: // Step 5
                    step.style.transform = 'translate(-12%, -50%)';
                    break;
                case 5: // Step 6
                    step.style.transform = 'translate(-5%, -40%)';
                    break;
            }
        });
        
        const path = document.getElementById('connection-path');
        
        const curveSettingsArray = [
            { // 1 to 2
                curvature: 0.03,
                verticalBias: 30,
                horizontalBias: -60,
                midpointOffset: 0,      // Controls how far the midpoint shifts
                tensionX: 3,            // Adjusts curve tension horizontally
                tensionY: 1,            // Adjusts curve tension vertically
                smoothing: 1          // Controls how smooth the curve is
            },
            { // 2 to 3
                curvature: 0.25,
                verticalBias: 120,
                horizontalBias: -120,
                midpointOffset: 0,
                tensionX: 1,
                tensionY: 3,
                smoothing: 1
            },
            { // 3 to 4
                curvature: 0.3,
                verticalBias: 100,
                horizontalBias: 25,
                midpointOffset: 0,
                tensionX: 1,
                tensionY: 0.1,
                smoothing: 1
            },
            { // 4 to 5
                curvature: 0.1,
                verticalBias: 80,
                horizontalBias: 40,
                midpointOffset: 10,
                tensionX: 1,
                tensionY: 1,
                smoothing: 1
            },
            { // 5 to 6
                curvature: 0.3,
                verticalBias: -90,
                horizontalBias: 90,
                midpointOffset: 0,
                tensionX: 1,
                tensionY: 0.5,
                smoothing: 1
            }   
        ];
        
        const pathData = points.reduce((acc, point, i) => {
            if (i === 0) return `M ${point.x},${point.y}`;
            
            const prevPoint = points[i - 1];
            const settings = curveSettingsArray[i - 1];
            
            // Calculate midpoint with offset
            const midX = (prevPoint.x + point.x) / 2 + settings.midpointOffset;
            const midY = (prevPoint.y + point.y) / 2 + settings.midpointOffset;
            
            // Apply tension and smoothing to control points
            const dx = (point.x - prevPoint.x) * settings.smoothing;
            const dy = (point.y - prevPoint.y) * settings.smoothing;
            
            const controlX = midX + 
                (point.y - prevPoint.y) * settings.curvature * settings.tensionX + 
                settings.horizontalBias;
            
            const controlY = midY - 
                (point.x - prevPoint.x) * settings.curvature * settings.tensionY + 
                settings.verticalBias;
            
            return `${acc} Q ${controlX},${controlY} ${point.x},${point.y}`;
        }, '');
        
        path.setAttribute('d', pathData);
    }
});
