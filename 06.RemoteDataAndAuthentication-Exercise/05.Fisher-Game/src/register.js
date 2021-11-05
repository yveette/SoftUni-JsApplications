document.querySelectorAll('form')[0].addEventListener('submit', onRegister);

async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (email == '' || password == '' || rePass == '') {
        return alert('All field must be filled !');
    } else if (password != rePass) {
        return alert('Passwords don\'t match !');
    }

    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            return alert(error.message);
        }

        const data = await response.json();
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('ownerId', data._id);
        alert('Registered successfully !');
        window.location = '/index.html';
        event.target.reset();
    } catch (err) {
        alert(err.message);
    }

}

