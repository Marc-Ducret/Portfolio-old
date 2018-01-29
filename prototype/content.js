function generate_project_card(info) {
    let elem = document.createElement('div');
    elem.setAttribute('class', 'col s12 m6');
    elem.innerHTML =
        '<div class="card sticky-action hoverable">\n' +
        '    <div class="card-image waves-effect waves-block waves-light">\n' +
        '        <img class="activator" src="' + info.img + '">\n' +
        '    </div>\n' +
        '    <div class="card-content">\n' +
        '        <span class="card-title activator grey-text text-darken-4">' + info.name + '<i class="material-icons right">more_vert</i></span>\n' +
        '    </div>\n' +
        '    <div class="card-reveal">\n' +
        '        <span class="card-title grey-text text-darken-4">' + info.name + '<i class="material-icons right">close</i></span>\n' +
        '        <p>' + info.details + '</p>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="card-action">\n' +
        '        <a href="?content=project&project=' + info.id + '">Project Page</a>\n' +
        '    </div>\n' +
        '</div>';
    return elem;
}

function load_content() {
    let content_node = document.getElementById('content');
    let params = new URL(document.location.href).searchParams;
    let content_type = params.get('content');
    console.log('loading ' + content_type);
    switch (content_type) {
        case 'projects':
            load_object('projects/list', function (list) {
                let urls = [];
                for (let l of list) {
                    urls.push('projects/' + l);
                }
                load_objects(urls, function (projects) {
                    for (let proj of projects) {
                        content_node.appendChild(generate_project_card(proj));
                    }
                });
            });
            break;

        case 'project':
            load_object('projects/' + params.get('project'), function (proj) {
                let p = document.createElement('p');
                p.innerText = JSON.stringify(proj);
                content_node.appendChild(p);
            });
            break;
    }
}

function load_object(url, onload) {
    let req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        onload(JSON.parse(req.responseText));
    };
    req.send();
}

function load_objects(urls, onload) {
    let ct = 0;
    let objects = [];
    for (let i in urls) {
        load_object(urls[i], function (obj) {
            objects[i] = obj;
            if (++ct === urls.length) {
                onload(objects);
            }
        });
    }
}

load_content();
