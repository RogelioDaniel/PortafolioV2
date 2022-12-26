var PI = Math.PI

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var RATIO = WIDTH / HEIGHT;

// camera, scene and renderer
var FIELDVIEW = 60;
var NEAR = 1;
var FAR = 5000;
var CAMERA = new THREE.PerspectiveCamera(FIELDVIEW, RATIO, NEAR, FAR);

var SCENE = new THREE.Scene();
var RENDERER = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });

// update the scene ration on window resize
window.onresize = function() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    RATIO = WIDTH / HEIGHT;

    RENDERER.setSize(WIDTH, HEIGHT);
    
    CAMERA.aspect = RATIO;
    CAMERA.updateProjectionMatrix();
}


function loop() {
    render();
	setAcceleration();
    requestAnimationFrame(loop);
}

function render() {
    RENDERER.render(SCENE, CAMERA);
}

// lights
function createLights() {
    var hemisphereLight = new THREE.HemisphereLight(0xffffff);
	SCENE.add(hemisphereLight);
}

function init() {
	
	RENDERER.setSize(WIDTH, HEIGHT);
	document.getElementById('space').appendChild(RENDERER.domElement);
	
	// camera
	CAMERA.position.set(-500, 500, 0); //scene1
	CAMERA.lookAt(new THREE.Vector3(500, 0, 0));

	// CAMERA.position.set(-300, 200, 0); //scene2
	// CAMERA.lookAt(new THREE.Vector3(100, 0, 0));

	//CAMERA.position.set(600, 1500, 0); //scene3
	//CAMERA.lookAt(new THREE.Vector3(601, 0, 0));
	
	//CAMERA.position.set(-700, 700, 500);
	//CAMERA.lookAt(new THREE.Vector3(-300, 0, 500));
	
	createLights();

	window.millenniumFalcon = new THREE.Object3D();

	millenniumFalcon.add(createBody());
	millenniumFalcon.add(createRescueCapsules());
	millenniumFalcon.add(createCenterCylinder());
	millenniumFalcon.add(createBackCylinders());
	millenniumFalcon.add(createFronts());
	millenniumFalcon.add(createCockpit());
	millenniumFalcon.add(createUndercarriages());
	millenniumFalcon.add(createParable());
	
	SCENE.add(millenniumFalcon);

	//SCENE.add(createText());
	
	// move the Falcon to mouse coords
	window.onmousemove = handleMouseMove;
	// looping
	window.onclick = handleClick;
	// shoot
	window.onkeyup = handleKeyup;

	loop();
}

init();


//__________________________________
//  text

