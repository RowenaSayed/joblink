const buttons = document.querySelectorAll('.guide-btn');
const guides = document.querySelectorAll('.guide-content');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        guides.forEach(guide => guide.classList.add('d-none'));
        const target = button.getAttribute('data-guide');
        document.getElementById(`${target}Carousel`).classList.remove('d-none');
    });
});




