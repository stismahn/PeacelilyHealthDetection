/* variables */
var model;
var canvas;
var classNames = [];
var mode;


/* get the prediction */
function getFrame() {
    /* resize image to 150x150*/
    var img = document.getElementById("imageToPredict");
    img.style.width = "150px";
    img.style.height = "150px";

    /* get resized image */
    var imageToPredict = document.getElementById("imageToPredict");
    var imageTensor = tf.browser.fromPixels(imageToPredict);

    // insert a dimension into the tensor's shape – we need 4 dimension, but there are only 3 currently
    var preprocessedInput = imageTensor.expandDims();

    //get the prediction 
    var pred = model.predict(preprocessedInput);
    var readable_output = pred.dataSync();
    var array =  Array.prototype.slice.call(readable_output);
    var status = array[0];
    checkStatus(status);
}

function checkStatus(status) {
    var statusHeadline = document.getElementById("lily-message__status");
    var statusText = document.getElementById("lily-message__tipp");
    var statusImage = document.getElementById("lily-img");

    if (status == 1) {
        statusHeadline.innerHTML = "Healthy";
        statusText.innerHTML = "Keep up the good work! Your peace lily is in good shape.";
        statusImage.style.backgroundImage = "url('./img/lily.jpg')";
    } else if (status == 0) {
        statusHeadline.innerHTML = "Dry";
        statusText.innerHTML = "Your peace lily seems to be in need of water. Get your watering can and do your job!";
        statusImage.style.backgroundImage = "url('./img/dry.jpg')";
    }
}


/* load the class names */
async function loadDict() {
    loc = 'model/class_names.txt'
    
    await $.ajax({
        url: loc,
        dataType: 'text',
    }).done(success);
}


/* load the class names */
function success(data) {
    var lst = data.split(/\n/)
    for (var i = 0; i <= lst.length - 1; i++) {
        let symbol = lst[i];
        classNames[i] = symbol;
    }
}

async function start() {
    //load the model 
    model = await tf.loadLayersModel('model/model.json')
    
    //load the class names
    await loadDict()
}

document.addEventListener("DOMContentLoaded", function(event) {
    start();
});


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
        $('#imageToPredict')
            .width(150)
            .height(150);
        };
        reader.readAsDataURL(input.files[0]);
    }
}