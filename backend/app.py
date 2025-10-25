from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # This should allow all origins by default

DATA_FILE = 'food_data.json'

def load_data():
    if not os.path.exists(DATA_FILE):
        sample_data = {
            "foods": [
                {
                    "id": "1",
                    "name": "Milk",
                    "storageType": "fridge",
                    "quantity": 1,
                    "unit": "bottle",
                    "expiryDate": "2024-12-15",
                    "category": "dairy"
                },
                {
                    "id": "2", 
                    "name": "Apples",
                    "storageType": "shelf",
                    "quantity": 5,
                    "unit": "pieces",
                    "expiryDate": "2024-12-20",
                    "category": "fruits"
                }
            ],
            "recipes": [],
            "meals": []
        }
        save_data(sample_data)
        return sample_data
    
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/api/foods', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin()
def handle_foods():
    if request.method == 'GET':
        data = load_data()
        return jsonify(data['foods'])
    
    elif request.method == 'POST':
        data = load_data()
        new_food = request.get_json()
        
        print("Received food data:", new_food)  # Debug print
        
        new_food['id'] = str(len(data['foods']) + 1)
        data['foods'].append(new_food)
        save_data(data)
        return jsonify(new_food), 201

@app.route('/api/foods/<food_id>', methods=['DELETE', 'OPTIONS'])
@cross_origin()
def delete_food(food_id):
    if request.method == 'DELETE':
        data = load_data()
        data['foods'] = [f for f in data['foods'] if f['id'] != food_id]
        save_data(data)
        return jsonify({"message": "Food deleted"})

@app.route('/api/recipes', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin()
def handle_recipes():
    if request.method == 'GET':
        data = load_data()
        return jsonify(data['recipes'])
    
    elif request.method == 'POST':
        data = load_data()
        new_recipe = request.get_json()
        new_recipe['id'] = str(len(data['recipes']) + 1)
        data['recipes'].append(new_recipe)
        save_data(data)
        return jsonify(new_recipe), 201

@app.route('/api/recipes/<recipe_id>', methods=['DELETE', 'OPTIONS'])
@cross_origin()
def delete_recipe(recipe_id):
    if request.method == 'DELETE':
        data = load_data()
        data['recipes'] = [r for r in data['recipes'] if r['id'] != recipe_id]
        save_data(data)
        return jsonify({"message": "Recipe deleted"})

@app.route('/api/meals', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin()
def handle_meals():
    if request.method == 'GET':
        data = load_data()
        return jsonify(data['meals'])
    
    elif request.method == 'POST':
        data = load_data()
        new_meal = request.get_json()
        new_meal['id'] = str(len(data['meals']) + 1)
        new_meal['date'] = datetime.now().isoformat()
        data['meals'].append(new_meal)
        save_data(data)
        return jsonify(new_meal), 201

@app.route('/api/recommendations', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_recommendations():
    if request.method == 'GET':
        data = load_data()
        foods = data['foods']
        recipes = data['recipes']
        
        recommendations = []
        for recipe in recipes:
            has_ingredient = any(
                any(ingredient.lower() in food['name'].lower() 
                    for ingredient in recipe['ingredients']) 
                for food in foods
            )
            if has_ingredient:
                recommendations.append(recipe)
        
        return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True, port=8080, host='0.0.0.0')