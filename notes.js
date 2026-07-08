document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notesContainer');
    const allNotes = JSON.parse(localStorage.getItem(storageKey('notes'))) || [];
    const courses = JSON.parse(localStorage.getItem(storageKey('courses'))) || window.SHORTSTUDY_COURSES || [];

    if (!allNotes.length) {
        notesContainer.innerHTML = '<p class="empty-msg">No notes have been uploaded yet.</p>';
        return;
    }

    const grouped = allNotes.reduce((acc, note) => {
        acc[note.courseId] = acc[note.courseId] || [];
        acc[note.courseId].push(note);
        return acc;
    }, {});

    notesContainer.innerHTML = Object.keys(grouped).map(courseId => {
        const course = courses.find(c => c.id == courseId) || { name: 'Unknown Course' };
        const items = grouped[courseId].map(note => {
            const pdfLink = note.fileData ? `<p><a class="resource-link" href="${note.fileData}" target="_blank" download="${note.fileName}">Download ${note.fileName}</a></p>` : '';
            const embed = note.embeddedText ? `<p>${note.embeddedText}</p>` : '';
            return `<div class="note-card"><strong>${note.title || 'Uploaded Note'}</strong>${embed}${pdfLink}<p><small>Added on ${note.dateAdded}</small></p></div>`;
        }).join('');

        return `
            <div class="card">
                <h2>${course.name}</h2>
                ${items}
            </div>
        `;
    }).join('');
});
