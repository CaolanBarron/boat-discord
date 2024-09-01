const fs = require('fs');
const path = require('path');

const directory = 'output'; // Update with your output directory

function addJsExtensions(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Updated regex to match both import and export statements
    const updatedContent = content.replace(
        /(import|export)\s+([^'"]+?\s+from\s+['"])(\.\/[^'"]+)(?<!\.js)(['"])/g,
        (match, keyword, beforeFrom, modulePath, quote) => {
            // Skip adding .js for specific modules
            if (
                modulePath.includes('drizzle-orm') ||
                modulePath.includes('drizzle-orm/sqlite-core')
            ) {
                return match;
            }
            // Otherwise, add .js extension
            return `${keyword} ${beforeFrom}${modulePath}.js${quote}`;
        },
    );

    fs.writeFileSync(filePath, updatedContent, 'utf-8');
}

function processDirectory(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.js')) {
            addJsExtensions(fullPath);
        }
    });
}

processDirectory(directory);
