var modal = document.getElementById("myModal");

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

    $('#txtLetter').val('');
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function focusTextArea() {
    $('#txtLetter').focus();
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             $('#imguploaded')
//                 .attr('src', e.target.result);
//         };

//         reader.readAsDataURL(input.files[0]);
//     }
// }

//the variable and functions below deal with user dragging the uploaded image
//in order to resize it, if necessary
// let startX;

// handleDragStart = function (event) {
//     startX = event.x;
// }

// handleDrag = function (event) {
//     if (event.clientX > 0 && event.clientY > 0) {
//         event.srcElement.style.width = event.srcElement.clientWidth + (event.clientX - startX) + "px";
//         startX = event.clientX;
//     }
// }