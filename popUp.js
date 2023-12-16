var isMobile = window.innerWidth < 600;

function showPopup() {
    // CSS styles
    var style = document.createElement('style');
    style.textContent = `
    .outerBox {
        width: 100%;
        max-width: 80vw;
        height: 100%;
        max-height: 80vh;
        box-sizing: border-box;
        background-color: gray;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2%;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        // position: relative; /* Added for positioning */
    }

    .innerBox {
        width: 80%;
        height: 80%;
        background-color: yellow;
        border-radius: 5px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative; /* Added for positioning */
    }

    .formImageContainer {
        padding: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:-webkit-fill-available;
    }

    .closeButton {
        background-color: cornsilk;
        color: #0b0a0a;
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .formContainer {
        padding: 20px;
    }

    .formInput {
        padding: 10px;
        border: 1px solid black;
        margin: 10px 10px 10px 0px;
        width: -webkit-fill-available;
    }

    .formCheckbox {
        margin-bottom: 10px;
    }

    .formButton {
        width: -webkit-fill-available;
        margin: 10%;
        background-color: black;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .formButton:hover {
        background-color: #45a049;
    }

    .privacyLink {
        color: blue;
    }

    .formImage {
        width: 40%;
        height: auto;
    }

    /* Media Query for smaller screens (e.g., mobile devices) */
    @media only screen and (max-width: 768px) {
        .formImage {
            display: none; /* Hide the image on smaller screens */
        }
    }
`;

    document.head.appendChild(style);

    // HTML content
    var combinedHTML = `
    <div class="outerBox">
        <div class="innerBox">
            <div class="formImageContainer">
                <div class="formContainer">
                    <h1>Welcome to our website!</h1>
                    <p>Please fill out the form below:</p>

                    <form id="lowerForm">
                        <input type="text" id="userName" name="userName" class="formInput" placeholder="Your name">
                        <br>

                        <input type="email" id="userEmail" name="userEmail" class="formInput" placeholder="Your email address">
                        <br>

                        <input type="checkbox" id="agreeCheckbox" name="agreeCheckbox" class="formCheckbox">
                        <label for="agreeCheckbox" class="checkboxLabel">I agree to the terms and conditions</label>
                        <br>

                        <button type="submit" class="formButton" onclick="submitForm()">Sign Up</button>
                    </form>

                    <p>By signing up, you agree to our <a href="#" id="privacyLink" class="privacyLink">privacy policy</a>.</p>
                </div>
                <img src="https://t4.ftcdn.net/jpg/04/65/12/75/360_F_465127589_BfwtgftgEboy01GSVVQZP5hC9XJGXTO1.jpg" alt="Image" class="formImage">
                <button class="closeButton" onclick="closePopup()">X</button>
            </div>
        </div>
    </div>
`;

    // Append the HTML content to the body
    document.body.innerHTML += combinedHTML;
}

function createCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

// Function to read a cookie
function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function submitForm() {
    var name = document.getElementById('userName').value;
    var email = document.getElementById('userEmail').value;  // Corrected typo here
    var checkbox = document.getElementById('agreeCheckbox').checked;  // Corrected id here

    if (email === '' || name === '' || !checkbox) {
        alert('Error: Email, name, and checkbox are required.');  // Adjusted the error message
        return;
    }

    // Successful submission
    createCookie('successfulSubmission', 'true', 1);

    // Close the popup
    closePopup();
}


function closePopup() {
    // Set the close cookie
    createCookie('popupClosed', 'true', 1);

    // Close the popup
    document.querySelector('.outerBox').style.display = 'none';
}

// document.addEventListener('DOMContentLoaded', 
(function () {
    var closeCookie = readCookie('popupClosed');
    var submissionCookie = readCookie('successfulSubmission');

    if (closeCookie || submissionCookie) {
        // Do not show the popup if the close or submission cookie is present
        return;
    }

    // Show popup after 5 seconds on mobile
    if (isMobile) {
        setTimeout(showPopup, 5000);
    }

    // Exit intent popup on desktop
    document.addEventListener('mouseleave', function (event) {
        if (!event.clientY && !closeCookie && !submissionCookie) {
            showPopup();
        }
    });
})();
