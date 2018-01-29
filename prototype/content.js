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
        '        <a href="?content=project&project=do">Project Page</a>\n' +
        '    </div>\n' +
        '</div>';
    return elem;
}

function generate_content() {
    let content = [];
    let content_type = new URL(document.location.href).searchParams.get('content');
    switch(content_type) {
        case 'projects':
            for(let i = 0; i < 10; i++) {
                content.push(generate_project_card({name: 'A project', img: 'card1.jpg', details: 'Some details.'}));
            }
            break;

        case 'project':
            let p = document.createElement('p');
            p.innerText = 'hello';
            content.push(p);
            break;
    }

    return content;
}

for(let c of generate_content()) {
    document.getElementById('content').appendChild(c);
}
