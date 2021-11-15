// initialization
// - find revalent section

import { updateNav } from './app.js';
import { showView } from './dom.js';
import { showHome } from './home.js';

// - detach section from DOM
const section = document.getElementById('form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);
section.remove();

// display logic
export function showLogin() {
    showView(section);
}

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken
        }))

        // clear form
        form.reset();
        updateNav();
        showHome();
    } catch (err) {
        alert(err.message)
    }
}