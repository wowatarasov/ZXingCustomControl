# ZXingCustomControl
SAPUI5 /UI5 Custom Control for ZXing BarcodeReader Library 

# In das eigene Projekt übernehmen

## Voraussetzung

* Ein SAPUI5 Projekt sollte vorhanden sein.

## Vorgehen

* Die Ordner control und lib in das webapp Verzeichnis kopieren.
* In der Datei control/CustomBarcodeReader.js muss die Referenz angepasst werden.
* In die View wechseln, an der das Control platziert werden soll.

```
<custom:CustomBarcodeReader id="barcodeReaderCustomControl"/>
```

* In den Controller wechseln und in das Event wechseln, an der das Control eine Funktion ausführt.

Es gibt zwei unterschiedliche Scanner. Einer für EANs und einen für QR-Codes. 

EAN Scanner: 
```
this.camera = this.getView().byId("barcodeReaderCustomControl");
this.camera.startBarcodeReader(function(scanResult){
    // scanResult beinhaltet den Code
}.bind(this));	
```

QR-Code Scanner:
```
this.camera = this.getView().byId("barcodeReaderCustomControl");
this.camera.startQRReader(function(scanResult){
    // scanResult beinhaltet den Code
}.bind(this));	
```

3. Nachdem Scannen wird die Kamera automatisch wieder beendet. 
4. Wenn das Control in einem Dialog geschlossen wird, sollte der laufende Stream beendet werden

```
this.camera.stopStream();
```