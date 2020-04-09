sap.ui.define([
	"sap/ui/core/Control",
	"com/advades/sigscanner/util/ZXing"
], function (Control) {
	"use strict";

	return Control.extend("com.advades.sigscanner.control.CustomBarcodeReader", {

		barcodeReader: null,
		selectedDevices: null,

		metadata: {
			properties: {
				width: {
					type: "sap.ui.core.CSSSize",
					defaultValue: "100%"
				},
				height: {
					type: "sap.ui.core.CSSSize",
					defaultValue: "100%"
				},
				border: {
					type: "String",
					defaultValue: "1px solid gray;"
				}
			},
			aggregations: {},
			events: {
				onScanFinished: {

				}
			}
		},

		startBarcodeReader: function(success,error){
			this.barcodeReader = new ZXing.BrowserBarcodeReader();
			this.barcodeReader.getVideoInputDevices()
				.then(function (devices) {
					this.selectedDevices = devices;
					this.barcodeReader.decodeOnceFromVideoDevice(undefined,"video")
						.then(function(scanResult){
							success(scanResult);
							this.stopStream();
						}.bind(this)).catch(function(errorMessage){
							error(errorMessage);
						}.bind(this));
				}.bind(this))
				.catch(function (oError) {
					error();
				}.bind(this));	
		},
		
		startQRReader: function(success,error){
			this.barcodeReader = new ZXing.BrowserQRCodeReader();
			this.barcodeReader.getVideoInputDevices()
				.then(function (devices) {
					this.selectedDevices = devices;
					this.barcodeReader.decodeFromInputVideoDevice(undefined,"video")
						.then(function(scanResult){
							success(scanResult);
							this.stopStream();
						}.bind(this)).catch(function(errorMessage){
							error(errorMessage);
						}.bind(this));
				}.bind(this))
				.catch(function (oError) {
					error();
				}.bind(this));	
		},

		getAvailableDevices: function (fSuccesCallback, fErrorCallback) {
			this.barcodeReader = new ZXing.BrowserBarcodeReader();
			this.barcodeReader.getVideoInputDevices().then(function (aDevices) {
				this.selectedDevices = aDevices;
				if (fSuccesCallback) {
					fSuccesCallback(aDevices);
				}
			}.bind(this)).catch(function (oError) {
				if (fErrorCallback) {
					fErrorCallback();
				}
			});
		},
		
		stopStream: function(){
			if(this.selectedDevices.length>0){
				var stream = this.barcodeReader.stream;
				var tracks = stream.getTracks();
				tracks.forEach(function(track){
					track.stop();
				});
			}
		},

		connectToDevice: function (fSuccesCallback,fErrorCallback) {
			this.barcodeReader.decodeOnceFromVideoDevice(undefined,"video").then(function (result) {
				if (fSuccesCallback) {
					fSuccesCallback(result.text);
				}
				this.barcodeReader.reset();
			}.bind(this)).catch(function (err) {
				if (fErrorCallback) {
					fErrorCallback();
				}
			  this.barcodeReader.reset();
			}.bind(this));
		},
		
		resetBarcodeReader: function (){
			this.barcodeReader.reset();
		},
		
		renderer: function (dom, oControl) {
			dom.write("<div>");
				dom.write("<video id='video' width='300px' height='300px' style='border: 1px solid gray' />");
				dom.writeStyles();
				dom.writeClasses();
			dom.write("</div>");
		},

		onAfterRendering: function () {
			//if I need to do any post render actions, it will happen here
			if (sap.ui.core.Control.prototype.onAfterRendering) {
				sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments); //run the super class's method first
			}
		}
	});
});