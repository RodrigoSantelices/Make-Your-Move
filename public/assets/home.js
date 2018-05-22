
$(function () {
    $(`.log-out`).on('click', function () {
        localStorage.authToken = null;
        window.location.href="/"
    })
})
