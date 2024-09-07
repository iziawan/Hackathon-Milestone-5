var form = document.getElementById('resume-form');
var resumeContent = document.getElementById('resume-content');
var downloadPdfButton = document.getElementById('download-pdf');
var resumeLink = document.getElementById('resume-link');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var workExperience = document.getElementById('work-experience').value;
    var skills = document.getElementById('skills').value;
    if (!username || !name || !email || !phone || !education || !workExperience || !skills) {
        alert("Please fill out all fields.");
        return;
    }
    var resumeHTML = "\n        <h3 contenteditable=\"true\">Personal Information</h3>\n        <p><strong>Name:</strong> <span contenteditable=\"true\">".concat(name, "</span></p>\n        <p><strong>Email:</strong> <a href=\"mailto:").concat(email, "\" contenteditable=\"true\">").concat(email, "</a></p>\n        <p><strong>Phone:</strong> <span contenteditable=\"true\">").concat(phone, "</span></p>\n\n        <h3 contenteditable=\"true\">Education</h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n\n        <h3 contenteditable=\"true\">Work Experience</h3>\n        <p contenteditable=\"true\">").concat(workExperience, "</p>\n\n        <h3 contenteditable=\"true\">Skills</h3>\n        <ul>\n            ").concat(skills.split(',').map(function (skill) { return "<li contenteditable=\"true\">".concat(skill.trim(), "</li>"); }).join(''), "\n        </ul>\n    ");
    resumeContent.innerHTML = resumeHTML;
    var uniqueUrl = "https://".concat(username, ".vercel.app/resume");
    resumeLink.innerHTML = "Share your resume: <a href=\"".concat(uniqueUrl, "\" target=\"_blank\">").concat(uniqueUrl, "</a>");
});
downloadPdfButton.addEventListener('click', function () {
    if (typeof html2pdf === 'undefined') {
        alert('Error: html2pdf library is not loaded.');
        return;
    }
    var resumeOptions = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(resumeContent).set(resumeOptions).save();
});
