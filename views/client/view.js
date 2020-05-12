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
            $('#btnRespond').css('invisble');
            return;
        }
        displayLetter(letter);
    });
}

function showNextLetter() {
    switchTextArea(false);

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

function switchTextArea(respond) {
    if (respond) {
        $('#btnSaveResponse').removeClass('invisible');
        $('#txtLetter').val('');
        $('#txtLetter').removeAttr('readonly');
        $('#txtLetter').focus();
        $('#imgletter').attr('onclick', 'focusTextArea()');
    }
    else {
        $('#btnSaveResponse').addClass('invisible');
        $('#txtLetter').attr('readonly', true);
        $('#imgletter').removeAttr('onclick');
    }
}

function respondToLetter() {
    let currentText = $('#txtLetter').val();
    switchTextArea(true);
}

function focusTextArea() {
    $('#txtLetter').focus();
}

function saveResponse() {
    let currentText = $('#txtLetter').val();

    var letter = {
        message: currentText,
        letterid: currentLetterId
    };
    $.ajax({
        url: "/api/createResponse",
        method: "POST",
        data: letter
    });
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