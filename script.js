class Smoothie {
    constructor(name, size, ingredients, specialRequest) {
        this.name = name;
        this.size = size;
        this.ingredients = ingredients;
        this.specialRequest = specialRequest;
        this.basePrice = 3.00; // Base price for the smoothie
        this.ingredientPrice = 1.50; // Price per ingredient
    }

    calculatePrice() {
        return (this.basePrice + this.ingredients.length * this.ingredientPrice).toFixed(2);
    }

    getDescription() {
        return `
            <h2>Order Summary</h2>
            <p><strong>Name:</strong> ${this.name}</p>
            <p><strong>Size:</strong> ${this.size}</p>
            <p><strong>Ingredients:</strong> ${this.ingredients.join(', ')}</p>
            <p><strong>Special Request:</strong> ${this.specialRequest || "None"}</p>
            <p><strong>Total Price:</strong> $${this.calculatePrice()}</p>
        `;
    }

    getImage() {
        const ingredientImages = {
            'Strawberry': 'images/strawberry-smoothie.jpg',
            'Banana': 'images/banana-smoothie.jpg',
            'Mango': 'images/mango-smoothie.jpg',
            'Blueberry': 'images/blueberry-smoothie.jpg',
            'Spinach': 'images/spinach-smoothie.jpg'
        };

        // Default image if no match is found
        let imageUrl = 'images/default-smoothie.jpg';

        // Determine the image based on the first matching ingredient
        for (const ingredient of this.ingredients) {
            if (ingredientImages[ingredient]) {
                imageUrl = ingredientImages[ingredient];
                break;
            }
        }

        return imageUrl;
    }
}

function updateSmoothieImage(ingredients) {
    const imageContainer = document.getElementById("smoothie-image");
    imageContainer.innerHTML = ''; // Clear any existing image

    if (ingredients.length > 0) {
        const smoothie = new Smoothie('', '', ingredients, '');
        const img = document.createElement("img");
        img.src = smoothie.getImage();
        img.alt = "Smoothie Image";
        img.style.width = '300px'; // Optional styling for the image
        img.style.borderRadius = '10px';
        img.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        imageContainer.appendChild(img);
    }
}

document.getElementById("order-button").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const size = document.getElementById("size").value;
    const ingredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(el => el.value);
    const specialRequest = document.getElementById("special-request").value;

    if (name && size && ingredients.length > 0) {
        const smoothie = new Smoothie(name, size, ingredients, specialRequest);
        const summary = document.getElementById("order-summary");
        summary.innerHTML = smoothie.getDescription();
        summary.style.display = "block";

        updateSmoothieImage(ingredients);
    } else {
        alert("Please complete the form before submitting!");
    }
});
