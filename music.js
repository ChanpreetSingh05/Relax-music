var app=null;
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
    if (index == 0) {
        clear();
        stars();
    } else if (index == 1) {
        clear();
        initPixi();
    } else if (index == 2) {
        clear();
        createRain();
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
//        $('#rain').append('<img src="Images/rain1.jpg" alt ="rain" class="night img-fluid img-responsive"/>');

    $("body").css({
        "background-image": 'url(Images/rain1.jpg)',
        "background-size": 'cover',
    
'-webkit-background-size': '100%', 
'-moz-background-size': '100%', 
'-o-background-size': '100%',
'background-size': '100%', 
'-webkit-background-size': 'cover', 
'-moz-background-size': 'cover', 
'-o-background-size': 'cover',
'background-size': 'cover',
    });
    for (i = 0; i < nbDrop; i++) {
        var dropLeft = randRange(0, 2000);
        var dropTop = randRange(-1000, 1500);
        $('#rain').append('<div class="drop" id="drop' + i + '"></div>');
        $('#drop' + i).css('left', dropLeft);
        $('#drop' + i).css('top', dropTop);
    }
}

function createSnow() {
    $("body").css({
        "background-image": 'url(Images/snow.jpg)',
        "background-size": 'cover',
        "background-repeat": 'no-repeat',
    });
    for (i = 0; i < nbDrop; i++) {
        var dropLeft = randRange(0, 3000);
        var dropTop = randRange(-1000, 2000);

        $('#rain').append('<div class="snowdrop" id="snowdrop' + i + '"></div>');
        $('#snowdrop' + i).css('left', dropLeft);
        $('#snowdrop' + i).css('top', dropTop);
    }
}

function stars() {
    $("body").css({
        "background-color": 'black',
        "background-size": 'cover',
        "background-repeat": 'no-repeat',
    });
    $('#night').append('<div class="stars"></div><div class="twinkling"></div><div class="clouds"></div>');
}

function clear() {
    //$0.remove();
    if(prev == 1){
     app.destroy();
     $("canvas").css({
        "width": '0',
        "height": '0',
        });
        }
    $("body").css({"background": '',});
    $('.night').remove();
    $('.snowdrop').remove();
    $('.drop').remove();
    $('.stars').remove();
    $('.twinkling').remove();
    $('.clouds').remove();
}
