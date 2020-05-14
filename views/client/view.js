let currentLetterId;

var modal = document.getElementById("myModal");

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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

function showPreviousLetter() {
    switchTextArea(false);

    $.ajax({
        url: '/api/viewPreviousLetter/' + currentLetterId,
        type: 'GET'
    }).then(letter => {
        if (letter == null) {
            return;
        }
        displayLetter(letter);
    });
}

let currentChar;
let currentMessage;
function displayLetter(letter) {
    $('#txtLetter').val('');
    currentLetterId = letter.id;
    currentMessage = letter.message;
    currentChar = 0;
    window.setTimeout(showNextCharacter, 20);
}

function showNextCharacter() {
    if (currentChar > currentMessage.length) {return;}
    let curmsg = $('#txtLetter').val();
    curmsg += currentMessage[currentChar];
    $('#txtLetter').val(curmsg);
    if (currentChar < currentMessage.length -1){
        currentChar++;
        window.setTimeout(showNextCharacter, 20);
    }
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
    currentChar = Number.MAX_SAFE_INTEGER;
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
    $('#txtLetter').val('');
    switchTextArea(false);

    modal.style.display = "block";
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
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