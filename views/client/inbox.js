let maxInboxLetterCount = 40;

function getAssociatedLetters() {
    // this is retrieving letters that other users wrote, that I responded to.
    $.ajax({
        url: '/api/viewAssociatedLetters',
        type: 'GET'
    }).then(letters => {
        // todo add check if there are any letters
        letters.forEach(letter => {

            let letterContent = letter.message.substring(0, maxInboxLetterCount);

            $('<div />', {"class": "inboxletter"}).append(
                $('<div />', {html: letter.username})
            ).append(
                $('<div />', {html: letterContent})
            ).appendTo('#divMailbox');
        });
    });
}

function getMyLettersWithResponses() {
    // this is NOT mapped to the letter model, because it has more data in it
    $.ajax({
        url: '/api/viewMyLettersWithResponses',
        type: 'GET'
    }).then(letters => {
        // to do add check if there are any letters
        letters.forEach(letter => {

            let letterContent = letter.message.substring(0, maxInboxLetterCount);

            $('<div />', {"class": "inboxletter"}).append(
                $('<div />', {html: letter.username})
            ).append(
                $('<div />', {html: letterContent})
            ).appendTo('#divMailbox');
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