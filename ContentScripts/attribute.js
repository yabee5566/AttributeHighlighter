
class Attribute {
    constructor(name, userInputKeyRegex, highlightRegexStr){
        this.name = name;
        this.userInputKeyRegex = userInputKeyRegex;
        this.highlightRegexStr = highlightRegexStr; //Don't know why passing regex via sendMessage() would not be
                                                    // correctly extracted in onMessage(). So here we don't keep regex
                                                    // but str type
    }
}

const SEARCH_ATTRIBUTE_LIST = [
    new Attribute("Number", /number|numeric|num/gim, "[0-9]+"),
    new Attribute("IP", /ip/gim,
        "\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b"),
    new Attribute("URL", /url/gim,
        "((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[\\-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9\\.\\-]+|(?:www\\.|[\\-;:&=\\+\\$,\\w]+@)[A-Za-z0-9\\.\\-]+)((?:\\/[\\+~%\\/\\.\\w\\-_]*)?\\??(?:[\\-\\+=&;%@\\.\\w_]*)#?(?:[\\.\\!\\/\\\\\\w]*))?)"),
    new Attribute("Email", /eamil|mail|/gim,
        "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"),
    //TODO: Add more attribute
];

function getMatchedAttr(userInputText){
    for (let attr of SEARCH_ATTRIBUTE_LIST) {
        let isMatched = (userInputText.search(attr.userInputKeyRegex) !== -1);
        if (isMatched){
            return attr;
        }
    }
}
module.exports = {
    getMatchedAttr:getMatchedAttr
};