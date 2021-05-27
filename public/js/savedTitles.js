let googleUser;

window.onload = (event) => {
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUser = user;
            getNotes();
        }
    });
};

const getNotes = () => {
    const ref = firebase.database().ref(`users/${googleUser.uid}`);
    ref.on('value', (snapshot) => {
        const data = snapshot.val();
        renderDataAsHtml(data);
    });
};

const renderDataAsHtml = (data) => {
    let titles = ``;
    for (const key in data) {
        const title = data[key].title;
        titles += createTitle(title);
    };
    document.querySelector('#titles').innerHTML = titles;
};

const createTitle = (title) => {
    const titleHTML = `
        <div class="saved-title title">
            ${title}
        </div>
    `;
    return titleHTML;
}