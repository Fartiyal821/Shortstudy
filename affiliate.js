document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('affiliateContainer');
    const products = JSON.parse(localStorage.getItem(storageKey('affiliate'))) || [];

    if (!products.length) {
        container.innerHTML = '<p class="empty-msg">No affiliate products have been added yet.</p>';
        return;
    }

    container.innerHTML = products.map(item => {
        const imageBlock = item.imageData ? `<img src="${item.imageData}" alt="${item.title}" style="width:100%; border-radius: 14px; margin-bottom: 1rem; max-height: 320px; object-fit: cover;" />` : '';
        const videoBlock = item.videoEmbed ? `<div class="affiliate-video" style="margin:12px 0;">${item.videoEmbed}</div>` : (isYouTubeUrl(item.link) ? `<div class="affiliate-video" style="margin:12px 0;"><iframe width="100%" height="240" src="${makeYouTubeEmbedSrc(item.link)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>` : '');
        return `
            <div class="affiliate-card">
                ${imageBlock}
                ${videoBlock}
                <strong>${item.title}</strong>
                <p>${item.description}</p>
                <p><a class="resource-link" href="${item.link}" target="_blank">Visit product link</a></p>
                <p><small>Added on ${item.dateAdded}</small></p>
            </div>
        `;
    }).join('');

    function isYouTubeUrl(url) {
        if (!url) return false;
        return /youtube\.com\/watch\?v=|youtu\.be\//i.test(url);
    }

    function makeYouTubeEmbedSrc(url) {
        try {
            const u = new URL(url.startsWith('http') ? url : 'https://' + url);
            if (u.hostname.includes('youtu.be')) {
                const id = u.pathname.slice(1);
                return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
            }
            if (u.searchParams && u.searchParams.get('v')) {
                const id = u.searchParams.get('v');
                return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
            }
        } catch (e) {}
        return '';
    }
});
