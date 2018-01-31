function generate_project_card(info) {
    let elem = document.createElement('div');
    elem.setAttribute('class', 'col s12 m6');
    elem.innerHTML =
        '<div class="card sticky-action hoverable">\n' +
        '    <div class="card-image waves-effect waves-block waves-light">\n' +
        '        <img class="activator" src="content/images/' + info.image + '">\n' +
        '    </div>\n' +
        '    <div class="card-content">\n' +
        '        <span class="card-title activator grey-text text-darken-4">'
                    + info.name + '<i class="material-icons right">more_vert</i>' +
        '        </span>\n' +
        '    </div>\n' +
        '    <div class="card-reveal">\n' +
        '        <span class="card-title grey-text text-darken-4">'
                    + info.name + '<i class="material-icons right">close</i>' +
        '        </span>\n' +
        '        <p>' + info.details + '</p>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="card-action">\n' +
        '        <a href="?content=project&project=' + info.id + '">Project Page</a>\n' +
        '    </div>\n' +
        '</div>';
    return elem;
}

function generate_text_page_block(content) {
    switch (content.type) {
        case 'text':
            let div = document.createElement('div');
            if (content.title) {
                let title = document.createElement('h1');
                title.innerHTML = content.title;
                title.setAttribute('class', 'deep-orange-text text-darken-4');
                div.appendChild(title);
            }
            if (content.text) {
                let text = document.createElement('p');
                text.innerHTML = content.text;
                text.style.textAlign = 'justify';
                div.appendChild(text);
            }
            return div;

        case 'image':
            let img = document.createElement('img');
            img.setAttribute('src', 'content/images/' + content.src);
            img.setAttribute('class', 'responsive-img materialboxed');
            return img;
    }
}

function generate_text_page(contents) {
    let container = document.createElement('div');
    let margin_left = document.createElement('div');
    margin_left.setAttribute('class', 'col s0 xl3');
    let margin_right = document.createElement('div');
    margin_right.setAttribute('class', 'col s0 xl3');
    let div = document.createElement('div');
    div.setAttribute('class', 'col s12 xl6');
    for (let content of contents) {
        div.appendChild(generate_text_page_block(content));
    }
    container.appendChild(margin_left);
    container.appendChild(div);
    container.appendChild(margin_right);
    return container;
}

function load_content() {
    let content_node = document.getElementById('content');
    let appendContent = function (elem) {
        content_node.appendChild(elem);
        materialize_init();
    };
    let params = new URL(document.location.href).searchParams;
    let content_type = params.get('content');
    if(!content_type) {
        content_type = 'text_page';
        params.set('content', content_type);
        params.set('page', 'home');
    }
    console.log('loading ' + content_type);
    switch (content_type) {
        case 'projects':
            load_object('content/projects/list', function (list) {
                let urls = [];
                for (let l of list) {
                    urls.push('content/projects/' + l);
                }
                load_objects(urls, function (projects) {
                    for (let proj of projects) {
                        appendContent(generate_project_card(proj));
                    }
                });
            });
            break;

        case 'project':
            load_object('content/projects/' + params.get('project'), function (proj) {
                appendContent(generate_text_page(proj.page));
            });
            break;

        case 'text_page':
            load_object('content/' + params.get('page'), function (contents) {
                appendContent(generate_text_page(contents));
            });
            break;
    }
}

function load_object(url, onload) {
    let req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        let json = req.responseText.replace(/[\n\r]/g, ' ');
        onload(JSON.parse(json));
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

function materialize_init() {
    let sel = document.querySelectorAll('.materialboxed');
    if (sel) M.Materialbox.init(sel, {});
}

load_content();
materialize_init();