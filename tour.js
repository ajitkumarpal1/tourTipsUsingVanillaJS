(function () {
    let gii = 0;
    let time = 5000;
    let clo = [];
    let curr = 0;
    const bodyBlur = `<div id="blur29" style="width: 100vw;height: 100vh;background-color: rgba(0, 0, 0, .3);z-index:2147483646;position:absolute; "></div>`;

    window.formvalue = function (data, t) {
        console.log(data.sequence[0].content.btn_next);
        if (t) {
            time = t;
        }

        const tooltipTriggerList = data.sequence.map(element => document.querySelector(element.element));

        console.log(tooltipTriggerList);

        const tooltipCollection = tooltipTriggerList.map((tooltipTriggerEl, index) => {
            var string1 = `<a class="btn bg-light btn-sm text-dark position-absolute top-0 end-0 rounded close">Close</a><b>${data.sequence[index].title}</b><p>${data.sequence[index].content.text}</p><hr>`;

            if (data.sequence[index].content.btn_previous === true && index != 0) {
                string1 += `<a class="btn bg-light m-1 previous" type="button">previous</a>`;
            }

            if (data.sequence[index].content.btn_next === true) {
                string1 += `<a class="btn bg-light m-1 next" id="next${++gii}">next</a>`;
            }

            console.log("lllllllllll>", string1);

            const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
                title: string1,
                trigger: 'manual',
                html: true,
                template: `<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>`
            });

            console.log(">>>", tooltip);
            return tooltip;
        });

        console.log(tooltipCollection[0]);
        elClone(document.querySelector(data.sequence[0].element), 0);
        

        console.log(document.querySelectorAll(".tooltip ").length);
        document.body.insertAdjacentHTML('afterbegin', bodyBlur);

        tooltipCollection[0].show();

        document.querySelector(data.sequence[0].element).style.zIndex = "2147483647";
        document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].style.zIndex = "2147483647";
        document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].style.position = "absolute";

        toolshow(tooltipCollection, data);
    };

    let showi = 0;
    let sto;

    function toolshow(tooltips, data) {
        console.log(tooltips, showi);

        if (tooltips.length - 1 === showi) {
            const closeButton = document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].querySelector('a.next');
            closeButton.innerHTML = "Close";
            closeButton.classList.add("close");
            closeButton.classList.remove("next");
        } else {
            if (document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].querySelector('a.next')) {
                document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].querySelector('a.next').addEventListener('click', function (e) {
                    tooltips[showi].hide();
                    cloRemove(showi, false)
                    tooltips[++showi].show();
                    console.log("////>>>", data.sequence[showi].element);
                    elClone(document.querySelector(data.sequence[showi].element), ++curr);
                    document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].style.zIndex = "2147483647";
                    document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].style.position = "absolute";
                    toolshow(tooltips, data);
                });
            } else {
                sto = setTimeout(function () {
                    tooltips[showi].hide();
                    cloRemove(showi, false)
                    tooltips[++showi].show();
                    elClone(document.querySelector(data.sequence[showi].element), ++curr);
                    document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].style.zIndex = "2147483647";
                    document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].style.position = "absolute";
                    toolshow(tooltips, data);
                }, time);
            }
        }

        document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].querySelector('a.previous').addEventListener('click', function (e) {
            tooltips[showi].hide();
            if (sto) {
                clearTimeout(sto);
            }

            cloRemove(showi, false)

            tooltips[--showi].show();
            elClone(document.querySelector(data.sequence[showi].element), --curr);
            document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].style.zIndex = "2147483647";
            document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].style.position = "absolute";
            toolshow(tooltips, data);
        });

        document.querySelectorAll(".tooltip")[document.querySelectorAll(".tooltip ").length - 1].querySelector('.close').addEventListener('click', function (e) {
            tooltips[showi].hide();
            document.getElementById("blur29").remove();
            cloRemove(0, true)
        });
    }

    function cloRemove(i, All) {
        if (sto) {
            clearTimeout(sto);
        }
        if (All) {
            clo.forEach(element => {
                element.remove();
            });
        } else {
            clo[i].remove();
        }
    }

    function elClone(params, index) {
        const position = params.getBoundingClientRect();
        clo[index] = params.cloneNode(true);
        clo[index].style.left = position.left + 'px';
        clo[index].style.top = position.top + 'px';
        clo[index].style.width = params.offsetWidth + 'px';
        clo[index].style.height = params.offsetHeight + 'px';
        clo[index].style.position = "absolute";
        clo[index].style.zIndex = "2147483647";
        clo[index].style.outline = "white solid";
        clo[index].style.boxShadow = "red 0px 0px 100px ";
        clo[index].removeAttribute("id");
        params.parentNode.insertBefore(clo[index], params.nextSibling);
    }
})();
