function saveLetter() {
    var txt = $("#txtLetter").val();
    var letter = {
        message: txt
    };
    var result = $.ajax({
        url: "/api/createLetter",
        method: "POST",
        data: letter
    });
}

function focusTextArea() {
    $('#txtLetter').focus();
}

// found this online. This allows using TAB key in text area
$(document).delegate('#txtLetter', 'keydown', function (e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode == 9) {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        $(this).val($(this).val().substring(0, start)
            + "\t"
            + $(this).val().substring(end));

        // put caret at right position again
        this.selectionStart =
            this.selectionEnd = start + 1;
    }
});

//this will stop users from typing past 10 lines
$("textarea").on('keydown keypress keyup', function (e) {
    if (e.keyCode == 8 || e.keyCode == 46) {
        return true;
    }
    var maxRowCount = 10;
    var lineCount = $(this).val().split('\n').length;
    if (e.keyCode == 13) {
        if (lineCount == maxRowCount) {
            return false;
        }
    }
    var jsElement = $(this)[0];
    if (jsElement.clientHeight < jsElement.scrollHeight) {
        var text = $(this).val();
        text = text.slice(0, -1);
        $(this).val(text);
        return false;
    }

});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imguploaded')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

//the variable and functions below deal with user dragging the uploaded image
//in order to resize it, if necessary
let startX;

handleDragStart = function (event) {
    startX = event.x;
}

handleDrag = function (event) {
    if (event.clientX > 0 && event.clientY > 0) {
        event.srcElement.style.width = event.srcElement.clientWidth + (event.clientX - startX) + "px";
        startX = event.clientX;
    }
}