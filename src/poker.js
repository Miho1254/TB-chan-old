module.exports = { checkResult };

// High card: 0
// Pair : 100
// Two pair: 200
// Three: 300
// Straight: 400
// Flush: 500
// Full House: 600
// Four: 700
// Straight Flush: 800

const suit = ["♤", "♡", "♢", "♧"];
const cardNo = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function checkResult(cards){
    var flush = checkFlush(cards);
    var straight = checkStraight(cards);

    // Straight Flush
    if(flush > 0 && straight > 0)
        return 800 + straight;
    
    var dup = checkDuplicate(cards);

    // Four
    if(dup.type == 4) return 700 + dup.value;

    // Full House
    if(dup.type == 3.5) return 600 + dup.value;

    // Flush
    if(flush > 0) return 500 + flush;

    // Straight
    if(straight > 0) return 400 + straight;

    // Three
    if(dup.type == 3) return 300 + dup.value;

    // Two Pair
    if(dup.type == 2) return 200 + dup.value;

    // Pair
    if(dup.type == 1) return 100 + dup.value;

    // Highest card
    return 0 + dup.value;
}

// 0: none
// 1: pair
// 2: two pair
// 3: three
// 3.5: full house
// 4: four
function checkDuplicate(cards){
    var values = [];

    for(var i=0; i<cards.length; i++){
        values.push(cardNo.indexOf(cards[i].substring(0, cards[i].length-1)));
    }
    values = values.sort((a, b) => a - b);

    var set = new Set(values);
    var duplicate = values.length - set.size;
    var result = {
        type: duplicate,
        value: 0
    }
    
    if(duplicate == 0) result.value = getHighestCard(cards);
    else if(duplicate == 1){
        for(var i=0; i<values.length; i++){
            if(values.lastIndexOf(values[i]) != i){
                result.value = values[i];
                break;
            }
        }
    }
    else if(duplicate == 2){
        // Two pair: 2 2 3 3 4 OR 2 3 3 4 4 OR 2 2 3 4 4
        // Three: 2 2 2 3 4 OR 2 3 3 3 4 OR 2 3 4 4 4

        if(values.lastIndexOf(values[0]) == 2 || values.lastIndexOf(values[1]) == 3 || values.lastIndexOf(values[2]) == 4){
            result.type = 3;
            result.value = values[2];
        }
        else{
            result.type = 2;
            result.value = values[3];
        }
    }
    else{
        // four: 2 3 3 3 3 OR 5 5 5 5 6
        // full house: 2 2 3 3 3 OR 2 2 2 3 3

        if(values.lastIndexOf(values[0]) == 3 || values.lastIndexOf(values[1]) == 4){
            result.type = 4;
            result.value = values[2];
        }
        else{
            result.type = 3.5;
            result.value = values[2];
        }
    }

    return result;

    if(duplicate < 2) return duplicate;
    else if(duplicate == 2){
        // Two pair: 2 2 3 3 4 OR 2 3 3 4 4 OR 2 2 3 4 4
        // Three: 2 2 2 3 4 OR 2 3 3 3 4 OR 2 3 4 4 4

        if(values.lastIndexOf(values[0]) == 2 || values.lastIndexOf(values[1]) == 3 || values.lastIndexOf(values[2]) == 4)
            return 3;
        else return 2;
    }
    else{
        // four: 2 3 3 3 3 OR 5 5 5 5 6
        // full house: 2 2 3 3 3 OR 2 2 2 3 3

        if(values.lastIndexOf(values[0]) == 3 || values.lastIndexOf(values[1]) == 4)
            return 4;
        else return 3.5;
    }
}

// If flush then return highest card, otherwise return 0
function checkFlush(cards){
    const s = cards[0].substring(cards[0].length-1);
    for(var i=1; i<cards.length; i++){
        if(cards[i].substring(cards[i].length-1) != s)
            return 0;
    }

    var values = [];
    for(var i=0; i<cards.length; i++){
        values.push(cardNo.indexOf(cards[i].substring(0, cards[i].length-1)));
    }
    values = values.sort( (a, b) => a - b);

    return values[values.length-1];
}

//If straight then return the highest card, otherwise return 0
function checkStraight(cards){
    var values = [];

    for(var i=0; i<cards.length; i++){
        values.push(cardNo.indexOf(cards[i].substring(0, cards[i].length-1)));
    }

    values = values.sort( (a, b) => a - b);

    for(var i=1; i<values.length; i++){
        if(values[i] != values[i-1] + 1)
            return 0;
    }

    return values[values.length-1];
}

function getHighestCard(cards){
    var values = [];
    for(var i=0; i<cards.length; i++){
        values.push(cardNo.indexOf(cards[i].substring(0, cards[i].length-1)));
    }
    values = values.sort( (a, b) => a - b);
    return values[values.length-1];
}