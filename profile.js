// Profile Picture Upload
document.getElementById('profileUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
            // Save to localStorage
            localStorage.setItem('profilePicture', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Load saved profile picture
const savedProfilePicture = localStorage.getItem('profilePicture');
if (savedProfilePicture) {
    document.getElementById('profileImage').src = savedProfilePicture;
}

// Username Management
const username = localStorage.getItem('username') || 'Username';
document.getElementById('username').textContent = username;

// Goal Management
function editGoal() {
    const modal = document.getElementById('goalModal');
    const goalInput = document.getElementById('goalInput');
    const currentGoal = document.getElementById('userGoal').textContent;
    
    goalInput.value = currentGoal;
    modal.style.display = 'block';
}

function saveGoal() {
    const goalInput = document.getElementById('goalInput');
    const goal = goalInput.value;
    
    document.getElementById('userGoal').textContent = goal;
    localStorage.setItem('userGoal', goal);
    document.getElementById('goalModal').style.display = 'none';
}

// Load saved goal
const savedGoal = localStorage.getItem('userGoal');
if (savedGoal) {
    document.getElementById('userGoal').textContent = savedGoal;
}

// Bio Management
function editBio() {
    const modal = document.getElementById('bioModal');
    const bioInput = document.getElementById('bioInput');
    const currentBio = document.getElementById('userBio').textContent;
    
    bioInput.value = currentBio;
    modal.style.display = 'block';
}

function saveBio() {
    const bioInput = document.getElementById('bioInput');
    const bio = bioInput.value;
    
    document.getElementById('userBio').textContent = bio;
    localStorage.setItem('userBio', bio);
    document.getElementById('bioModal').style.display = 'none';
}

// Load saved bio
const savedBio = localStorage.getItem('userBio');
if (savedBio) {
    document.getElementById('userBio').textContent = savedBio;
}

// Skills Management
function saveSkills() {
    const selectedSkills = [];
    document.querySelectorAll('.skill-options input:checked').forEach(checkbox => {
        selectedSkills.push(checkbox.value);
    });
    localStorage.setItem('selectedSkills', JSON.stringify(selectedSkills));
}

// Load saved skills
const savedSkills = JSON.parse(localStorage.getItem('selectedSkills') || '[]');
savedSkills.forEach(skill => {
    const checkbox = document.querySelector(`.skill-options input[value="${skill}"]`);
    if (checkbox) {
        checkbox.checked = true;
    }
});

// Add event listeners to skill checkboxes
document.querySelectorAll('.skill-options input').forEach(checkbox => {
    checkbox.addEventListener('change', saveSkills);
});

// Certification Management
function addCertification() {
    const certGrid = document.querySelector('.cert-grid');
    const newCert = document.createElement('div');
    newCert.className = 'cert-post';
    newCert.innerHTML = `
        <img src="cert-placeholder.jpg" alt="Certification">
        <div class="cert-info">
            <h3>New Certification</h3>
            <p>Organization</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
    `;
    certGrid.appendChild(newCert);
    saveCertifications();
}

function saveCertifications() {
    const certs = [];
    document.querySelectorAll('.cert-post').forEach(post => {
        certs.push({
            title: post.querySelector('h3').textContent,
            organization: post.querySelector('p').textContent,
            date: post.querySelector('p:last-child').textContent
        });
    });
    localStorage.setItem('certifications', JSON.stringify(certs));
}

// Load saved certifications
const savedCerts = JSON.parse(localStorage.getItem('certifications') || '[]');
const certGrid = document.querySelector('.cert-grid');
certGrid.innerHTML = ''; // Clear existing certifications
savedCerts.forEach(cert => {
    const certPost = document.createElement('div');
    certPost.className = 'cert-post';
    certPost.innerHTML = `
        <img src="cert-placeholder.jpg" alt="Certification">
        <div class="cert-info">
            <h3>${cert.title}</h3>
            <p>${cert.organization}</p>
            <p>${cert.date}</p>
        </div>
    `;
    certGrid.appendChild(certPost);
});

// Close modals when clicking the X button
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}); 