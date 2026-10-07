document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const strengthBar = document.getElementById('strengthBar');
    const strengthMeter = document.querySelector('.strength-meter-container');
    const strengthText = document.getElementById('strengthText');
    const feedbackText = document.getElementById('feedbackText');
    const feedbackBanner = document.getElementById('feedbackBanner');

    // Requirements elements
    const reqLength = document.getElementById('reqLength');
    const reqUpper = document.getElementById('reqUpper');
    const reqLower = document.getElementById('reqLower');
    const reqNumber = document.getElementById('reqNumber');
    const reqSpecial = document.getElementById('reqSpecial');

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const isVisible = type === 'text';
        togglePassword.setAttribute('aria-label', isVisible ? 'Hide password' : 'Show password');
        togglePassword.setAttribute('aria-pressed', String(isVisible));

        if (isVisible) {
            eyeIcon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
        } else {
            eyeIcon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    });

    // Live validation listener
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        evaluatePassword(password);
    });

    function evaluatePassword(password) {
        if (!password) {
            resetUI();
            return;
        }

        // Check individual criteria
        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        // Update UI checklist states
        updateRequirementItem(reqLength, hasLength);
        updateRequirementItem(reqUpper, hasUpper);
        updateRequirementItem(reqLower, hasLower);
        updateRequirementItem(reqNumber, hasNumber);
        updateRequirementItem(reqSpecial, hasSpecial);

        // Calculate score
        let score = 0;
        if (hasLength) score++;
        if (hasUpper) score++;
        if (hasLower) score++;
        if (hasNumber) score++;
        if (hasSpecial) score++;

        // Bonus for length > 12
        if (password.length >= 12 && score === 5) {
            score = 6;
        }

        updateStrengthDisplay(score, { hasLength, hasUpper, hasLower, hasNumber, hasSpecial });
    }

    function updateRequirementItem(element, isCompleted) {
        if (isCompleted) {
            element.classList.add('completed');
        } else {
            element.classList.remove('completed');
        }
    }

    function updateStrengthDisplay(score, checks) {
        let width = '0%';
        let color = 'var(--color-empty)';
        let text = '—';
        let feedback = '';

        switch (score) {
            case 1:
            case 2:
                width = '25%';
                color = 'var(--color-weak)';
                text = 'Weak';
                break;
            case 3:
                width = '50%';
                color = 'var(--color-medium)';
                text = 'Medium';
                break;
            case 4:
                width = '75%';
                color = 'var(--color-strong)';
                text = 'Strong';
                break;
            case 5:
            case 6:
                width = '100%';
                color = 'var(--color-very-strong)';
                text = 'Very Strong';
                break;
            default:
                width = '0%';
                color = 'var(--color-empty)';
                text = '—';
        }

        // Generate contextual feedback
        if (!checks.hasLength) {
            feedback = 'Use at least 8 characters.';
            feedbackBanner.style.borderLeftColor = 'var(--color-weak)';
        } else if (!checks.hasUpper) {
            feedback = 'Add an uppercase letter for better complexity.';
            feedbackBanner.style.borderLeftColor = 'var(--color-medium)';
        } else if (!checks.hasLower) {
            feedback = 'Add a lowercase letter.';
            feedbackBanner.style.borderLeftColor = 'var(--color-medium)';
        } else if (!checks.hasNumber) {
            feedback = 'Add a number to strengthen your password.';
            feedbackBanner.style.borderLeftColor = 'var(--color-medium)';
        } else if (!checks.hasSpecial) {
            feedback = 'Include a special character (e.g., @, #, $).';
            feedbackBanner.style.borderLeftColor = 'var(--color-medium)';
        } else {
            feedback = 'Excellent! Your password looks solid and secure.';
            feedbackBanner.style.borderLeftColor = 'var(--color-strong)';
        }

        strengthBar.style.width = width;
        strengthBar.style.backgroundColor = color;
        strengthMeter.setAttribute('aria-valuenow', String(parseInt(width, 10)));
        strengthText.textContent = text;
        strengthText.style.color = score > 0 ? color : 'var(--text-primary)';
        feedbackText.textContent = feedback;
    }

    function resetUI() {
        strengthBar.style.width = '0%';
        strengthBar.style.backgroundColor = 'var(--color-empty)';
        strengthMeter.setAttribute('aria-valuenow', '0');
        strengthText.textContent = '—';
        strengthText.style.color = 'var(--text-primary)';
        feedbackText.textContent = 'Enter a password to begin';
        feedbackBanner.style.borderLeftColor = 'var(--text-muted)';

        [reqLength, reqUpper, reqLower, reqNumber, reqSpecial].forEach(el => {
            el.classList.remove('completed');
        });
    }
});
