(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const slider = document.querySelector(".slider__img");
    const before = document.querySelector(".slider__before-img");
    const beforeImage = before.querySelector("img");
    const change = document.querySelector(".slider__around");
    const body = document.body;
    const sliderChange = document.querySelector(".slider__change");
    const sliderMobile = sliderChange.querySelector(".slider__mobile");
    const sliderChangeMobile = sliderChange.querySelector(".slider__color");
    const mobileWrapper = sliderMobile.querySelector(".slider__mobile-wrapper");
    let isActive = false;
    document.addEventListener("DOMContentLoaded", (() => {
        let width = slider.offsetWidth;
        beforeImage.style.width = `${width}px`;
    }));
    change.addEventListener("mousedown", (() => {
        isActive = true;
    }));
    body.addEventListener("mouseup", (() => {
        isActive = false;
    }));
    body.addEventListener("mouseleave", (() => {
        isActive = false;
    }));
    const beforeAfterSlider = x => {
        let shift = Math.max(0, Math.min(x, sliderChange.offsetWidth));
        before.style.width = `${slider.offsetWidth - shift * slider.offsetWidth / sliderChange.offsetWidth}px`;
        change.style.left = `${shift}px`;
    };
    const beforeAfterSlider2 = x => {
        let shift = Math.max(0, Math.min(x, sliderMobile.offsetWidth));
        before.style.width = `${shift * slider.offsetWidth / sliderMobile.offsetWidth}px`;
        sliderChangeMobile.style.width = `${shift * mobileWrapper.offsetWidth / sliderMobile.offsetWidth}px`;
    };
    const pauseEvents = e => {
        e.stopPropagation();
        e.preventDefault();
        return false;
    };
    body.addEventListener("mousemove", (e => {
        if (!isActive) return;
        let x = e.pageX;
        x -= sliderChange.getBoundingClientRect().left;
        if (body.offsetWidth > 768) beforeAfterSlider(x); else beforeAfterSlider2(x);
        pauseEvents(e);
    }));
    change.addEventListener("touchstart", (() => {
        isActive = true;
    }));
    body.addEventListener("touchend", (() => {
        isActive = false;
    }));
    body.addEventListener("touchcancel", (() => {
        isActive = false;
    }));
    body.addEventListener("touchmove", (e => {
        if (!isActive) return;
        let x;
        let i;
        for (i = 0; i < e.changedTouches.length; i++) x = e.changedTouches[i].pageX;
        x -= sliderChange.getBoundingClientRect().left;
        if (body.offsetWidth > 768) beforeAfterSlider(x); else beforeAfterSlider2(x);
    }));
    let center = [ 59.93851438907043, 30.320236566940984 ];
    let centerTablet = [ 59.938630501491836, 30.32308896079849 ];
    function initPc() {
        let map = new ymaps.Map("map-test", {
            center,
            zoom: 16
        });
        let placemark = new ymaps.Placemark(center, {}, {
            iconLayout: "default#image",
            iconImageHref: "../../img/map/map.png",
            iconImageSize: [ 113, 106 ],
            iconImageOffset: [ 70, -105 ]
        });
        map.controls.remove("geolocationControl");
        map.controls.remove("searchControl");
        map.controls.remove("trafficControl");
        map.controls.remove("typeSelector");
        map.controls.remove("fullscreenControl");
        map.controls.remove("zoomControl");
        map.controls.remove("rulerControl");
        map.behaviors.disable([ "scrollZoom" ]);
        map.geoObjects.add(placemark);
    }
    function initTablet() {
        let map = new ymaps.Map("map-test", {
            center: centerTablet,
            zoom: 15.5
        });
        let placemark = new ymaps.Placemark(centerTablet, {}, {
            iconLayout: "default#image",
            iconImageHref: "../../img/map/map.png",
            iconImageSize: [ 113, 106 ],
            iconImageOffset: [ -60, -95 ]
        });
        map.controls.remove("geolocationControl");
        map.controls.remove("searchControl");
        map.controls.remove("trafficControl");
        map.controls.remove("typeSelector");
        map.controls.remove("fullscreenControl");
        map.controls.remove("zoomControl");
        map.controls.remove("rulerControl");
        map.behaviors.disable([ "scrollZoom" ]);
        map.geoObjects.add(placemark);
    }
    function initMobile() {
        let map = new ymaps.Map("map-test", {
            center: centerTablet,
            zoom: 15.5
        });
        let placemark = new ymaps.Placemark(centerTablet, {}, {
            iconLayout: "default#image",
            iconImageHref: "../../img/map/map.png",
            iconImageSize: [ 57, 53 ],
            iconImageOffset: [ -30, -43 ]
        });
        map.controls.remove("geolocationControl");
        map.controls.remove("searchControl");
        map.controls.remove("trafficControl");
        map.controls.remove("typeSelector");
        map.controls.remove("fullscreenControl");
        map.controls.remove("zoomControl");
        map.controls.remove("rulerControl");
        map.behaviors.disable([ "scrollZoom" ]);
        map.geoObjects.add(placemark);
    }
    if (body.offsetWidth > 992) ymaps.ready(initPc); else if (body.offsetWidth < 992 && body.offsetWidth > 768) ymaps.ready(initTablet); else ymaps.ready(initMobile);
    window["FLS"] = true;
    isWebp();
    menuInit();
})();