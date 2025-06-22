const headerHTML = `
<nav class="navbar">
    <div class="nav-container">
        <a href="index.html" class="nav-logo">
            <span class="logo-text">Terror Literário</span>
        </a>
        <div class="nav-menu">
            <a href="index.html" class="nav-link">Início</a>
            <a href="about.html" class="nav-link">Sobre</a>
            <a href="form.html" class="nav-link">Contato</a>
        </div>
    </div>
</nav>`;

const footerHTML = `
<footer class="footer">
    <div class="container">
        <p>&copy; Site para fins educativos. Pontifícia Universidade Católica do Paraná.</p>
    </div>
</footer>`;

function injectComponent(id, html) {
    const element = document.getElementById(id);
    if (element) element.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    injectComponent('header', headerHTML);
    injectComponent('footer', footerHTML);
});
