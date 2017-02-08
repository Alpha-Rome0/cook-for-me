'use strict';
module.change_code=1;
var Set = require("collections/set");

function State_manager(obj){
    this.currentState='start';
    this.savedRecipes=new Set();
    this.states=
    {
        start:{
            response:null,
            prompt:"Welcome to cook for me. I am here to help you cook. How can I be of service? If you want to know what I can do say, help.",
            help:"Simply say, find by keyword or find by ingredients. Say, saved recipes, to pick from a list of saved recipes. Say cancel or stop at any time to exit."
        },
        continue_state:{
            response:null,
            prompt:"I see that you have a saved session. Say, continue, to resume your last session or, new session, to start a new session.",
            help:"Say, continue, to resume your last session or, new session, to start a new session."
        },
        search:{
            response:null,
            prompt:"Would you like to search by keywords, ingredients?",
            help:"Simply say, search by keywords or search by ingredients."
        },
        keywords:{
            response:null,
            prompt:"OK, say a keyword you would like to search with.",
            help:"Simply say what keywords you would like to search with."
        },
        keywords1:{
            response:null,
            prompt:"say another keyword or say, begin search, if you would like me to begin searching",
            help:"simply say a keyword or ,begin search, if you want to start searching"
        },
        ingredients:{
            response:null,
            prompt:"Say an ingredient you would like to search with.",
            help:"Simply say an ingredient."
        },
        ingredients1:{
            response:null,
            prompt:"Say another ingredient or say , begin search, if you are ready to search.",
            help:"Say an ingredient or say , begin search, if you are ready to search."
        },
        search_choices:{
            response:null,
            prompt:"Here is what I found",
            help:"Say the number corresponding to the recipe you would like to select."
        },
        steps_choice:{
            response:null,
            recipe_info:null,
            prompt:"Would you like me to read ingredients step by step or all at once?",
            help:"You can say, step by step, or all at once."
        },
        step_by_step:{
            response:null,
            step:0,
            prompt:"Say next step to move on to the next step or previous step to go back",
            help:"Say next step to move on to the next step or previous step to go back"
        },

        add_intent:{
            response:null,
            step:0,
            prompt: "Please state each step of the recipe one by one",
            help: "I will repeat the step to you, and you can choose to move to the next step or not. When you complete the recipe, say end recipe"
        },

        add_title_intent:{
            response:null,
            step:0,
            prompt: "Please state each step of the recipe one by one",
            help: "I will repeat the step to you, and you can choose to move to the next step or not. When you complete the recipe, say end recipe"
        },
        confirm_title_intent:{
            response:null,
            step:0,
            prompt: "Please state each step of the recipe one by one",
            help: "I will repeat the step to you, and you can choose to move to the next step or not. When you complete the recipe, say end recipe"
        },
        redo_title_intent:{
            response:null,
            step:0,
            prompt: "Please state each step of the recipe one by one",
            help: "I will repeat the step to you, and you can choose to move to the next step or not. When you complete the recipe, say end recipe"
        },
        add_step_intent:{
            response:null,
            step:0,
            prompt: "Please state each step of the recipe one by one",
            help: "I will repeat the step to you, and you can choose to move to the next step or not. When you complete the recipe, say end recipe"
        },
        confirm_step_intent:{
            response:null,
            step:0,
            prompt: "Please state each step of the recipe one by one",
            help: "I will repeat the step to you, and you can choose to move to the next step or not. When you complete the recipe, say end recipe"
        },
        redo_step_intent:{
            response:null,
            step:0,
            prompt: "Please state each step of the recipe one by one",
            help: "I will repeat the step to you, and you can choose to move to the next step or not. When you complete the recipe, say end recipe"
        },
        done_adding_intent:{
            response:null,
            step:0,
            prompt: "Please state each step of the recipe one by one",
            help: "I will repeat the step to you, and you can choose to move to the next step or not. When you complete the recipe, say end recipe"
        }


    };
    for(var prop in obj)this[prop]=obj[prop];
}


State_manager.prototype.getCurrentState=function(){
    return this.states[this.currentState]
};

State_manager.prototype.getRecipeInfo=function(){
    return this.states["steps_choice"].recipe_info;
};

module.exports=State_manager;