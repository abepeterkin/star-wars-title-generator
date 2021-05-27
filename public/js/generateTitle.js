let googleUser;

const signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            const err = {
                errorCode,
                errorMessage,
                email,
                credential
            };
            console.log(err);
        });
}

window.onload = (event) => {
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            googleUser = user;
            hideSignInButton();
            showSavedTitlesLink();
            const title = document.querySelector('#generated-title').innerHTML;
            if (title) {
                showSaveButton();
            }
        }
    });
};

function hideSignInButton() {
    const element = document.querySelector('#sign-in-button-container');
    element.innerHTML = '';
}

function showSavedTitlesLink() {
    const elementHTML = `
        <a href="savedTitles.html">
            <button class="button button has-text-weight-medium is-medium is-centered">
                View your saved titles
            </button>
        </a>
    `;
    const element = document.querySelector('#saved-title-link-container');
    element.innerHTML = elementHTML;
}

function showSaveButton() {
    if (googleUser) {
        const elementHTML = `
            <button class="button button has-text-weight-medium is-medium is-centered" id="save-button" onclick="saveTitle()">
                Save this title
            </button>
        `;
        const element = document.querySelector('#save-button-container');
        element.innerHTML = elementHTML;
    }
}

function saveTitle() {
    const button = document.querySelector('#save-button');
    button.setAttribute('disabled', true);
    const title = document.querySelector('#generated-title').innerHTML;
    if (title) {
        firebase.database().ref(`users/${googleUser.uid}`).push({
            title,
        }).then(() => {
            button.innerHTML = "Saved!";
        }).catch((error) => {
            console.log(error);
            button.setAttribute('disabled', false);
        });
    }

}

function generateTitle() {
    const numeral = getRandomArrayElement(numerals);
    const subtitleTemplate = getRandomArrayElement(subtitleTemplates);
    const subject = getRandomArrayElement(subtitleSubjects);
    const subtitle = subtitleTemplate.replace('#', subject);
    const title = `Episode ${numeral} - ${subtitle}`;
    const titleElement = document.querySelector('#generated-title');
    titleElement.innerHTML = title;
    showSaveButton();
}

function getRandomArrayElement(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

const subtitleTemplates = [
    'Revenge of #',
    'Return of #',
    'The Rise of #',
    'Attack of #',
    '# Strikes Back',
    'Son of #',
    'Daughter of #',
    'The Search for #',
    'The Wrath of #',
    'The Fall of #',
];

const subtitleSubjects = [
    'The Sith',
    'The Jedi',
    'The Republic',
    'The Empire',
    'The Force',
    'The Dark Side',
    'The Light Side',
    'The Clones',
    'The Droids',
    'The Ewoks',
    'The Wookees',
    'The Death Star',
    'Han Solo',
    'Luke Skywalker',
    'Leia Organa',
    'Rey',
    'Finn',
    'Poe Dameron',
    'Lando Calrissian',
    'Obi-Wan Kenobi',
    'Mace Windu',
    'Darth Vader',
    'Palpatine',
    'Boba Fett',
    'Count Dooku',
    'Snoke',
    'Greedo',
    'Jabba the Hutt',
    'General Grevious',
    'Darth Maul',
    'Salacious B. Crumb',
    'Jar Jar Binks',
    'Chewbacca',
    'Yoda',
    'R2-D2',
    'C3-PO',
    'BB-8',
];

const numerals = [
    'X',
    'XI',
    'XII',
    'XIII',
    'XIV',
    'XV',
    'XVI',
    'XVII',
    'XVIII',
    'XIX',
    'XX',
    'XXI',
    'XXII',
    'XXIII',
    'XXIV',
    'XXV',
    'XXVI',
    'XXVII',
    'XXVIII',
    'XXIX',
    'XXX',
    'XXXI',
    'XXXII',
    'XXXIII',
    'XXXIV',
    'XXXVI',
    'XXXVII',
    'XXXVIII',
    'XXXIX',
    'XL',
    'XLI',
    'XLII',
    'XLIII',
    'XLIV',
    'XLV',
    'XLVI',
    'XLVII',
    'XLVIII',
    'XLIX',
    'L',
]
