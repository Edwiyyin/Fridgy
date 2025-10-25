class FoodPage {
    constructor() {
        this.api = new FoodAPI();
        this.loadFoods();
        this.setupForm();
    }

    async loadFoods() {
        const foods = await this.api.getFoods();
        this.renderFoods(foods);
    }

    renderFoods(foods) {
        const container = document.getElementById('food-list');
        container.innerHTML = foods.map(food => `
            <div class="card food-card ${this.getExpiryClass(food.expiryDate)}">
                <div class="food-header">
                    <div>
                        <strong>${food.name}</strong>
                        <div>Storage: ${food.storageType}</div>
                    </div>
                    <button class="delete-btn" onclick="foodPage.deleteFood('${food.id}')">Delete</button>
                </div>
                <div>Expires: ${new Date(food.expiryDate).toLocaleDateString()}</div>
            </div>
        `).join('');
    }

    getExpiryClass(expiryDate) {
        const days = this.getDaysUntilExpiry(expiryDate);
        return days <= 3 ? 'expiring' : '';
    }

    getDaysUntilExpiry(expiryDate) {
        const today = new Date();
        const expiry = new Date(expiryDate);
        return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    }

    showAddForm() {
        document.getElementById('add-form').classList.remove('hidden');
    }

    setupForm() {
    document.getElementById('food-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const food = {
            name: document.getElementById('food-name').value,
            storageType: document.getElementById('food-storage').value,
            category: document.getElementById('food-category').value,
            quantity: parseInt(document.getElementById('food-quantity').value),
            unit: document.getElementById('food-unit').value,
            expiryDate: document.getElementById('food-expiry').value
        };

        await this.api.addFood(food);
        this.loadFoods();
        this.hideForm();
    });
}

    hideForm() {
        document.getElementById('add-form').classList.add('hidden');
        document.getElementById('food-form').reset();
    }

    async deleteFood(id) {
        await this.api.deleteFood(id);
        this.loadFoods();
    }
}

const foodPage = new FoodPage();