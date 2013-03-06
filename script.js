(function() {
	var capture     = document.querySelector('#capture'),
	photos          = document.querySelector('#photos'),
	start           = document.querySelector('#start'),
	stop            = document.querySelector('#stop'),
	counter         = 0,
	strDownloadMime = "image/octet-stream";

	var webcam = new WebCam('#video', '#canvas', {width: 620});
 
	start.addEventListener('click', function(ev){
		webcam.start();

	});

	stop.addEventListener('click', function(ev){
		webcam.stop();
	});
	
	capture.addEventListener('click', function(ev){
		if(!webcam.streaming) {
			return;
		}

		var data   = webcam.capture(),
		img        = document.createElement('img'),
		a          = document.createElement('a'),
		id         = 'image_' + counter++;
		
		a.target   = '_blank',
		a.title    = 'Click to Save',
		img.id     = id,
		img.src    = data,
		img.alt    = 'Click to Save',
		a.download = id,
		a.href     = data;

		a.appendChild(img);
		photos.appendChild(a);
		
		ev.preventDefault();
	}, false);

})();