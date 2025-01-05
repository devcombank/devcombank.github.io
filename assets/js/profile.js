// Tab Navigation
document.querySelectorAll('.nav-item').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and tabs
        document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding tab
        const tabId = button.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

// Copy to clipboard function
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        navigator.clipboard.writeText(input.value).then(() => {
            // Show success feedback
            const originalIcon = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = originalIcon;
            }, 2000);
        });
    });
});

// Show/Hide API key
document.querySelectorAll('.show-btn').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        const icon = button.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Edit Profile Information
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', () => {
        const valueContainer = button.parentElement;
        const currentValue = valueContainer.querySelector('span').textContent;
        const input = document.createElement('input');
        input.value = currentValue;
        input.className = 'edit-input';
        
        const saveBtn = document.createElement('button');
        saveBtn.innerHTML = '<i class="fas fa-check"></i>';
        saveBtn.className = 'save-btn';
        
        valueContainer.innerHTML = '';
        valueContainer.appendChild(input);
        valueContainer.appendChild(saveBtn);
        
        input.focus();
        
        saveBtn.addEventListener('click', () => {
            const newValue = input.value;
            valueContainer.innerHTML = `
                <span>${newValue}</span>
                <button class="edit-btn"><i class="fas fa-pen"></i></button>
            `;
        });
    });
}); 