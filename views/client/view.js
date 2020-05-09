let currentLetterId;

function showLetters() {
    $.ajax({
        url: '/api/viewRecentLetter',
        type: 'GET'
    }).then(letter => {
        if (letter == '') {
            //show message to user that there aren't any letters to show.
            //and disable next button
            $('#btnNextLetter').prop('disabled', true);
            return;
        }

        displayLetter(letter);
    });
}

function showNextLetter() {
    $.ajax({
        url: '/api/viewNextLetter/' + currentLetterId,
        type: 'GET'
    }).then(letter => {
        if (letter == null) {
            return;
        }

        displayLetter(letter);
    });
}

function displayLetter(letter) {
    currentLetterId = letter.id;
    let message = letter.message;
    $('#txtLetter').val(message);
}




showLetters();




// function showLetters() {
//     $.ajax({
//         url: '/api/viewRecentLetter',
//         type: 'GET'
//     }).then(letters => {
//         letters.forEach(letter => {
//             $('<div />', {
//                 html: letter.message,
//             }).click(function () {
//                 alert(letter.id);
//             }).appendTo('#divLetters');
//         });
//     });
// }