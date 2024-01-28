function checkPassword() {
    var password = document.getElementById('password').value;
    var resultElement = document.getElementById('result');

    // Make an AJAX request to the server to check the password strength
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/check_password', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            displayResult(response.is_strong, response.message, response.conditions);
        }
    };
    xhr.send('password=' + password);
}

function displayResult(isStrong, message, conditions) {
    var resultElement = document.getElementById('result');
    if (isStrong) {
        resultElement.innerHTML = message;
        resultElement.style.color = '#008000';
    } else {
        resultElement.innerHTML = message + '<br><ul>' + conditions.map(cond => '<li>' + cond + '</li>').join('') + '</ul>';
        resultElement.style.color = '#ff0000';
    }
}

function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');
    var togglePasswordButton = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordButton.innerHTML = '<img src="static/on.png">';
    } else {
        passwordInput.type = 'password';
        togglePasswordButton.innerHTML = '<img src="static/Off.png">';
    }
}
