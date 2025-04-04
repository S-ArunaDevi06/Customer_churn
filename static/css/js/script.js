document.addEventListener('DOMContentLoaded', function() {
    const predictBtn = document.getElementById('predict-btn');
    const customerIdInput = document.getElementById('customer_id');
    
    predictBtn.addEventListener('click', function() {
        const customerId = customerIdInput.value.trim();
        
        if (!customerId) {
            alert('Please enter a Customer ID');
            return;
        }
        
        // Simulate API call (replace with actual fetch to your Flask endpoint)
        simulatePrediction(customerId);
    });
    
    function simulatePrediction(customerId) {
        // Show loading state
        document.getElementById('churn-value').textContent = '...';
        document.getElementById('cltv-value').textContent = '...';
        
        // Simulate API delay
        setTimeout(() => {
            // Generate random predictions for demo purposes
            const isChurn = Math.random() > 0.5;
            const churnProbability = Math.floor(Math.random() * 100);
            const cltv = Math.floor(Math.random() * 2000) + 3000;
            
            // Update UI with predictions
            updateChurnPrediction(isChurn, churnProbability);
            updateCLTVPrediction(cltv);
            updateCustomerDetails(customerId);
        }, 800);
    }
    
    function updateChurnPrediction(isChurn, probability) {
        const churnValue = document.getElementById('churn-value');
        const churnPercentage = document.getElementById('churn-percentage');
        const churnProbabilityBar = document.getElementById('churn-probability');
        const churnRecommendation = document.getElementById('churn-recommendation');
        
        // Update prediction value
        churnValue.textContent = isChurn ? 'YES' : 'NO';
        churnValue.style.color = isChurn ? '#f72585' : '#4cc9f0';
        
        // Update probability meter
        churnPercentage.textContent = `${probability}%`;
        churnProbabilityBar.style.width = `${probability}%`;
        
        // Update recommendation based on probability
        let recommendation = '';
        if (probability < 30) {
            recommendation = 'Low churn risk. Maintain current engagement strategies.';
        } else if (probability < 60) {
            recommendation = 'Medium churn risk. Consider loyalty programs or personalized offers.';
        } else {
            recommendation = 'High churn risk. Immediate action required - offer special retention deals or conduct exit interviews.';
        }
        
        churnRecommendation.innerHTML = `
            <strong>Recommendation:</strong> ${recommendation}
            <br><br>
            <strong>Action Items:</strong>
            <ul>
                <li>Review customer service interactions</li>
                <li>Offer personalized discount</li>
                <li>Schedule check-in call</li>
            </ul>
        `;
    }
    
    function updateCLTVPrediction(cltv) {
        const cltvValue = document.getElementById('cltv-value');
        const cltvRange = document.getElementById('cltv-range');
        const cltvRecommendation = document.getElementById('cltv-recommendation');
        
        // Update CLTV value
        cltvValue.textContent = `$${cltv.toLocaleString()}`;
        
        // Calculate range position (3000-4600+)
        let rangePercent = 0;
        if (cltv < 3500) {
            rangePercent = ((cltv - 3000) / 500) * 25;
        } else if (cltv < 3900) {
            rangePercent = 25 + ((cltv - 3500) / 400) * 25;
        } else if (cltv < 4200) {
            rangePercent = 50 + ((cltv - 3900) / 300) * 25;
        } else if (cltv < 4600) {
            rangePercent = 75 + ((cltv - 4200) / 400) * 25;
        } else {
            rangePercent = 100;
        }
        
        cltvRange.style.width = `${rangePercent}%`;
        
        // Update recommendation based on CLTV range
        let recommendation = '';
        let strategies = [];
        
        if (cltv < 3500) {
            recommendation = 'Value Range: $3000-$3500 (Basic Tier)';
            strategies = [
                'Focus on increasing engagement',
                'Introduce entry-level premium features',
                'Upsell complementary services'
            ];
        } else if (cltv < 3900) {
            recommendation = 'Value Range: $3500-$3900 (Standard Tier)';
            strategies = [
                'Offer bundled services',
                'Provide moderate loyalty rewards',
                'Increase touchpoints'
            ];
        } else if (cltv < 4200) {
            recommendation = 'Value Range: $3900-$4200 (Premium Tier)';
            strategies = [
                'Personalized service offerings',
                'Exclusive access to features',
                'Premium support options'
            ];
        } else if (cltv < 4600) {
            recommendation = 'Value Range: $4200-$4600 (Elite Tier)';
            strategies = [
                'Dedicated account management',
                'Custom solutions development',
                'VIP treatment and perks'
            ];
        } else {
            recommendation = 'Value Range: $4600+ (Platinum Tier)';
            strategies = [
                'Strategic partnership opportunities',
                'Highest priority support',
                'Executive-level engagement'
            ];
        }
        
        cltvRecommendation.innerHTML = `
            <strong>${recommendation}</strong>
            <br><br>
            <strong>Growth Strategies:</strong>
            <ul>
                ${strategies.map(strategy => `<li>${strategy}</li>`).join('')}
            </ul>
        `;
    }
    
    function updateCustomerDetails(customerId) {
        // Generate random customer details for demo
        const tenure = Math.floor(Math.random() * 60) + 1;
        const monthly = (Math.random() * 200 + 30).toFixed(2);
        const total = (monthly * tenure).toFixed(2);
        
        document.getElementById('detail-id').textContent = customerId;
        document.getElementById('detail-tenure').textContent = `${tenure} months`;
        document.getElementById('detail-monthly').textContent = `$${monthly}`;
        document.getElementById('detail-total').textContent = `$${total}`;
    }
});