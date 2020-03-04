KPairs = (kNumber, arrOfNumbers) => {

    const pairsFound = [];
    const uniqueNumbers = {};

    arrOfNumbers.forEach(number => {
        if (!uniqueNumbers[number]) {
            return uniqueNumbers[number] = 1;
        }
    });

    for (key in uniqueNumbers) {
        const numberNeeded = kNumber - key;
        if (uniqueNumbers.hasOwnProperty(numberNeeded)) {
            pairsFound.push([key,numberNeeded.toString()]);
        } 
    }
    return pairsFound
}

KPairs(10, [2,4,5,6,3,2,56,2,4,2,1]);


