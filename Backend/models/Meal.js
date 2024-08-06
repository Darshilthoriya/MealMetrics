const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nutritionalInfo: {
        calories: { type: Number, required: true },
        protein: { type: Number, required: true },
        fat: { type: Number, required: true },
        carbs: { type: Number, required: true },
        dietaryFiber: { type: Number, required: true },
        sugars: { type: Number, required: true },
        solubleFiber: { type: Number, required: true },
        monounsaturatedFat: { type: Number, required: true },
        polyunsaturatedFat: { type: Number, required: true },
        transFat: { type: Number, required: true },
        otherCarbohydrate: { type: Number, required: true }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Meal', MealSchema);