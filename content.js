function hideElementIfMatchesText(element, text) {
    if (element.textContent.includes(text)) {
        let parentElement = element.closest('ytd-rich-shelf-renderer, ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer');
        if (parentElement) parentElement.style.display = 'none';
    }
}

function hideShortsFromShelf() {
    const shortsTitleSpan = document.querySelectorAll('span#title.style-scope.ytd-rich-shelf-renderer');
    shortsTitleSpan.forEach(title => hideElementIfMatchesText(title, 'Shorts'));
}

function hideShortsFromGuideLinks() {
    const shortsTitleFormattedString = document.querySelectorAll('yt-formatted-string.title.style-scope.ytd-guide-entry-renderer');
    shortsTitleFormattedString.forEach(title => hideElementIfMatchesText(title, 'Shorts'));
}

function hideShortsFromMiniGuide() {
    const shortsMiniGuideEntry = document.querySelectorAll('ytd-mini-guide-entry-renderer');
    shortsMiniGuideEntry.forEach(entry => {
        const titleSpan = entry.querySelector('span.title.style-scope.ytd-mini-guide-entry-renderer');
        if (titleSpan) hideElementIfMatchesText(titleSpan, 'Shorts');
    });
}

function observeDOMChanges() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(() => {
            hideShortsFromShelf();
            hideShortsFromGuideLinks();
            hideShortsFromMiniGuide();
        });
    });

    observer.observe(document, { subtree: true, childList: true });
}

function hideYouTubeShorts() {
    observeDOMChanges();
}

hideYouTubeShorts();

