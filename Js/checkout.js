document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTotal = document.getElementById('cart-total');
    const checkoutForm = document.getElementById('checkout-form');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');

    // Display cart total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);

    // Show/hide payment options
    paymentOptions.forEach(option => {
        option.addEventListener('change', () => {
            document.querySelectorAll('.payment-options').forEach(el => el.style.display = 'none');
            if (option.value === 'e-sewa') {
                document.getElementById('esewa-options').style.display = 'block';
            } else if (option.value === 'phone-pay') {
                document.getElementById('phonepay-options').style.display = 'block';
            }
        });
    });

    // Form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const address = document.getElementById('address').value.trim();
        const email = document.getElementById('email').value.trim();
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

        let isValid = true;

        if (!name) {
            document.getElementById('name-error').textContent = 'Name is required';
            isValid = false;
        }

        if (!contact) {
            document.getElementById('contact-error').textContent = 'Contact number is required';
            isValid = false;
        }

        if (!address) {
            document.getElementById('address-error').textContent = 'Address is required';
            isValid = false;
        }

        if (!email) {
            document.getElementById('email-error').textContent = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            document.getElementById('email-error').textContent = 'Invalid email format';
            isValid = false;
        }

        if (isValid) {
            // Process the order (in a real application, you would send this data to a server)
            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        }
    });
});