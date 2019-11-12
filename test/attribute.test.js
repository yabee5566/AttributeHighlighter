const attribute = require('../ContentScripts/attribute.js');

//Test user input - attribute mapping
test('map to IP attr "IP" ', () => {
    let userInputs = ['ip','IP'];
    for (let userInput of userInputs){
        expect(attribute.getMatchedAttr(userInput).name).toBe('IP');
    }});

test('map to attr "Number" ', () => {
    let userInputs = ['number','numeric', 'num','Num'];
    for (let userInput of userInputs){
        expect(attribute.getMatchedAttr(userInput).name).toBe('Number');
    }
});

test('map to attr "URL"', () => {
    let userInputs = ['url','URL'];
    for (let userInput of userInputs){
        expect(attribute.getMatchedAttr(userInput).name).toBe('URL');
    }
});

test('map to attr "Email"', () => {
    let userInputs = ['A-haha@hotmail.com','taiwanNo.1@yahoo.com.tw', 'whoisYouDaddy@ms22.hinet.net'];
    for (let userInput of userInputs){
        expect(attribute.getMatchedAttr(userInput).name).toBe('Email');
    }
});