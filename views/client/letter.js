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