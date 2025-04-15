document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    const chatBtn = document.getElementById('chat-btn');
    const chatContainer = document.getElementById('chatbot-container');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-message');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chatbot-messages');

    chatBtn.addEventListener('click', function () {
        chatContainer.classList.toggle('active');
    });

    closeChat.addEventListener('click', function () {
        chatContainer.classList.remove('active');
    });

    const localAttractions = [
        {
            name: "Historic Downtown",
            description: "Explore the charming streets of our historic downtown with architecture dating back to the 1800s.",
            image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
            category: "landmark",
            rating: 4.8,
            price: "Free",
            link: "https://example.com/historic-downtown"
        },
        {
            name: "City Art Museum",
            description: "Our world-class art museum features collections from local and international artists.",
            image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
            category: "museum",
            rating: 4.7,
            price: "$15",
            link: "https://example.com/art-museum"
        },
        {
            name: "Riverside Park",
            description: "A beautiful park along the river with walking trails, picnic areas, and playgrounds.",
            image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
            category: "park",
            rating: 4.6,
            price: "Free",
            link: "https://example.com/riverside-park"
        },
        {
            name: "Local Food Market",
            description: "Experience the flavors of our city at this vibrant food market with local vendors.",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947",
            category: "food",
            rating: 4.9,
            price: "Varies",
            link: "https://example.com/food-market"
        },
        {
            name: "Botanical Gardens",
            description: "Stunning gardens featuring plants from around the world in beautifully designed landscapes.",
            image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
            category: "garden",
            rating: 4.8,
            price: "$10",
            link: "https://example.com/botanical-gardens"
        },
        {
            name: "City View Tower",
            description: "Get a panoramic view of the entire city from our iconic observation tower.",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
            category: "landmark",
            rating: 4.5,
            price: "$12",
            link: "https://example.com/city-tower"
        }
    ];

    function loadAttractions() {
        const attractionGrid = document.querySelector('.attraction-grid');
        if (!attractionGrid) return;
        attractionGrid.innerHTML = '';

        localAttractions.forEach(attraction => {
            const attractionCard = document.createElement('div');
            attractionCard.className = 'attraction-card';
            attractionCard.innerHTML = `
                <div class="attraction-img">
                    <img src="${attraction.image}" alt="${attraction.name}">
                </div>
                <div class="attraction-info">
                    <h3>${attraction.name}</h3>
                    <p>${attraction.description}</p>
                    <div class="attraction-meta">
                        <span><i class="fas fa-star"></i> ${attraction.rating}</span>
                        <span><i class="fas fa-tag"></i> ${attraction.price}</span>
                    </div>
                    <a href="${attraction.link}" target="_blank" class="btn primary">Learn More</a>
                </div>
            `;
            attractionGrid.appendChild(attractionCard);
        });
    }

    loadAttractions();

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage(message, 'user');
        userInput.value = '';

        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'bot-message';
        typingIndicator.innerHTML = '<p>Typing...</p>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            chatMessages.removeChild(typingIndicator);
            getBotResponse(message);
        }, 1000);
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('quick-reply')) {
            const reply = e.target.getAttribute('data-reply');
            addMessage(reply, 'user');

            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'bot-message';
            typingIndicator.innerHTML = '<p>Typing...</p>';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                chatMessages.removeChild(typingIndicator);
                getBotResponse(reply);
            }, 1000);
        }
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addQuickReplies(replies) {
        const quickReplyContainer = document.createElement('div');
        quickReplyContainer.className = 'quick-replies';

        replies.forEach(reply => {
            const button = document.createElement('button');
            button.className = 'quick-reply';
            button.setAttribute('data-reply', reply);
            button.textContent = reply;
            quickReplyContainer.appendChild(button);
        });

        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.appendChild(quickReplyContainer);
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function getBotResponse(userMessage) {
        const apiKey = 'AIzaSyAFD9B59Zz8l39Liwl7NdyFUo76YgsGt4Y'; // Replace this with a valid API key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a friendly local guide...`
                        }]
                    }]
                })
            });

            const data = await response.json();

            if (data.candidates && data.candidates[0].content.parts[0].text) {
                const botResponse = data.candidates[0].content.parts[0].text;
                addMessage(botResponse, 'bot');
                addQuickReplies([
                    'What are the top attractions?',
                    'Where can I find good restaurants?',
                    'What events are happening?'
                ]);
            } else {
                addMessage("Sorry, I couldn't process your request.", 'bot');
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage("I'm having trouble connecting to our guide service.", 'bot');
        }
    }

    if (chatMessages.children.length === 0) {
        addMessage("Hello! I'm your local guide assistant. How can I help you explore our city today?", 'bot');
        addQuickReplies([
            'What are the top attractions?',
            'Where can I find good restaurants?',
            'What events are happening this weekend?'
        ]);
    }

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('book-btn')) {
            e.preventDefault();
            const title = e.target.getAttribute('data-title');
            const price = e.target.getAttribute('data-price');
            const duration = e.target.getAttribute('data-duration');
            const desc = e.target.getAttribute('data-desc');

            alert(`🧾 Booking Tour: ${title}\n📅 Duration: ${duration}\n💲 Price: ${price}\n📌 Details: ${desc}`);
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('learn-btn')) {
            e.preventDefault();
            const title = e.target.getAttribute('data-title');
            const desc = e.target.getAttribute('data-desc');

            alert(`ℹ️ More About: ${title}\n\n${desc}`);
        }
    });
});
