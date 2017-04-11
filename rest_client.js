'use strict';
module.change_code = 1;
var requestPromise = require('request-promise');
var ENDPOINT = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/";
var KEY="V0PRJlj5SdmshEJmMfmYIwip2Ohvp1Moc9yjsnZltjXGEgTbEt";
var NUM_RESULTS=10;

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

module.exports=Rest_client;
