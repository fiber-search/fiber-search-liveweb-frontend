const CONFIG = {
    BACKEND: 'http://localhost:48534',
    REALTIME_SEARCH: true,
};

class El {
    constructor(name, attr, ev, children) {
        this.element = document.createElement(name);

        if (attr && typeof attr == "object") {
            for (const i in attr) {
                const tmp = attr[i];
                this.element.setAttribute(i, tmp);
            }
        }

        if (ev && typeof ev == "object") {
            for (const i in ev) {
                const tmp = ev[i];
                this.element.addEventListener(i, tmp);
            }
        }

        if (children) {
            if (children.forEach) {
                children.forEach((item) => {
                    this.element.appendChild(item);
                })
            } else if (typeof children == "object") {
                this.element.appendChild(children);
            } else if (typeof children == "string") {
                this.element.innerHTML = children;
            }
        }
    }
    element;
}

var searchInput = document.getElementById('search-input');
var resultList = document.getElementById("result-list");

function submitSearch(keyword) {
    var req = new XMLHttpRequest();
    req.open("GET", `${CONFIG.BACKEND}/?type=s&s=${keyword}`);
    req.send();
    req.onreadystatechange = (ev) => {
        if (req.readyState == 4 && req.status == 200) {
            resultList.innerHTML = "";
            var searchResult = JSON.parse(req.responseText);
            if (searchResult.status == "success") {
                searchResult.result.forEach((item) => {
                    resultList.appendChild(
                        new El("div", { "class": "result-list-item" }, null,
                            new El("a", { "href": item.url, "target": "_blank" }, null, item.title ? item.title : item.url).element
                        ).element
                    );
                })
            }
        }
    }
}

searchInput.addEventListener('keypress', (ev) => {
    if (CONFIG.REALTIME_SEARCH) {
        submitSearch(ev.target.value);
    } else if (ev.code == 'Enter') {
        submitSearch(ev.target.value);
    }
})
