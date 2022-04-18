document.querySelectorAll('.form-item__input').forEach(element => {
    element.addEventListener('focusin', e => {
        e.target.closest('.form-item').classList.add('form-item--active');
    });
});

document.querySelectorAll('.form-item__input').forEach(element => {
    element.addEventListener('focusout', e => {
        e.target.closest('.form-item').classList.remove('form-item--active');
    });
});