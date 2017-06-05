
'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = INSERT_HERE

const languageStrings = {
    'en': {
        translation: {
            FACTS: [
                'Birds have feathers, wings, lay eggs and are warm blooded.',
                'There are around ten thoursand different species of birds worldwide.',
                'The Ostrich is the largest bird in the world. It also lays the largest eggs and has the fastest maximum running speed.',
                'Some bird species are intelligent enough to create and use tools.',
                'Birds have hollow bones which help them fly.',
                'Kiwis are endangered, flightless birds that live in New Zealand. They lay the largest eggs relative to their body size of any bird in the world.',
                'Hummingbirds can fly backwards.',
                'The Bee Hummingbird is the smallest living bird in the world, with a length of just five centimeters.',
                'The Sun is an almost perfect sphere.',
                'Around twenty percent of bird species migrate long distances every year.',
                'Homing pigeons are bred to find their way home from long distances away and have been used for thousands of years to carry messages.',
    
            ],
            SKILL_NAME: 'Bird Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a bird fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
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
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
