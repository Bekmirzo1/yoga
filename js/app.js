'use strict';
// *Эта функция проверяет поддерживается ли браузером формат изображения webp и если поддерживается, то эта функция добавляет из css-документа внутрь html-документа класс с изобажением формата webp
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});


// *iconMenu
let menuBody = document.querySelector('.menu__body');
let iconMenu = document.querySelector('.icon-menu');
if (iconMenu) {
    iconMenu.addEventListener('click', function () {
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    })
}

const musicItemParent = document.querySelector('.deep__musics');
const musicItems = musicItemParent.querySelectorAll('.musics-deep__item');
if (musicItems.length > 0) {
    for (let index = 0; index < musicItems.length; index++) {
        const musicItem = musicItems[index];
        const audio = musicItem.querySelector('audio');
        if (audio) {
            const musicControl = musicItem.querySelector('.musics-deep__play');
            const playMusic = musicControl.querySelector('.musics-deep__play-triangle');
            const pauseMusic = musicControl.querySelector('.musics-deep__play-pause');
            pauseMusic.classList.add('_hide')
            musicControl.addEventListener('click', function () {
                if (pauseMusic.classList.contains('_hide')) {
                    const otherMusics = musicItemParent.querySelectorAll('.musics-deep__play-triangle._hide');
                    if (otherMusics.length > 0) {
                        for (let index = 0; index < otherMusics.length; index++) {
                            const otherMusic = otherMusics[index];
                            otherMusic.classList.remove('_hide');
                            otherMusic.nextElementSibling.classList.add('_hide')
                            const audio = otherMusic.closest('.musics-deep__item').querySelector('audio');
                            audio.pause();
                        }
                    }
                    playMusic.classList.add('_hide')
                    pauseMusic.classList.remove('_hide')
                    audio.play();
                } else if (!pauseMusic.classList.contains('_hide')) {
                    playMusic.classList.remove('_hide')
                    pauseMusic.classList.add('_hide')
                    audio.pause();
                }
            });
        }
    }
}

// header dedisappearance/appearance on scroll
const header = document.querySelector('.header');
if (header) {
    let lastScrollValue = 0;
    const scrollPosition = () => window.pageYOffset;
    const defaultOffset = 300;
    window.addEventListener('scroll', function () {
        if (scrollPosition() > lastScrollValue && !header.classList.contains('_hide') && scrollPosition() > defaultOffset) {
            header.classList.add('_hide')
        } else if (scrollPosition() < lastScrollValue && header.classList.contains('_hide')) {
            header.classList.remove('_hide')
        }
        lastScrollValue = scrollPosition();
    });
}
// *Animation on scroll
const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = animItem.getBoundingClientRect().top + pageYOffset;
			const animStart = 4;
			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_anim')
			}
		}
	}
	setTimeout(() => {
		animOnScroll();
	}, 300);
}

// * Минни версия Динамического адаптива
const parent_original = document.querySelector('.row-meditation');
const parent = document.querySelector('.meditation__container');
const item = document.querySelector('.row-meditation__column_img');
function dinamicAdaptive(e) {
	if (e.matches) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[1])
			item.classList.add('done')
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[3])
			item.classList.remove('done')
		}
	}
}
const mediaWidth = window.matchMedia('(max-width: 991.98px)');
mediaWidth.addListener(dinamicAdaptive)
dinamicAdaptive(mediaWidth);