function createText() {

	var crawlText = new THREE.Object3D();
	var textMaterial = new THREE.MeshLambertMaterial({
		color: 0xfbd62a,
		//shading: THREE.FlatShading,
	});
	var maxLineWidth = 1100;
	var lineSpacing = 80; //spacing between the line height center and the next
	var currentLineCenter = 20;
	var minWordSpacing = finalWordSpacing = 40;
	var line = {
		content: [],
		currentWordWidth: [],
		wordsWidth: 0,
		wordsNumber: 0
	};
	
	// POSITION TITLE
	var title = document.getElementById('crawl-title').innerText.split(' ');	
	title.forEach(function(word) {
		var textGeo = new THREE.TextGeometry(word, {
			size: 90,
			height: 20,
			//curveSegments: 4,

			font: 'franklin gothic book',

			//bevelThickness: 2,
			//bevelSize: 1.5,
			//bevelEnabled: true,

			//material: 0,
			//extrudeMaterial: 1
		});

		var textMesh = new THREE.Mesh( textGeo, textMaterial );
		
		textGeo.computeBoundingBox();
		var wordWidth = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
		
		
		line.wordsWidth += wordWidth;
		line.currentWordWidth.push(wordWidth);
		line.wordsNumber += 1;
		line.content.push(textMesh);
		
		crawlText.add(textMesh);
	});
	
	positionWords(line.content, line.currentWordWidth, minWordSpacing, line.wordsWidth);
	newLine(2);
	
	//POSITION SUBTITLE
	var subtitle = document.getElementById('crawl-subtitle').innerText.split(' ');	
	subtitle.forEach(function(word) {
		var textGeo = new THREE.TextGeometry(word, {
			size: 90,
			height: 20,
			//curveSegments: 4,

			font: 'franklin gothic book',

			//bevelThickness: 2,
			//bevelSize: 1.5,
			//bevelEnabled: true,

			//material: 0,
			//extrudeMaterial: 1
		});

		var textMesh = new THREE.Mesh( textGeo, textMaterial );
		
		textGeo.computeBoundingBox();
		var wordWidth = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
		
		
		line.wordsWidth += wordWidth;
		line.currentWordWidth.push(wordWidth);
		line.wordsNumber += 1;
		line.content.push(textMesh);
		
		crawlText.add(textMesh);
	});
	

	positionWords(line.content, line.currentWordWidth, minWordSpacing, line.wordsWidth);
	newLine(2);
	
	// POSITION TEXT
	var text = document.getElementById('crawl-text').innerText.split(' ');	
	text.forEach(function(word) {
		
		var textGeo = new THREE.TextGeometry(word, {
			size: 70,
			height: 20,
			//curveSegments: 4,

			font: 'franklin gothic book',

			//bevelThickness: 2,
			//bevelSize: 1.5,
			//bevelEnabled: true,

			//material: 0,
			//extrudeMaterial: 1
		});

		var textMesh = new THREE.Mesh( textGeo, textMaterial );
		
		textGeo.computeBoundingBox();
		var wordWidth = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
		
		var isEndOfParagraph = word.slice(-1) === '.' && word.slice(-2, -1) !== 'r';
		var isEndOfLine = line.wordsWidth + wordWidth + (line.wordsNumber - 1) * minWordSpacing >= maxLineWidth;
		
		
		if(isEndOfLine && isEndOfParagraph) {	
			
			line.wordsWidth += wordWidth;
			line.currentWordWidth.push(wordWidth);
			line.wordsNumber += 1;
			line.content.push(textMesh);
			
			finalWordSpacing = (maxLineWidth - line.wordsWidth) / (line.wordsNumber - 1);
			
			positionWords(line.content, line.currentWordWidth, finalWordSpacing);
			newLine(2);
		} else if(isEndOfLine) {
			finalWordSpacing = (maxLineWidth - line.wordsWidth) / (line.wordsNumber - 1);
			
			positionWords(line.content, line.currentWordWidth, finalWordSpacing);
			newLine(1);
		} else if(isEndOfParagraph) {
			line.wordsWidth += wordWidth;
			line.currentWordWidth.push(wordWidth);
			line.wordsNumber += 1;
			line.content.push(textMesh);
			
			positionWords(line.content, line.currentWordWidth, minWordSpacing);
			newLine(2);
		}
		
		if(!isEndOfParagraph) {
			line.wordsWidth += wordWidth;
			line.currentWordWidth.push(wordWidth);
			line.wordsNumber += 1;
			line.content.push(textMesh);
		}
		
		crawlText.add(textMesh); //TODO try adding this out of the loop
	});
	

	function positionWords(textMeshes, currentWordWidth, spacing, wordsWidth) {
		if(wordsWidth) {
			var positionCounter = maxLineWidth / 2 - (wordsWidth + spacing * (textMeshes.length - 1)) / 2; //simulate text-align: center
		} else {
			var positionCounter = 0;
		}
		textMeshes.forEach(function(el, i) {
			el.position.x = positionCounter;
			el.position.y = - currentLineCenter;
			positionCounter += currentWordWidth[i] + spacing;
		});
	}
	function newLine(howMany) {
		line.wordsWidth = 0;
		line.currentWordWidth = [];
		line.wordsNumber = 0;
		line.content = [];
		
		currentLineCenter += lineSpacing * howMany;
	}
	
	// POSITION ADJUSTMENTS
	//smoother text
	//crawlText.computeVertexNormals(); 
	
	//center text
	var boundingBox = new THREE.Box3().setFromObject(crawlText);
	var centerOffset = - ( boundingBox.max.x - boundingBox.min.x ) / 2;
	crawlText.position.z = centerOffset;
	
	crawlText.position.y = 400;
	crawlText.position.x = 200;
	
	crawlText.rotation.z = - PI / 2;
	crawlText.rotation.x = - PI / 2;
	
	//handle text shadows
	// three js gradient as texture
	// https://stemkoski.github.io/Three.js/Text3D-Textures.html
	// https://gist.github.com/ekeneijeoma/1186920
	
	return crawlText;
}

function refreshText() {

	SCENE.remove( textMesh );
	createText();

}


//__________________________________
//  behaviour

var isLooping = false;
var horizontalCenter = WIDTH / 2;
var verticalCenter = HEIGHT / 2;
var mouseX, mouseY;

function handleKeyup(e) {
    if (e.keyCode == 32) {
		shoot();
    }
}

