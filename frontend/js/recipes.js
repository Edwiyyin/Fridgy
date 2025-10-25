class RecipesPage {
    constructor() {
        this.api = new FoodAPI();
        this.loadRecipes();
        this.setupForm();
    }

    async loadRecipes() {
        const recipes = await this.api.getRecipes();
        this.renderRecipes(recipes);
    }

    renderRecipes(recipes) {
        const container = document.getElementById('recipes-list');
        
        if (recipes.length === 0) {
            container.innerHTML = '<div class="card">No recipes yet. Add your first recipe!</div>';
            return;
        }

        container.innerHTML = recipes.map(recipe => `
            <div class="card recipe-card">
                <div class="recipe-header">
                    <div>
                        <h3>${recipe.name}</h3>
                        <div>Cook time: ${recipe.cookTime} minutes</div>
                    </div>
                    <button class="btn-danger" onclick="recipesPage.deleteRecipe('${recipe.id}')">Delete</button>
                </div>
                <div class="recipe-ingredients">
                    <strong>Ingredients:</strong>
                    ${recipe.ingredients.map(ing => 
                        `<span class="ingredient-tag">${ing}</span>`
                    ).join('')}
                </div>
                <div><strong>Instructions:</strong> ${recipe.instructions}</div>
            </div>
        `).join('');
    }

    showAddForm() {
        document.getElementById('add-form').classList.remove('hidden');
    }

    setupForm() {
    document.getElementById('recipe-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const recipe = {
            name: document.getElementById('recipe-name').value,
            ingredients: document.getElementById('recipe-ingredients').value.split('\n').filter(i => i.trim() !== ''),
            instructions: document.getElementById('recipe-instructions').value,
            cookTime: parseInt(document.getElementById('recipe-time').value),
            servings: parseInt(document.getElementById('recipe-servings').value)
        };

        await this.api.addRecipe(recipe);
        this.loadRecipes();
        this.hideForm();
    });
}

    hideForm() {
        document.getElementById('add-form').classList.add('hidden');
        document.getElementById('recipe-form').reset();
    }

    async deleteRecipe(id) {
        await this.api.deleteRecipe(id);
        this.loadRecipes();
    }
}

const recipesPage = new RecipesPage();