/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            LOCATIONS: {
              //alias (what the person said) : official_name (what they want)
              'immortal fountain':'immortal_fountain',
              'fountain':'immortal_fountain',
              'watts':'immortal_fountain',
              'perpetual campfire':'perpetual_campfire',
              'campfire':'perpetual_campfire',
              'grim':'perpetual_campfire',
              'grimm':'perpetual_campfire',
              'beyond':'the_beyond',
              'the beyond':'the_beyond',
              'daft staircase':'daft_staircase',
              'the shop':'meta_shop',
              'shop':'meta_shop',
              'shop keeper':'meta_shop',
              'kiosk shop':'meta_shop',
              'meta circle':'meta_circle',
              'gate 1':'immortal_fountain',
              'gate 2':'perpetual_campfire',
            },
            TUNES: {
              'simon':'song of simon',
              'sam':'song of sam',
              'samantha':'song of sam',
              'paul':'song of paul',
              'judy':'song of judy',
              'cdega':'major pentatonic',
              'csharpdega':'sharp major pentatonic',
            },
            SKILL_NAME: 'American Space Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', "welcome to the meta circle. The shop, perpetual campfire, and immortal fountain are open. which would you like to go to?");
    },
    'ExploreIntent': function () {
        var locationJSON =  this.event.request.intent.slots.Location;

        var speechOutput;
        if(isValidSlot(locationJSON)){
            var location=JSON.stringify(locationJSON.value);
            speechOutput="Headed to "+location;
        } else {
            speechOutput="no, we're not doing that";
        }
        this.emit(':ask', speechOutput);
    },
    'ShopIntent': function () {
        var speechOutput="welcome to the shop";
        this.emit(':ask', speechOutput);
    },
    'ImmortalFountainIntent': function () {
        var speechOutput="welcome to the immortal fountain";
        this.emit(':ask', speechOutput);
    },
    'PerpetualCampfireIntent': function () {
        var speechOutput="welcome to the perpetual campfire";
        this.emiACt(':ask', speechOutput);
    },
    'MetaCircleIntent': function () {
        var speechOutput="welcome to the Meta Circle";
        this.emit(':ask', speechOutput);
    },
    'NameThatTuneIntent': function () {
      var tuneJSON =  this.event.request.intent.slots.Tune;

      var speechOutput;
      if(isValidSlot(tuneJSON)){
        //see if it matches a result
        var tunesJSON = this.t('TUNES'); //list of valid tunes
        var tuneValue = tuneJSON.value.toLowerCase() //take the user input and lower case
        tuneValue = tuneValue.replace(/\s/g,''); //strip spaces
        var tune=tunesJSON[tuneValue];
        if (tune) {
          console.log(tune);
          speechOutput="you got it right! it's the "+tune+". "+ getSpeechCon(true);
        } else {
          speechOutput=getSpeechCon(false)+"keep trying";
        }
      } else {
        speechOutput="no match";
      }


        this.emit(':ask', speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

function getSpeechCon(type)
{
    var speechCon = "";
    if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length-1)] + "! </say-as><break strength='strong'/>";
    else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length-1)] + " </say-as><break strength='strong'/>";
}
function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

//This is a list of positive speechcons that this skill will use when a user gets a correct answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsCorrect = ["Booya", "All righty", "Bam", "Bazinga", "Bingo", "Boom", "Bravo", "Cha Ching", "Cheers", "Dynomite",
"Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Kaching", "Oh snap", "Phew",
"Righto", "Way to go", "Well done", "Whee", "Woo hoo", "Yay", "Wowza", "Yowsa"];

//This is a list of negative speechcons that this skill will use when a user gets an incorrect answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsWrong = ["Argh", "Aw man", "Blarg", "Blast", "Boo", "Bummer", "Darn", "D'oh", "Dun dun dun", "Eek", "Honk", "Le sigh",
"Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks", "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];

function isValidSlot(slot){
    console.log("in isValidSlot");
    console.log(slot)
    if (slot && slot.value) {
      //we have a value in the slot
      console.log("slot is valid");
      return true
    }
    console.log("slot is not valid");
    return false
}

function normalizeSlot(slot){
    return slot.value.toLowerCase();
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
