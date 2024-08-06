const express = require("express");
const multer = require("multer");
const tf = require("@tensorflow/tfjs-node-gpu");
const Meal = require("../models/Meal");
const auth = require("../routes/auth");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/analyze", auth, upload.single("mealImage"), async (req, res) => {
    try {
        const imageBuffer = req.file.buffer;
        const nutritionalInfo = await analyzeMealImage(imageBuffer);

        const meal = new Meal({
            user: req.user.id,
            nutritionalInfo,
            date: Date.now()
        });

        await meal.save();

        res.json(nutritionalInfo);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("server error");
    }
});

module.exports = router;

async function analyzeMealImage(imageBuffer) {
    // Load the pre-trained model
    const model = await tf.loadLayersModel('path/to/model.json');
  
    // Preprocess the image
    let imageTensor = tf.node.decodeImage(imageBuffer, 3);
    imageTensor = tf.image.resizeBilinear(imageTensor, [224, 224]);
    imageTensor = imageTensor.expandDims(0).div(255);
  
    // Make predictions
    const predictions = model.predict(imageTensor);
    const predictionArray = predictions.arraySync()[0];
  
    // Calculate nutritional information based on predictions
    const nutritionalInfo = calculateNutritionalInfo(predictionArray);
  
    return nutritionalInfo;
  }
  
  function calculateNutritionalInfo(predictionArray) {
    // Dummy implementation, replace with actual logic
    return {
        calories: predictionArray[0] * 100,
        protein: predictionArray[1] * 10,
        fat: predictionArray[2] * 5,
        carbs: predictionArray[3] * 15,
        dietaryFiber: predictionArray[4] * 2,
        sugars: predictionArray[5] * 9,
        solubleFiber: predictionArray[6] * 1,
        monounsaturatedFat: predictionArray[7] * 0.5,
        polyunsaturatedFat: predictionArray[8] * 0.5,
        transFat: predictionArray[9] * 0.0,
        otherCarbohydrate: predictionArray[10] * 11
    };
  }



router.get("/activities", auth, async(req,res) => {
    try{
        const meals = await Meal.find({ user: req.user.id }).sort({ date: -1});
        res.json(meals);
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});
