// loading the children of the contain class
const content = document.querySelector('#contain').children;
const list = []
// Get their names by looping and getting the text content of the <h1> element
for (let i = 0; i < content.length; i++) {
    list.push(content[i].firstElementChild.textContent);
    content[i].style.cssText = "padding : 50px"
}
// creat and un oredered list to contain the list whick contain the anchor element
const ul = document.createElement('ul');
ul.setAttribute("id", "men")
// some styles to the un oredered list
ul.style.columnGap = "30px"
// select the menubar id that will contain the un oredered list
const menu = document.querySelector('#menubar');
// looping on the list of the headlines of each section and assign it to the anchor element
for (let i = 0; i < list.length; i++) {
    // creat the list element
    const li = document.createElement('li');
    // set the first element as an active class
    if (i == 0) {
        li.setAttribute("class", "active");
    }
    // creat the anchor element
    const an = document.createElement('a');
    an.style.cssText = "padding : 9px";
    // To make children interact with the mouse pointer
    an.addEventListener("mouseover", function (event) {
        if (event.target.parentElement.className != "active") {
            event.target.parentElement.setAttribute("class", "activeSelect")
        }
    })
    an.addEventListener("mouseout", function (event) {
        if (event.target.parentElement.className == "activeSelect") {
            event.target.parentElement.setAttribute("class", "notActive")
        }
    })
    an.textContent = list[i];
    // append the anchor element to the list 
    li.appendChild(an);
    if (li.className === "active") {
        li.setAttribute("class", "active")
    } else {
        li.setAttribute("class", "notActive");
    }
    /*set the .section-i+1 to each new list element to call the class which named like that .section-i+1 
    to get the postion of each section and move to it */
    let e = ".section-" + (i + 1);
    li.setAttribute("id", e);
    // add event to the list elemnet to scroll to the target section
    li.addEventListener('click', function (event) {
        /* the event target will be the anchor element
           so its parent will be the list elemet which contain it 
           which id refare to the section class */
        const element = document.querySelector(event.target.parentElement.id);
        /*for example here if the first section is "section-1 
          so the name of the class is "section-1" and the id of the list element
          will be ".section-1" so after getting it by the query selector 
          it will target the section which we want to scroll to */
        //--------------------------------------------------------------------------------//
        // to prevent the default event of the anchor element
        event.preventDefault();
        // to scroll smoothly to the targerted section
        element.scrollIntoView({ behavior: "smooth" });
    })
    // after each loop the new li element will be a child to the un ordered list
    ul.appendChild(li)
}
menu.style.cssText = "position : sticky ; top : 0"
/*at the end the un oredered list which contain all the data and section
  will be appened as the last child of the menubar element*/
menu.appendChild(ul)
// Return to the top of the page when the script executed
window.scrollTo({ top: 0, behavior: "smooth" })

const scrollFun = function (event) {
    // handle the last section
    /* the if condition to check if the scroll is in the
       end or not */
    if (Math.round(window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight) {
        // load the list elements
        const elementOfMenu = document.querySelector('#men').children;
        for (let j = 0; j < elementOfMenu.length; j++) {
            // deactivate all elements
            elementOfMenu[j].setAttribute("class", "notActive");
        }
        // activate the last element
        elementOfMenu[elementOfMenu.length - 1].setAttribute("class", "active");
    } else {
        // load the sections 
        const elements = document.querySelector('#contain').children;
        for (let i = 0; i < elements.length; i++) {
            // check if the section is in view or not 
            if (elements[i].getBoundingClientRect().bottom >= 1) {
                // load list elements
                const elementOfMenu = document.querySelector('#men').children;
                for (let j = 0; j < elementOfMenu.length; j++) {
                    /*check if the section class = the list element id
                      and activate it*/
                    if (elementOfMenu[j].id == '.' + elements[i].className) {
                        elementOfMenu[j].setAttribute("class", "active");
                    } else {
                        elementOfMenu[j].setAttribute("class", "notActive");
                    }
                }
                break;
            }
        }
    }
}
document.addEventListener('scroll', scrollFun)

// give the optimal padding when the page is loaded
let padding_1 = "padding-left : " + (window.innerWidth - 315).toString() + "px";
const change = document.querySelectorAll('.odd');
for (let i = 0; i < change.length; i++) {
    change[i].style.cssText = padding_1;
}

// To load the navbar and give its elements the optimal font-size
const menBar = document.querySelector('#men').children;
for (let i = 0; i < menBar.length; i++) {
    let font = "font-size : " + (Math.round(30 - (1535 - window.innerWidth) / 50)).toString() + "px";
    if (window.innerWidth <= 700) {
        menBar[i].style.cssText = font + "; margin-top : 15px"
    } else {
        menBar[i].style.cssText = font;
    }
}

/* add an event when the page size changes
   the padding changes to fit the screen new size
   and give the elements of the nav bar the optimal font-size*/
window.addEventListener('resize', function () {
    // this fot padding and load the sections 
    let padding = "padding-left : " + (window.innerWidth - 315).toString() + "px";
    const change = document.querySelectorAll('.odd');
    for (let i = 0; i < change.length; i++) {
        change[i].style.cssText = padding;
    }

    // this for font size and loading thenav bar elements
    const menBar = document.querySelector('#men').children;
    for (let i = 0; i < menBar.length; i++) {
        let font = "font-size : " + (Math.round(30 - (1535 - window.innerWidth) / 50)).toString() + "px";
        if (window.innerWidth <= 700) {
            menBar[i].style.cssText = font + "; margin-top : 15px"
        } else {
            menBar[i].style.cssText = font;
        }
    }
})
