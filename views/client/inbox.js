function getAssociatedLetters() {
    // this is retrieving letters that other users wrote, that I responded to.
    $.ajax({
        url: '/api/viewAssociatedLetters',
        type: 'GET'
    }).then(letters => {
        // todo add check if there are any letters
        letters.forEach(letter => {
            $('<div />', {
                html: letter.message
            }).appendTo('#divMailbox');
        });
    });
}

function getMyLettersWithResponses() {
    $.ajax({
        url: '/api/viewMyLettersWithResponses',
        type: 'GET'
    }).then(letters => {
        // to do add check if there are any letters
        letters.forEach(letter => {
            $('<div />', {
                html: letter.message + ' (' + letter.username + ')'
            }).click(function() {
                alert(letter.ResponseUserId);
            }).appendTo('#divMailbox');
        });
    });
}

getAssociatedLetters();
getMyLettersWithResponses();


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