// Search Functionality
function searchVideos() {
    let query = document.getElementById("search").value.toLowerCase();
    let videos = document.querySelectorAll(".video-container");

    videos.forEach(video => {
        let title = video.querySelector("h3").innerText.toLowerCase();
        let description = video.querySelector("p").innerText.toLowerCase();

        if (title.includes(query) || description.includes(query)) {
            video.style.display = "block";
        } else {
            video.style.display = "none";
        }
    });
}

// Career paths and their required subjects
const careerPaths = {
    softwareDevelopment: {
        name: "Software Development",
        subjects: ["Object-Oriented Programming", "Data Structures", "Software Engineering", "Web Development"],
        description: "Focus on building applications and software systems",
        skills: ["Programming", "Problem Solving", "System Design", "Web Technologies"]
    },
    dataScience: {
        name: "Data Science",
        subjects: ["Data Structures", "Database Management Systems", "Machine Learning", "Deep Learning"],
        description: "Work with data analysis, machine learning, and AI",
        skills: ["Data Analysis", "Machine Learning", "Statistics", "Python/R"]
    },
    cybersecurity: {
        name: "Cybersecurity",
        subjects: ["Computer Networks", "Operating Systems", "Cybersecurity"],
        description: "Protect systems and networks from security threats",
        skills: ["Network Security", "Ethical Hacking", "Security Analysis", "Risk Management"]
    },
    cloudComputing: {
        name: "Cloud Computing",
        subjects: ["Computer Networks", "Cloud Computing", "Web Development"],
        description: "Design and manage cloud infrastructure and services",
        skills: ["Cloud Platforms", "DevOps", "Containerization", "Infrastructure as Code"]
    },
    blockchain: {
        name: "Blockchain Development",
        subjects: ["Data Structures", "Blockchain Technology", "Web Development"],
        description: "Develop blockchain applications and smart contracts",
        skills: ["Blockchain", "Smart Contracts", "Cryptography", "DApp Development"]
    },
    // Additional career paths
    uiUxDesigner: {
        name: "UI/UX Designer",
        subjects: ["Web Development", "User Interface Design", "Human-Computer Interaction"],
        description: "Design user interfaces and experiences for digital products",
        skills: ["UI Design", "UX Research", "Wireframing", "Prototyping"]
    },
    businessAnalyst: {
        name: "Business Intelligence Analyst",
        subjects: ["Database Management Systems", "Data Analytics", "Business Intelligence"],
        description: "Analyze data to provide business insights and recommendations",
        skills: ["Data Analysis", "Business Intelligence Tools", "SQL", "Data Visualization"]
    },
    qaEngineer: {
        name: "Quality Assurance Engineer",
        subjects: ["Software Testing", "Software Engineering", "Programming"],
        description: "Ensure software quality through testing and automation",
        skills: ["Test Automation", "Quality Assurance", "Bug Tracking", "Test Planning"]
    },
    networkEngineer: {
        name: "Network Engineer",
        subjects: ["Computer Networks", "Network Security", "Cloud Computing"],
        description: "Design and implement computer networks and infrastructure",
        skills: ["Network Administration", "Router Configuration", "Network Security", "Troubleshooting"]
    },
    embeddedDeveloper: {
        name: "Embedded Systems Developer",
        subjects: ["Computer Architecture", "Operating Systems", "Programming"],
        description: "Develop software for embedded systems and IoT devices",
        skills: ["Embedded Programming", "Hardware Interfacing", "Real-time Systems", "IoT"]
    },
    databaseAdmin: {
        name: "Database Administrator",
        subjects: ["Database Management Systems", "Data Security", "Computer Networks"],
        description: "Manage and optimize database systems",
        skills: ["Database Management", "SQL", "Data Security", "Performance Tuning"]
    },
    gamesDeveloper: {
        name: "Games Developer",
        subjects: ["Computer Graphics", "Programming", "Game Development"],
        description: "Create and develop video games and interactive experiences",
        skills: ["Game Programming", "3D Graphics", "Game Engines", "Animation"]
    },
    productManager: {
        name: "Technical Product Manager",
        subjects: ["Software Engineering", "Project Management", "Business Analysis"],
        description: "Lead product development and strategy in tech companies",
        skills: ["Product Strategy", "Agile Management", "Technical Planning", "Stakeholder Management"]
    }
};

// Function to calculate average marks for a semester
function calculateSemesterAverage(semesterNumber) {
    const inputs = document.querySelectorAll(`.semester:nth-child(${semesterNumber}) input[type="number"]`);
    let sum = 0;
    let count = 0;
    
    inputs.forEach(input => {
        if (input.value) {
            sum += parseInt(input.value);
            count++;
        }
    });
    
    return count > 0 ? sum / count : 0;
}

// Function to get marks for specific subjects
function getSubjectMarks(subjectName) {
    const inputs = document.querySelectorAll('input[type="number"]');
    for (let input of inputs) {
        const row = input.closest('tr');
        if (row.querySelector('td:first-child').textContent === subjectName) {
            return input.value ? parseInt(input.value) : 0;
        }
    }
    return 0;
}