function handleClick(e) {
	shoot();
	//loopityLoop(e);
}

function handleMouseMove(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
	
	/*
	switch(scene) {
		case 1: 
			mouseFar();
			break;
		case 2:
			mouseClose();
			break;
		case 3:
			mouseMiddle();
			break;
	}
	*/
	
	mouseFar();
	//mouseClose();
}


function mouseFar() {
	var speed = 1;
	
	var posZ = (mouseX - horizontalCenter) / 1.5;
    TweenLite.to(millenniumFalcon.position, speed, {
        z: posZ
    });
    
	var posX = - (mouseY - verticalCenter) / verticalCenter * 50;
    TweenLite.to(millenniumFalcon.position, speed, {
        x: posX
    });
}


function mouseClose() {
    var speed = 1;
    
    /*
     * x = cos(phi) * h
     * <=> x / h = cos(phi)
     * <=> phi = arccos(x / h)
     * y = h - sin(phi) * h
     * <=> y = h * (1 - sin(arccos(x / h)))
     */
    var posZ = (mouseX - horizontalCenter) / 3.5;
    var posY = horizontalCenter * (1 - Math.sin(Math.acos(Math.abs(posZ) / horizontalCenter)));
    
    TweenLite.to(millenniumFalcon.position, speed, {
        z: posZ,
        y: posY
    });

    var mAngle = PI / 8;
    var mXrotation = -posZ / horizontalCenter * 3.5 * PI / 3;
    
    if ( ! isLooping) {
        TweenLite.to(millenniumFalcon.rotation, speed, {
            x: mXrotation
        }); 
    }
    
	var posX = - (mouseY - verticalCenter) / verticalCenter * 50;
    TweenLite.to(millenniumFalcon.position, speed, {
        x: posX
    });
}

function setAcceleration() {
	var speed = 0.5;
	var posZ = (mouseX - horizontalCenter) / 1.5;
	
	var maxAngle = PI / 3;
	var mXrotation = (posZ - millenniumFalcon.position.z) / horizontalCenter * maxAngle * 2;
    if ( ! isLooping) {
        TweenLite.to(millenniumFalcon.rotation, speed, {
            x: mXrotation
        }); 
    }
}

function shoot() {
    var speed = 0.5;
    
    var blasts = new THREE.Object3D();
    var blastTop = new THREE.Object3D();
    var blastTopPos = new THREE.Vector3()
        .setFromMatrixPosition(shooterTop.matrixWorld);

    var blastWidth = 25;
    var blastCenter = new THREE.Mesh(
        new THREE.CylinderGeometry(.5, .5, blastWidth, 16),
        new THREE.MeshLambertMaterial({
            color: 0xffffff
        })
    );

    var blastHalo = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, blastWidth + 4, 16),
        haloMaterial(0xff0000)
    );

    blastTop.add(blastCenter);
    blastTop.add(blastHalo);

    blastTop.rotation.z = -PI / 2;
    blastTop.position.x = blastTopPos.x + blastWidth / 2 + 20;
    blastTop.position.y = blastTopPos.y + 3;
    blastTop.position.z = blastTopPos.z;
    
    blasts.add(blastTop);
    
    var blastBottomPos = new THREE.Vector3()
        .setFromMatrixPosition(shooterBottom.matrixWorld);
    var blastBottom = blastTop.clone();
    blastBottom.rotation.z = -PI / 2;
    blastBottom.position.x = blastBottomPos.x + blastWidth / 2 + 20;
    blastBottom.position.y = blastBottomPos.y - 3;
    blastBottom.position.z = blastBottomPos.z;
    blasts.add(blastBottom);
    
    SCENE.add(blasts);
    
    TweenLite.to(blasts.position, speed, {
        x: 1000,
        ease: Linear.ease,
        onComplete: function() {
            SCENE.remove(blasts)
        }
    });
}

function loopityLoop(e) {

    if ( ! isLooping) {
        isLooping = true;

        var originalXrotation = millenniumFalcon.rotation.x;
        var speed = 2;

        var mXrotation = originalXrotation;

        if (e.pageX <= horizontalCenter) {
            mXrotation -= 2 * PI;
        } else {
            mXrotation += 2 * PI;
        }

        TweenLite.to(millenniumFalcon.rotation, speed, {
            x: mXrotation,
            ease: Back.easeOut,
            onComplete: function() {
                millenniumFalcon.rotation.x = originalXrotation
                isLooping = false
            }
        });
    }
}