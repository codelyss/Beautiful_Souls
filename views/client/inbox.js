let maxInboxLetterCount = 40;
let currentResponseId;
let currentLetterId;
let currentUserId;

var modal = document.getElementById("myModal");

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function getAssociatedLetters() {
    // this is retrieving letters that other users wrote, that I responded to.
    $.ajax({
        url: '/api/viewAssociatedLetters',
        type: 'GET'
    }).then(letters => {
        // todo add check if there are any letters
        letters.forEach(letter => {

            let letterContent = letter.message.substring(0, maxInboxLetterCount);
            letterContent += "...";
            let strongusername = '<strong>From: ' + letter.username + '</strong>';

            $('<div />', { "class": "tooltip"}).append(
                $('<span />', {"class": "tooltiptext", html: letter.message})
            ).append(
                $('<div />', { "class": "inboxletter" }).append(
                    $('<div />', { html: strongusername })
                ).append(
                    $('<div />', { html: letterContent })
                ).click(function () {
                    let userid = letter.UserId;
                    currentUserId = userid;
                    let letterid = letter.id;
                    $.ajax({
                        url: '/api/viewRecentResponse/' + userid + '/' + letterid,
                        type: 'GET'
                    }).then(result => {
                        displayResponse(result);
                    });
                })
            ).appendTo('#divMailbox');
        });
    });
}

function getMyLettersWithResponses() {
    //this is retrieving my letters that other users responded to
    $.ajax({
        url: '/api/viewMyLettersWithResponses',
        type: 'GET'
    }).then(letters => {
        // to do add check if there are any letters
        letters.forEach(letter => {
            let letterContent = letter.message.substring(0, maxInboxLetterCount);
            letterContent += "...";
            let strongusername = '<strong>From: ' + letter.username + '</strong>';

            $('<div />', { "class": "tooltip"}).append(
                $('<span />', {"class": "tooltiptext", html: letter.message})
            ).append(
                $('<div />', { "class": "inboxletter" }).append(
                    $('<div />', { html: strongusername })
                ).append(
                    $('<div />', { html: letterContent })
                ).click(function () {
                    let userid = letter.ResponseUserId;
                    currentUserId = userid;
                    let letterid = letter.id;
                    
                    $.ajax({
                        url: '/api/viewRecentResponse/' + userid + '/' + letterid,
                        type: 'GET'
                    }).then(result => {
                        displayResponse(result);
                    });
                })
            ).appendTo('#divMailbox');
        });
    });
}

let currentChar;
let currentMessage;
function displayResponse(response) {
    $('#divLetter').removeClass('invisible');
    $('#txtLetter').val('');
    currentResponseId = response.id;
    currentLetterId = response.LetterId;
    currentMessage = response.message;
    currentChar = 0;
    window.setTimeout(showNextCharacter, 20);
}

function showNextCharacter() {
    if (currentChar > currentMessage.length) {return;}
    let curmsg = $('#txtLetter').val();
    curmsg += currentMessage[currentChar];
    $('#txtLetter').val(curmsg);
    if(currentChar < currentMessage.length -1) {
        currentChar++;
        window.setTimeout(showNextCharacter, 20);
    }
}

function respondAgain() {
    currentChar = Number.MAX_SAFE_INTEGER;
    switchTextArea(true);
}

function focusTextArea() {
    $('#txtLetter').focus();
}

function showPreviousResponse() {
    switchTextArea(false);

    $.ajax({
        url: '/api/viewPreviousResponse/' + currentLetterId + '/' + currentResponseId + '/' + currentUserId,
        type: 'GET'
    }).then(response => {
        if (response == null) {
            return;
        }
        displayResponse(response);
    });
}

function showNextResponse() {
    switchTextArea(false);

    $.ajax({
        url: '/api/viewNextResponse/' + currentLetterId + '/' + currentResponseId + '/' + currentUserId,
        type: 'GET'
    }).then(response => {
        if (response == null) {
            return;
        }
        displayResponse(response);
    });
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

function saveResponse() {
    //alert('response id is ' + currentResponseId + ' and letter id is ' + currentLetterId);
    let msgtext = $('#txtLetter').val();
    let letter = {
        message: msgtext,
        letterid: currentLetterId
    };
    $.ajax({
        url: '/api/createResponse',
        type: 'POST',
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