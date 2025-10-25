class FoodAPI {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api';
    }

    async getFoods() {
        const response = await fetch(`${this.baseUrl}/foods`);
        return await response.json();
    }

    async addFood(food) {
        const response = await fetch(`${this.baseUrl}/foods`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(food)
        });
        return await response.json();
    }

    async deleteFood(id) {
        await fetch(`${this.baseUrl}/foods/${id}`, { method: 'DELETE' });
    }

    async getRecipes() {
        const response = await fetch(`${this.baseUrl}/recipes`);
        return await response.json();
    }

    async addRecipe(recipe) {
        const response = await fetch(`${this.baseUrl}/recipes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe)
        });
        return await response.json();
    }

    async deleteRecipe(id) {
        await fetch(`${this.baseUrl}/recipes/${id}`, { method: 'DELETE' });
    }

    async getMeals() {
        const response = await fetch(`${this.baseUrl}/meals`);
        return await response.json();
    }

    async addMeal(meal) {
        const response = await fetch(`${this.baseUrl}/meals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meal)
        });
        return await response.json();
    }

    async getRecommendations() {
        const response = await fetch(`${this.baseUrl}/recommendations`);
        return await response.json();
    }
}