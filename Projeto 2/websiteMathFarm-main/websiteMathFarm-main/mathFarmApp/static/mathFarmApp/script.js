let firstRandomNumber = generateRandomInteger(10);
let secondRandomNumber = generateRandomInteger(10);
console.log(firstRandomNumber)
console.log(secondRandomNumber)

String(operationType)
let result;
if (operationType === "soma") {
    console.log(operationType);
    result = firstRandomNumber + secondRandomNumber;
} else if(operationType === "subtracao") {
    console.log(operationType);
    result = firstRandomNumber - secondRandomNumber;
} else if(operationType === "multiplicacao") {
    console.log(operationType);
    result = firstRandomNumber * secondRandomNumber;    
} else {
    console.log(operationType)
    if(firstRandomNumber < secondRandomNumber) {
        let temp;
        temp = firstRandomNumber;
        firstRandomNumber = secondRandomNumber;
        secondRandomNumber = temp;
    }
    firstRandomNumber -= (firstRandomNumber % secondRandomNumber);
    result = (firstRandomNumber / secondRandomNumber);
}
console.log(result);
console.log(operationType);
console.log(verbOfOperation);
console.log(firstRandomNumber);
console.log(secondRandomNumber);

document.addEventListener('DOMContentLoaded', () => {
    console.log(String(user_points));
    document.querySelector('#current_score').innerHTML = "Sua pontuacao atual e " + String(user_points);
    let question = "Quanto e " + String(firstRandomNumber) + " " + String(verbOfOperation) + " " + String(secondRandomNumber) + "?";
    document.querySelector('#question').innerHTML = question;
    document.querySelector('#answer_form').onsubmit = () => {
        const answer = document.querySelector('#answer').value;
        console.log(answer);
        console.log(result);
        if(Number(answer) === result) {
            console.log('CORRECT');
            document.querySelector('#incorrect_alert').classList.add('d-none');
            document.querySelector('#correct_alert').classList.remove('d-none');
            document.querySelector('#score').value = "point";
            console.log(document.querySelector('#score'));
        } else {
            console.log('INCORRECT');
            document.querySelector('#correct_alert').classList.add('d-none');
            document.querySelector('#incorrect_alert').classList.remove('d-none');
        }
    

        // stop form from submitting
        // return false;
    }
})