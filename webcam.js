/*
 * HTML5 Webcam API Wrapper
 * Author: Gaurav Sharma (gks2480@gmail.com)
 */
!function(global){
	
	'use strict';
	
	function WebCam(video, canvas, settings){
		this.streaming = false,
		this.video     = document.querySelector(video),
		this.canvas    = document.querySelector(canvas),
		this.settings  = settings || {},
		this.initEvents();
	}

	WebCam.init = (function(){
		navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	})();
	
  	WebCam.prototype = {

		//start webcam
		start: function(){
			var video = this.video;
			navigator.getMedia({
					video: true,
					audio: false
				},

				function(stream) {
					if (navigator.mozGetUserMedia) {
						video.mozSrcObject = stream;
					} else {
						var vendorURL = window.URL || window.webkitURL;
						video.src = vendorURL.createObjectURL(stream);
					}
					video.play();
				},

				function(err) {
					console.log("An error occured! " + err);
				}
			);
		},
		
		//stop webcam
		stop: function(){
			var video = this.video;

			this.streaming = false;
			video.pause();
			
			if(navigator.getUserMedia){
				video.src = null;
			} else if(navigator.mozGetUserMedia){
				video.mozSrcObject = null;
			} else {
				video.src = "";
			}
		},
		
		//capture image
		capture: function(){
			var width = this.canvas.getAttribute('width'),
			height    = this.canvas.getAttribute('height');

		    canvas.getContext('2d').drawImage(this.video, 0, 0, width, height);
		    return canvas.toDataURL('image/png');
		},
		
		//initialize events
		initEvents: function(){
			var video = this.video,
			width     = this.settings.width,
			height    = 0,
			self      = this;

			video.addEventListener('canplay', function(ev){
				if (!self.streaming) {
					height = video.videoHeight / (video.videoWidth/width);
					video.setAttribute('width', width);
					video.setAttribute('height', height);
					canvas.setAttribute('width', width);
					canvas.setAttribute('height', height);
					self.streaming = true;
				}
			}, false);
		}
	}	

	global.WebCam = WebCam;

}(this);