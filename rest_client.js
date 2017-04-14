'use strict';
module.change_code = 1;
var requestPromise = require('request-promise');
var ENDPOINT = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/";
var KEY="V0PRJlj5SdmshEJmMfmYIwip2Ohvp1Moc9yjsnZltjXGEgTbEt";
var NUM_RESULTS=10; //5 from spoonacular, 5 from Food2Fork
//Sprint 5, add another API
var KEY_TWO="6d5bb0653c3b682113488154727ac902";
var ENDPOINT_TWO="http://food2fork.com/api/";
//Revision for Sprint 5, call Nutrition API
var ID_N="f0ca5203";
var KEY_N="9302237b96db64efa5d0a30651037b62";
var ENDPOINT_N="https://trackapi.nutritionix.com/v2/natural/nutrients";

function Rest_client() {
}

Rest_client.prototype.getListIngredients = function (ingredients_arg) {
    var options = {
        method: 'GET',
        uri: ENDPOINT + "findByIngredients",
        qs: {
            fillIngredients: false,
            ingredients: ingredients_arg,
            number: NUM_RESULTS,
            offset:0
        },
        headers: {
            "X-Mashape-Key": KEY,
            "Accept": "application/json"
        },
        json: true
    };

    var options_two = {
        key: KEY_TWO,
        uri: ENDPOINT_TWO + "search",
        q: ingredients_arg,
        headers: {
            "X-Mashape-Key": KEY,
            "Accept": "application/json"
        },
        json: true
    };

    return requestPromise(options);
};

Rest_client.prototype.getListKeywords = function (keywords_arg) {
    var options = {
        method: 'GET',
        uri: ENDPOINT + "search",
        qs: {
            number: NUM_RESULTS,
            offset:0,
            query: keywords_arg
        },
        headers: {
            "X-Mashape-Key": KEY,
            "Accept": "application/json"
        },
        json: true
    };

    var options_two = {
        key: KEY_TWO,
        uri: ENDPOINT_TWO + "search",
        q: keywords_arg,
        headers: {
            "X-Mashape-Key": KEY,
            "Accept": "application/json"
        },
        json: true
    };

    return requestPromise(options);
};

Rest_client.prototype.getRecipeSteps = function (recipe_id) {
    var options = {
        method: 'GET',
        uri: ENDPOINT + recipe_id + "/analyzedInstructions",
        qs: {
            stepBreakdown:true
        },
        headers: {
            "X-Mashape-Key": KEY,
            "Accept": "application/json"
        },
        json: true
    };

    var options_two = {
        key: KEY_TWO,
        uri: ENDPOINT_TWO + "search",
        q: keywords_arg,
        headers: {
            "X-Mashape-Key": KEY,
            "Accept": "application/json"
        },
        json: true
    };
    return requestPromise(options);
};

Rest_client.prototype.getIngredients = function (recipe_id) {
    var options = {
        method: 'GET',
        uri: ENDPOINT + recipe_id + "/information",
        qs: {
            stepBreakdown:true
        },
        headers: {
            "X-Mashape-Key": KEY,
            "Accept": "application/json"
        },
        json: true
    };
    return requestPromise(options);
};

Rest_client.prototype.getIngredients = function (recipe_id) {
    var options = {
        method: 'GET',
        uri: ENDPOINT + recipe_id + "/information",
        qs: {
            stepBreakdown:true
        },
        headers: {
            "X-Mashape-Key": KEY,
            "Accept": "application/json"
        },
        json: true
    };
    return requestPromise(options);
};

Rest_client.prototype.getNutrients = function (ingredients) {
    var options = {
        method: 'POST',
        uri: ENDPOINT_N,
        query: ingredients,
        headers: {
            'x-app-id':ID_N,
            'x-app-key':KEY_N,
        },
        json: true
    };
    return requestPromise(options);
};
module.exports = Rest_client

