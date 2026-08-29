// Click any photo box to upload your own image from your device.

// ---- Comments / Tips section ----
// Each case page gets its own comment thread, saved in the browser's
// localStorage (so it persists across visits/refreshes on this device).
(function () {
    const form = document.querySelector(".comment-form");
    const list = document.querySelector(".comments-list");
    if (!form || !list) return;

    // Identify this case page by its filename (index.html, case2.html, ...)
    const page = location.pathname.split("/").pop() || "index.html";
    const storageKey = "wanted-comments::" + page;

    function loadComments() {
        try {
            const raw = localStorage.getItem(storageKey);
            return raw ? JSON.parse(raw) : [];
        } catch (err) {
            return [];
        }
    }

    function saveComments(comments) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(comments));
        } catch (err) {
            console.error("Could not save comment:", err);
        }
    }

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    function renderComments() {
        const comments = loadComments();
        list.innerHTML = "";

        if (comments.length === 0) {
            list.innerHTML = '<p class="no-comments">No tips submitted yet. Be the first.</p>';
            return;
        }

        comments.forEach((comment, index) => {
            const item = document.createElement("div");
            item.className = "comment";
            item.innerHTML = `
                <div class="comment-head">
                    <span class="comment-name">${escapeHtml(comment.name)}</span>
                    <span class="comment-date">${escapeHtml(comment.date)}</span>
                </div>
                <p class="comment-text">${escapeHtml(comment.text)}</p>
                <button type="button" class="comment-delete" data-index="${index}">remove</button>
            `;
            list.appendChild(item);
        });
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = form.querySelector(".comment-name-input");
        const textInput = form.querySelector(".comment-text-input");
        const text = textInput.value.trim();

        if (!text) return;

        const comments = loadComments();
        comments.push({
            name: nameInput.value.trim() || "Anonymous",
            text: text,
            date: new Date().toLocaleString()
        });

        saveComments(comments);
        nameInput.value = "";
        textInput.value = "";
        renderComments();
    });

    list.addEventListener("click", function (e) {
        if (!e.target.classList.contains("comment-delete")) return;
        const index = Number(e.target.dataset.index);
        const comments = loadComments();
        comments.splice(index, 1);
        saveComments(comments);
        renderComments();
    });

    renderComments();
})();
