function showLetters() {
    $.ajax({
        url: '/api/viewLetters',
        type: 'GET'
    }).then(letters => {
        letters.forEach(letter => {
            $('<div />', {
                html: letter.message,
            }).click(function () {
                alert(letter.id);
            }).appendTo('#divLetters');
        });
    });
}

showLetters();
