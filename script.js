document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const radius = 300;
    const angles = [215, 175, -240, 50, 0, -40];
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
    
            // Adjust first 3 steps with better spacing
            if (index < 3) {
                stepContent.style.marginLeft = '0';
                stepContent.style.marginRight = '30px';
                stepContent.style.textAlign = 'right';
                stepContent.style.order = '1';
                stepNumber.style.order = '2';
                step.style.transform = 'translate(-100%, -50%)';
            } else {
                stepContent.style.marginLeft = '20px';
                stepContent.style.marginRight = '0';
                stepContent.style.textAlign = 'left';
                stepContent.style.order = '2';
                stepNumber.style.order = '1';

                switch(index) {
                    case 3: // Step 4
                        step.style.transform = 'translate(-10%, -60%)';
                        break;
                    case 4: // Step 5
                        step.style.transform = 'translate(-15%, -50%)';
                        break;
                    case 5: // Step 6
                        step.style.transform = 'translate(-15%, -40%)';
                        break;
                }
            }
        });
        
        const path = document.getElementById('connection-path');
        
        const curveSettingsArray = [
            { // 1 to 2
                curvature: 0.1,
                verticalBias: 30,
                horizontalBias: -50
            },
            { // 2 to 3
                curvature: 0.23,
                verticalBias: 90,
                horizontalBias: -100
            },
            { // 3 to 4
                curvature: 0.1,
                verticalBias: 100,
                horizontalBias: 0
            },
            { // 4 to 5
                curvature: 0.1,
                verticalBias: 80,
                horizontalBias: 50
            },
            { // 5 to 6
                curvature: 0.35,
                verticalBias: -80,
                horizontalBias: 80
            }
        ];
        
        const pathData = points.reduce((acc, point, i) => {
            if (i === 0) return `M ${point.x},${point.y}`;
            
            const prevPoint = points[i - 1];
            const midX = (prevPoint.x + point.x) / 2;
            const midY = (prevPoint.y + point.y) / 2;
            
            const settings = curveSettingsArray[i - 1];
            
            const controlX = midX + 
                (point.y - prevPoint.y) * settings.curvature + 
                settings.horizontalBias;
            
            const controlY = midY - 
                (point.x - prevPoint.x) * settings.curvature + 
                settings.verticalBias;
            
            return `${acc} Q ${controlX},${controlY} ${point.x},${point.y}`;
        }, '');
        
        path.setAttribute('d', pathData);
    }
});
