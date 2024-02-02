const prompts = require('prompts');
const fs = require('fs');

(async () => {
    const response = await prompts([
        {
            type: 'text',
            name: 'text',
            message: 'Enter up to three characters:',
            validate: value => value.length <= 3 ? true : 'Text must be up to three characters'
        },
        {
            type: 'text',
            name: 'textColor',
            message: 'Enter the text color (keyword or hexadecimal):'
        },
        {
            type: 'select',
            name: 'shape',
            message: 'Choose a shape:',
            choices: [
                { title: 'Circle', value: 'circle' },
                { title: 'Triangle', value: 'triangle' },
                { title: 'Square', value: 'square' }
            ]
        },
        {
            type: 'text',
            name: 'shapeColor',
            message: 'Enter the shape\'s color (keyword or hexadecimal):'
        }
    ]);

    const { text, textColor, shape, shapeColor } = response;
    const svgStart = '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    const svgEnd = '</svg>';

    let shapeSvg;
    switch(shape) {
        case 'circle':
            shapeSvg = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
            break;
        case 'triangle':
            shapeSvg = `<polygon points="150,20 50,180 250,180" fill="${shapeColor}" />`;
            break;
        case 'square':
            shapeSvg = `<rect x="50" y="50" width="200" height="100" fill="${shapeColor}" />`;
            break;
    }

    const textSvg = `<text x="150" y="120" font-family="Arial" font-size="40" fill="${textColor}" text-anchor="middle">${text}</text>`;

    const svgContent = `${svgStart}${shapeSvg}${textSvg}${svgEnd}`;

    fs.writeFile('logo.svg', svgContent, (err) => {
        if (err) throw err;
        console.log('Generated logo.svg');
    });
})();
