
const showFeedback = (message, type) => {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback ${type}`;
};

const showLoading = (isLoading) => {
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = isLoading ? 'block' : 'none';
};


const toggleSubmitButton = (isDisabled) => {
    const submitButton = document.getElementById('submit-button');
    submitButton.disabled = isDisabled;
};

const sendFormData = async ({ userName, userEmail, userMessage }) => {
    showLoading(true);
    toggleSubmitButton(true);
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                message: userMessage
            }),
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        showFeedback('Datos enviados correctamente!', 'success');
        console.log('Datos enviados:', data);
    } catch (error) {
        console.error('Error al enviar datos:', error);
        showFeedback('Hubo un problema al enviar los datos.', 'error');
    } finally {
        showLoading(false);
        toggleSubmitButton(false);
    }
};


const getFormData = () => {
    const userName = document.getElementById('nombre').value;
    const userEmail = document.getElementById('email').value;
    const userMessage = document.getElementById('mensaje').value;
    return { userName, userEmail, userMessage };
};


const storeFormData = ({ userName, userEmail, userMessage }) => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    storedData.push({ userName, userEmail, userMessage });
    localStorage.setItem('formData', JSON.stringify(storedData));
};

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const { userName, userEmail, userMessage } = getFormData();
    if (userName === '' || userEmail === '' || userMessage === '') {
        showFeedback('Por favor, completa todos los campos.', 'error');
    } else {
        storeFormData({ userName, userEmail, userMessage });
        sendFormData({ userName, userEmail, userMessage });
    }
});




