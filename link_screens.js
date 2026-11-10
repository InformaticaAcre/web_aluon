import fs from 'fs';
import path from 'path';

const screensDir = './screens';
const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.html'));

const mapping = [
    { text: 'Inicio', link: 'home.html' },
    { text: 'Home', link: 'home.html' },
    { text: 'Servicios', link: 'productos.html' },
    { text: 'Modelos', link: 'portfolio.html' },
    { text: 'Contacto', link: 'contacto.html' },
    { text: 'Productos', link: 'productos.html' },
    { text: 'Proyectos', link: 'portfolio.html' },
    { text: 'Venta Online', link: 'venta-online.html' },
    { text: 'Venta', link: 'venta-online.html' },
    { text: 'Nosotros', link: 'home.html' }, // Point back home for now
    { text: 'ALUON', link: 'home.html', isLogo: true },
    { text: 'ALUON SECURITY', link: 'home.html', isLogo: true }
];

files.forEach(file => {
    const filePath = path.join(screensDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace menu links
    mapping.forEach(m => {
        if (m.isLogo) {
             // Handle logo text wrapped in div/span/a
             const logoRegex = new RegExp(`(<(div|a|span)[^>]*>\\s*)${m.text}(\\s*</\\2>)`, 'g');
             content = content.replace(logoRegex, (match, p1, p2, p3) => {
                 if (p2 === 'a') return match.replace(/href="[^"]*"/, `href="${m.link}"`);
                 return `<a href="${m.link}" class="contents">${p1}${m.text}${p3}</a>`;
             });
        } else {
            // Precise replacement for anchor tags with specific text
            const aRegex = new RegExp(`(<a[^>]*href=['"])#(['"][^>]*>\\s*${m.text}\\s*</a>)`, 'gi');
            content = content.replace(aRegex, `$1${m.link}$2`);
        }
    });

    // Also handle Case-insensitive variations for common menu items if needed
    // But the regex above handles some.

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