// Function to calculate career recommendations
function calculateRecommendations() {
    const recommendations = [];
    
    // Calculate overall performance
    let totalAverage = 0;
    let semesterCount = 0;
    for (let i = 1; i <= 5; i++) {
        const avg = calculateSemesterAverage(i);
        if (avg > 0) {
            totalAverage += avg;
            semesterCount++;
        }
    }
    totalAverage = semesterCount > 0 ? totalAverage / semesterCount : 0;
    
    // Analyze each career path
    for (const [key, career] of Object.entries(careerPaths)) {
        let careerScore = 0;
        let subjectCount = 0;
        
        // Calculate score based on relevant subjects
        career.subjects.forEach(subject => {
            const marks = getSubjectMarks(subject);
            if (marks > 0) {
                careerScore += marks;
                subjectCount++;
            }
        });
        
        // Calculate average score for this career path
        const careerAverage = subjectCount > 0 ? careerScore / subjectCount : 0;
        
        // Add recommendation if score is good enough
        if (careerAverage >= 70 && totalAverage >= 65) {
            recommendations.push({
                career: career,
                score: careerAverage,
                match: Math.round((careerAverage / 100) * 100)
            });
        }
    }
    
    // Sort recommendations by score
    recommendations.sort((a, b) => b.score - a.score);
    
    return recommendations;
}

// Function to display recommendations
function displayRecommendations(recommendations) {
    const resultDiv = document.getElementById('recommendationResult');
    const contentDiv = document.getElementById('recommendationContent');
    
    if (recommendations.length === 0) {
        contentDiv.innerHTML = '<p>No career recommendations available at this time. Please enter your marks for better recommendations.</p>';
        resultDiv.style.display = 'block';
        return;
    }
    
    let html = '';
    recommendations.forEach(rec => {
        html += `
            <div class="career-path">
                <h3>${rec.career.name} (${rec.match}% Match)</h3>
                <p><strong>Description:</strong> ${rec.career.description}</p>
                <p><strong>Key Skills Required:</strong> ${rec.career.skills.join(', ')}</p>
                <p><strong>Relevant Subjects:</strong> ${rec.career.subjects.join(', ')}</p>
            </div>
        `;
    });
    
    contentDiv.innerHTML = html;
    resultDiv.style.display = 'block';
}

// Event listener for the recommendation button
document.getElementById('calculateRecommendation').addEventListener('click', () => {
    const recommendations = calculateRecommendations();
    displayRecommendations(recommendations);
});

// Quiz Results Management
const quizResults = {
    'programming-fundamentals': null,
    'web-development': null,
    'database-concepts': null,
    'network-fundamentals': null,
    'data-analysis': null,
    'security-fundamentals': null
};

// Function to show result modal
function showResult(quizId) {
    const modal = document.getElementById('resultModal');
    const resultContent = document.getElementById('resultContent');
    const score = quizResults[quizId];
    
    if (score === null) {
        resultContent.innerHTML = '<p>No quiz results available yet. Please take the quiz first.</p>';
    } else {
        resultContent.innerHTML = `
            <p><strong>Score:</strong> ${score}%</p>
            <p><strong>Status:</strong> ${score >= 70 ? 'Passed' : 'Failed'}</p>
            <p><strong>Feedback:</strong> ${getFeedback(score)}</p>
        `;
    }
    
    modal.style.display = 'block';
}

// Function to get feedback based on score
function getFeedback(score) {
    if (score >= 90) return 'Excellent! You have mastered this topic.';
    if (score >= 80) return 'Very good! Keep up the great work.';
    if (score >= 70) return 'Good! You have a solid understanding.';
    if (score >= 60) return 'Fair. Consider reviewing the material.';
    return 'You might want to retake the quiz after reviewing the material.';
}

// Close modal when clicking the X button
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('resultModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('resultModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Function to update quiz result (to be called after quiz completion)
function updateQuizResult(quizId, score) {
    quizResults[quizId] = score;
    document.getElementById(`${quizId}-score`).textContent = score;
}

// Example usage:
// updateQuizResult('programming-fundamentals', 85);
// updateQuizResult('web-development', 92);
// etc.

// Function to handle Google Form submission
function handleFormSubmit(formId, quizId) {
    // Create a form submission handler
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://docs.google.com/forms/d/${formId}/formResponse`;
    form.target = 'hidden_iframe';

    // Create hidden iframe to handle form submission
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Add event listener for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        
        // Send form data to Google Form
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const score = extractScoreFromResponse(data);
            updateQuizResult(quizId, score);
            showResult(quizId);
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert('Error submitting quiz. Please try again.');
        });
    });

    return form;
}

// Function to extract score from form response
function extractScoreFromResponse(response) {
    const scoreField = response.entry_1234567890; // Replace with your actual field ID
    return parseInt(scoreField) || 0;
}

// Initialize quiz forms
document.addEventListener('DOMContentLoaded', function() {
    // Programming Fundamentals Quiz
    const programmingForm = handleFormSubmit('UDoeiCwXvyGeccAZA', 'programming-fundamentals');
    
    // Web Development Quiz
    const webDevForm = handleFormSubmit('example2', 'web-development');
    
    // Database Concepts Quiz
    const databaseForm = handleFormSubmit('example3', 'database-concepts');
    
    // Network Fundamentals Quiz
    const networkForm = handleFormSubmit('example4', 'network-fundamentals');
    
    // Data Analysis Quiz
    const dataAnalysisForm = handleFormSubmit('example5', 'data-analysis');
    
    // Security Fundamentals Quiz
    const securityForm = handleFormSubmit('example6', 'security-fundamentals');
});
