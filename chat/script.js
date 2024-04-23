const supabaseUrl = 'https://rxfmhcthjvhwdfkawpwu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4Zm1oY3RoanZod2Rma2F3cHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4ODA1MTUsImV4cCI6MjAyOTQ1NjUxNX0.Yw-Z6ICStORd-shD9UPAXE56EUQ10J6uKIqAwEfjknA';
const { createClient } = supabase;
const _supabase = createClient(supabaseUrl, supabaseKey);

let username = localStorage.getItem('username');
let intervalId;
let isCooldown = false;
let inappropriateWords = [];

// Function to download inappropriate words list from URL
async function downloadInappropriateWords() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/master/en');
        if (!response.ok) {
            throw new Error('Failed to download inappropriate words list');
        }
        const words = await response.text();
        inappropriateWords = words.trim().split('\n');
        // Additional inappropriate words
        inappropriateWords.push('memk','mmk','kontl','kntl', 'Anjing', 'Babi', 'Kunyuk', 'Bajingan', 'Asu', 'Bangsat', 'Kampret', 'Kontol', 'Memek', 'Ngentot', 'Pentil', 'Perek', 'Pepek', 'Pecun', 'Bencong', 'Banci', 'Maho', 'Gila', 'Sinting', 'Tolol', 'Sarap', 'Setan', 'Lonte', 'Hencet', 'Taptei', 'Kampang', 'Pilat', 'Keparat', 'Bejad', 'Gembel', 'Brengsek', 'Tai', 'Anjrit', 'Fuck', 'Tetek', 'Ngulum', 'Jembut', 'Totong', 'Kolop', 'Pukimak', 'Bodat', 'Heang', 'Jancuk', 'Burit', 'Titit', 'Nenen', 'Bejat', 'Silit', 'Sempak', 'Fucking', 'Asshole', 'Bitch', 'Penis', 'Vagina', 'Klitoris', 'Kelentit', 'Borjong', 'Dancuk', 'Pantek', 'Taek', 'Itil', 'Teho', 'Pantat', 'Bagudung', 'Babami', 'Kanciang', 'Bungul', 'Idiot', 'Kimak', 'Henceut', 'Kacuk', 'Blowjob', 'Pussy', 'Dick', 'Damn', 'Ass');
        console.log('Inappropriate words loaded:', inappropriateWords);
    } catch (error) {
        console.error(error);
    }
}

async function loadChat() {
    const { data, error } = await _supabase.from('chat').select('*').order('created_at');

    if (error) {
        console.error(error);
        return;
    }

    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = '';

    data.forEach(chat => {
        const div = document.createElement('div');
        const message = sensorMessage(chat.message);
        div.textContent = `${chat.username}: ${message} (${new Date(chat.created_at).toLocaleString()})`;
        chatContainer.appendChild(div);
    });

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
    if (isCooldown) {
        toastr.info(`Please wait for the cooldown to finish.`);
        return; // If cooldown is active, exit the function
    }

    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    if (!username || !message) {
        alert('Please enter your name and message.');
        return;
    }

    // Disable the send button during cooldown
    const sendButton = document.querySelector('#message-section button');
    sendButton.disabled = true;

    // Set cooldown state to true
    isCooldown = true;

    const { error } = await _supabase.from('chat').insert([{ username, message }]);

    if (error) {
        console.error(error);
        return;
    }

    document.getElementById('message').value = '';
    loadChat();

    // Start cooldown timer (4 seconds)
    let cooldownTime = 5; // Cooldown time in seconds
    const cooldownInterval = setInterval(() => {
        cooldownTime--;
        if (cooldownTime > 0) {
            toastr.info(`Cooldown: ${cooldownTime} seconds remaining`, '', { timeOut: 1000 });
        } else {
            // Enable the send button after cooldown
            sendButton.disabled = false;
            // Reset cooldown state
            isCooldown = false;
            // Clear the interval
            clearInterval(cooldownInterval);
        }
    }, 1000);
}

function enterUsername() {
    Swal.fire({
        title: 'Enter Your Name',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Start Chat',
        preConfirm: (name) => {
            if (!name) {
                Swal.showValidationMessage('Please enter your name');
            }
            return name;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            username = result.value;
            localStorage.setItem('username', username);
            const userCount = localStorage.getItem('userCount') ? parseInt(localStorage.getItem('userCount')) : 0;
            localStorage.setItem('userCount', userCount + 1);

            // Update the status text
            const statusElement = document.getElementById('status');
            const userCountText = localStorage.getItem('userCount') + (localStorage.getItem('userCount') === '1' ? ' orang' : ' orang');
            statusElement.textContent = userCountText + ' yang sudah punya nama';

            document.getElementById('username').value = username;
            document.getElementById('username').setAttribute('readonly', true);
            document.getElementById('message-section').style.display = 'flex';
            document.getElementById('start-button').style.display = 'none';
            document.getElementById('message').focus();
            toastr.error('Jangan Toxic ya <3', null, { timeOut: 30000 }); // Hide after 30 seconds
            loadChat();
            // Load chat every 5 seconds
            intervalId = setInterval(loadChat, 5000);
        }
    });
}

// Cek apakah nama pengguna sudah ada di local storage
if (username) {
    document.getElementById('username').value = username;
    document.getElementById('username').setAttribute('readonly', true);
    document.getElementById('message-section').style.display = 'flex';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('message').focus();
    toastr.options.progressBar = true;
    
    toastr.error('Jangan Toxic ya <3', null, { timeOut: 30000 }); // Hide after 30 seconds
    loadChat();
    // Load chat every 5 seconds
    intervalId = setInterval(loadChat, 5000);
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

// Function to replace inappropriate words with censored ***
function sensorMessage(message) {
    if (!inappropriateWords.length) {
        return message; // Return original message if inappropriate words list not loaded yet
    }
    
    const regex = new RegExp(`\\b(${inappropriateWords.join('|')})\\b`, 'gi');
    return message.replace(regex, (match) => '*'.repeat(match.length));
    
}

// Load inappropriate words list when the page is loaded
downloadInappropriateWords();

document.getElementById('message').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

window.onload = function() {
    
};