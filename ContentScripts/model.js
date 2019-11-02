
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
    new Attribute("Number", /number|numeric|num/gim, "[0-9]+")
    //TODO: Add more attribute
];

