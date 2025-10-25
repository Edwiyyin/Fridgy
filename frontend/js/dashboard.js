class Dashboard {
    constructor() {
        this.api = new FoodAPI();
        this.loadData();
    }

    async loadData() {
        const foods = await this.api.getFoods();
        
        document.getElementById('total-foods').textContent = foods.length;
        
        const expiring = foods.filter(food => {
            const expiry = new Date(food.expiryDate);
            const today = new Date();
            const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
            return diffDays <= 3 && diffDays >= 0;
        });
        
        document.getElementById('expiring-soon').textContent = expiring.length;
        
        const expiringList = document.getElementById('expiring-list');
        expiringList.innerHTML = expiring.map(food => `
            <div class="food-item">
                <strong>${food.name}</strong> - Expires in ${this.getDaysUntilExpiry(food.expiryDate)} days
            </div>
        `).join('');
    }

    getDaysUntilExpiry(expiryDate) {
        const today = new Date();
        const expiry = new Date(expiryDate);
        return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    }
}

new Dashboard();