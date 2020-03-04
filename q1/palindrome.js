'use strict'

const isPalindrome =  (stringToCheck) => {
    const lowerCasedString = stringToCheck.toLowerCase();
    const reverseString = lowerCasedString.split('').reverse().join('');
    return reverseString === lowerCasedString;
}


isPalindrome('Rotator');
isPalindrome('palindrome');
