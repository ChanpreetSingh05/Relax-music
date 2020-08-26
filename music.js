var app = null;
var nbDrop = 800;
var image;
var prev = 5;
window.addEventListener('load', () => {
    var sounds = document.querySelectorAll(".music");
    var keys = document.querySelectorAll(".keys div");

    keys.forEach((key, index) => {
        key.addEventListener("click", function () {
            if (prev == 5) {
                sounds[index].play();
                sounds[index].loop = true;
                back(index);
                prev = index;
            } else if (index != prev) {
                sounds[prev].pause();
                sounds[prev].currentTime = 0;
                sounds[index].play();
                sounds[index].loop = true;
                back(index);
                prev = index;
            } else {
                sounds[index].pause();
                sounds[index].currentTime = 0;
                clear();
            }
        });
    });
});

function back(index) {

    //    var x = window.matchMedia("(max-width: 400px)");


    if (index == 0) {
        clear();
        stars();
    } else if (index == 1) {
        clear();
        initPixi();
    } else if (index == 2) {
        clear();
        createRain();
        //        x.addListener(createRain);
    } else if (index == 3) {
        clear();
        createSnow();
    }
}

function initPixi() {
    app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight
    });
    document.body.appendChild(app.view);
    //document.body.removeChild(app.view);
    image = new PIXI.Sprite.from("Images/water1.jpg");
    image.width = window.innerWidth;
    image.height = window.innerHeight;
    app.stage.addChild(image);

    displacementSprite = new PIXI.Sprite.from("Images/cloud.jpg");
    displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    app.stage.addChild(displacementSprite);
    app.stage.filters = [displacementFilter];
    displacementFilter.autoFit = false;
    //app.renderer.view.style.transform = 'scale(1.02)';
    displacementSprite.scale.x = 4;
    displacementSprite.scale.y = 4;
    animate();

}

function animate() {
    displacementSprite.x += 4;
    displacementSprite.y += 4;
    requestAnimationFrame(animate);
}

function randRange(maxNum, minNum) {
    return (Math.floor(Math.random(10) * (maxNum - minNum + 1)) + minNum);
}

function createRain() {
    var dropLeft, dropTop;

    $("body").css({
        "background-image": 'url(Images/rain1.jpg)',
    });

    console.log($(window).width());
    for (i = 0; i < nbDrop; i++) {
        if ($(window).width() <= 500) {
            dropLeft = randRange(0, 370);
            dropTop = randRange(-1000, 1500);
        } else {
            dropLeft = randRange(0, 2000);
            dropTop = randRange(-1000, 1500);
        }
        $('#rain').append('<div class="drop" id="drop' + i + '"></div>');
        $('#drop' + i).css('left', dropLeft);
        $('#drop' + i).css('top', dropTop);
    }
}

function createSnow() {
    var dropLeft, dropTop;
    $("body").css({
        "background-image": 'url(Images/snow.jpg)',
    });
    for (i = 0; i < nbDrop; i++) {
        if ($(window).width() <= 500) {
            dropLeft = randRange(0, 370);
            dropTop = randRange(-1000, 2000);
        } else {
        dropLeft = randRange(0, 3000);
        dropTop = randRange(-1000, 2000);
        }

        $('#rain').append('<div class="snowdrop" id="snowdrop' + i + '"></div>');
        $('#snowdrop' + i).css('left', dropLeft);
        $('#snowdrop' + i).css('top', dropTop);
    }
}

function stars() {
    $("body").css({
        "background-color": 'black',
        //        "background-size": 'cover',
        //        "background-repeat": 'no-repeat',
        //        "background-position": 'center center',
        //        "background-attachment": 'fixed',
    });
    $('#night').append('<div class="stars"></div><div class="twinkling"></div><div class="clouds"></div>');
}

function clear() {
    //$0.remove();
    if (prev == 1) {
        app.destroy();
        $("canvas").css({
            "width": '0',
            "height": '0',
        });
    }
    $("body").css({
        "background-image": '',
        "background-color": '',
    });
    $('.night').remove();
    $('.snowdrop').remove();
    $('.drop').remove();
    $('.stars').remove();
    $('.twinkling').remove();
    $('.clouds').remove();
}
