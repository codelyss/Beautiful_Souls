function switchForm() {
    $('form').animate({ height: "toggle", opacity: "toggle" }, 550);
}

function checkParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const usernameTaken = urlParams.get('usernameTaken');
    const invalidpass = urlParams.get('invaliduser');
    if (usernameTaken) {
        switchForm();
        $('#usernametaken').removeClass('invisible');
    }
    else if (invalidpass) {
        $('#invaliduserpass').removeClass('invisible');
    }
}

checkParameters();