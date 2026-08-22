// Click any photo box to upload your own image from your device.
document.querySelectorAll('.photo').forEach((photoBox) => {
    photoBox.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = photoBox.querySelector('img');
                const label = photoBox.querySelector('p');
                img.src = event.target.result;
                img.alt = 'Suspect photograph';
                if (label) label.style.display = 'none';
            };
            reader.readAsDataURL(file);
        };
        input.click();
    });
});
