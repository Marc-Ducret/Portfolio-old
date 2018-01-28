function generate_project_card(info) {
    let elem = document.createElement('div');
    elem.setAttribute('class', 'col s12 m6');
    elem.innerHTML =
        '<div class="card sticky-action hoverable">\n' +
        '    <div class="card-image waves-effect waves-block waves-light">\n' +
        '        <img class="activator" src="'+info.img+'">\n' +
        '    </div>\n' +
        '    <div class="card-content">\n' +
        '        <span class="card-title activator grey-text text-darken-4">'+info.name+'<i class="material-icons right">more_vert</i></span>\n' +
        '    </div>\n' +
        '    <div class="card-reveal">\n' +
        '        <span class="card-title grey-text text-darken-4">'+info.name+'<i class="material-icons right">close</i></span>\n' +
        '        <p>'+info.details+'</p>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="card-action">\n' +
        '        <a href="#">Project Page</a>\n' +
        '    </div>\n' +
        '</div>';
    return elem;
}

for(let i = 0; i < 10; i++) {
    document.getElementById('projects').appendChild(generate_project_card({name: 'A project', img: 'card1.jpg', details: 'Some details.'}));
}