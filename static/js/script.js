// static/js/script.js
document.addEventListener('DOMContentLoaded', function() {
    const storyForm = document.getElementById('story-form');
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    let storyCount = 0;

    storyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const storyData = {
            name: document.getElementById('name').value,
            occupation: document.getElementById('occupation').value,
            story: document.getElementById('story').value,
            color: document.getElementById('color-picker').value
        };

        fetch('/add_story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storyData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addStoryToTimeline(data.story);
                storyForm.reset();
            }
        })
        .catch(error => console.error('Error:', error));
    });

    function addStoryToTimeline(story) {
        const storyElement = document.createElement('div');
        storyElement.className = 'story-card card-hover';
        storyElement.style.opacity = '0';
        
        storyElement.innerHTML = `
            <h3><i class="fas fa-user-astronaut"></i> ${story.name}</h3>
            <p><i class="fas fa-rocket"></i> ${story.occupation}</p>
            <div class="story-content">
                <i class="fas fa-quote-left"></i>
                <p>${story.story}</p>
                <i class="fas fa-quote-right"></i>
            </div>
            <small><i class="fas fa-clock-rotate-left"></i> ${story.timestamp}</small>
        `;
        
        // Alternate between left and right columns
        if (storyCount % 2 === 0) {
            leftColumn.prepend(storyElement);
        } else {
            rightColumn.prepend(storyElement);
        }
        
        // Trigger animation
        setTimeout(() => {
            storyElement.style.transition = 'all 0.5s ease';
            storyElement.style.opacity = '1';
        }, 50);
        
        storyCount++;
    }
});