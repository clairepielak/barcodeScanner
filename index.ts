import {
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  configure,
} from "scandit-web-datacapture-core";
import {
  BarcodeTrackingSession,
  TrackedBarcode,
} from 'scandit-web-datacapture-barcode';
import {
  BarcodeTracking,
  BarcodeTrackingBasicOverlay,
  BarcodeTrackingBasicOverlayStyle,
  BarcodeTrackingScenario,
  BarcodeTrackingSettings,
  Symbology,
  barcodeCaptureLoader,
} from 'scandit-web-datacapture-barcode';



let trackedBarcodes: Record<string, TrackedBarcode> = {};
let barcodeTracking: BarcodeTracking | null = null;

async function run(): Promise<void> {
 

  const view: DataCaptureView = new DataCaptureView();
  view.connectToElement(document.getElementById('data-capture-view')!);
  view.showProgressBar();

  await configure({
    licenseKey: 'AvHksWH0RbwJD5nC6gk0L3I14pFUOfSbEShRnNUqJSqqRkYbwmwhRMoqvtAKOWnaOH2h45dIYThDA80ET1029M9hX3UeAKW8yEcNdTtviXYxICGVRBqUuvUoNO8eQJwG8ABSYzNdX08Zb0CGbVaKgsEiUe8UZ1E4un7FPIBAkvUgU1aR5nDHekFJkk0RX7RsGU6e21pDwxnLIcE3JU8MjYlNiF5BFRJQskGb5Bla6+nDaGl6t3D+LoRD/hNURL+U/FluQAYT3sljdlif+HqPu6JfzVdgdciMC0uRLoNpTQn+f526MXI4eQdw3EulUbovX2WOv8dyMXwXRYLKsV0dMaRpOToTMCzuRi42Qg14vwodMeB4ZiY7bzRkZz30dY1/hS+XyI5brKJ5Icv6jUHHA4ZfBD5iax3IsF2A5/lfWSEIffrz7m9NXPB7xne1eJDtKmLF9ZBjC1qMR95zziRLV9Bw1eUFRnLMGWRhiqhudU9mT/mkWk0n4rEIM4tFTGDBsAwXtZls0bUdcQxFI30lGQUPyNOZERs2pNuKsvbMI3UAT9t8fdZ5HVHs/DQgsy4ephHaTERi9RiJIPPZfQOUcylZoH4hRaWpRWISbTbePnw6m6weEXCAv6VGB0PR/GHAlCdNdexvMuc/vmSQR0Lj5O9bTAlmeaw6DZ/VFUcRf6nsr6rDJZ0CC+0zUeibLSqIwMuw7J1BQx3BaqQn0VEa09g8STO4Y0K6KN6Zd4w1KBqFzv2IYvKXo66SjRTR/0NEesdZU+GFjJBNGjeWbd5subjxacPjWs37D8j+UvIaJ89/eWwPi+CSeofsTXq3PeUQmeqNn5UrfR7IEOq1AT9i0gtHmW8D/v3nk48M3fQnWE1i6+7kI+hXQ9meY5h6bIZq46pGQCbguleUYGqhViUxWTIKGFzO+U0K33RPLyKHSntngYErSyo/Bk94EAH74Yj5ncYLYtZsXfPUvifLnNooXXD32mgWdhYrtH0bgL+XcOWzAZo6R/Qv+8YkRuP/b/ztq0v/xjR06cWaBv6QKGAsNC2GhKGQXCPn9XEDS16qFzP4Imio5Uf0iv2rYB2h0QVhw31Vk01psjS+eWa0H0ht5XZnUH69lC6OmO/gMyYCxDeU6oTWv8Lu6Vwx9vZy81xRHjKtzLQwkzeBMzRp7Cu/xFRcHg0zn2+1YB00oMTGgeCmd9ZokUP5o9fTJTQse2FhGgGpJyzk',
    libraryLocation: new URL('library/engine/', document.baseURI).toString(),
    moduleLoaders: [barcodeCaptureLoader({ highEndBlurryRecognition: true })],
  });

  view.setProgressBarPercentage(null);
  view.setProgressBarMessage('Accessing Camera...');

  const context: DataCaptureContext = await DataCaptureContext.create();
  await view.setContext(context);

  const camera: Camera = Camera.default;
  const cameraSettings = BarcodeTracking.recommendedCameraSettings;
  await camera.applySettings(cameraSettings);
  await context.setFrameSource(camera);

  const settings: BarcodeTrackingSettings = BarcodeTrackingSettings.forScenario(
    BarcodeTrackingScenario.A
  );
  settings.enableSymbologies([
    Symbology.DataMatrix,
    Symbology.Code39,
    Symbology.Code128,
    Symbology.InterleavedTwoOfFive,
  ]);

  barcodeTracking = await BarcodeTracking.forContext(context, settings);
  await barcodeTracking.setEnabled(true);

  barcodeTracking.addListener({
    didUpdateSession: (
      barcodeTrackingMode: BarcodeTracking,
      session: BarcodeTrackingSession
    ) => {
      trackedBarcodes = session.trackedBarcodes;
      processTrackedBarcodes();
    },
  });

  view.addControl(new CameraSwitchControl());
  await BarcodeTrackingBasicOverlay.withBarcodeTrackingForViewWithStyle(
    barcodeTracking,
    view,
    BarcodeTrackingBasicOverlayStyle.Frame
  );

  await camera.switchToDesiredState(FrameSourceState.On);
  await barcodeTracking.setEnabled(true);
  view.hideProgressBar();

  const doneButton = document.getElementById('doneButton');
  const resetButton = document.getElementById('resetButton');
 

  resetButton?.addEventListener('click', resetScannerSession);
  doneButton?.addEventListener('click', handleDoneButtonClick);
}

function processTrackedBarcodes(): void {
  let partNumberFound = false;
  let quantityFound = false;
  let supplierFound = false;
  let serialNumberFound = false;
  let lotNumberFound = false;

  for (const trackedBarcode of Object.values(trackedBarcodes)) {
    const { barcode } = trackedBarcode;
    if (barcode.data) {
      switch (barcode.symbology) {
        case Symbology.Code39:
          if (barcode.data.startsWith('P') && !partNumberFound) {
            setInputElementValue('partNumber', barcode.data.substring(1));
            partNumberFound = true;
          } else if (barcode.data.startsWith('Q') && !quantityFound) {
            setInputElementValue(
              'quantity',
              parseInt(barcode.data.substring(1), 10).toString()
            );
            quantityFound = true;
          } else if (barcode.data.startsWith('V') && !supplierFound) {
            setInputElementValue('supplier', barcode.data.substring(1));
            supplierFound = true;
          } else if (
            (barcode.data.startsWith('S') || barcode.data.startsWith('4S')) &&
            !serialNumberFound
          ) {
            setInputElementValue('serialNumber', barcode.data.substring(1));
            serialNumberFound = true;
          } else if (barcode.data.startsWith('1T') && !lotNumberFound) {
            setInputElementValue('lot', barcode.data.substring(2));
            lotNumberFound = true;
          }
          break;
      }
    }
   
    
    const doneButton = document.getElementById('doneButton') as HTMLButtonElement;
    if (
      partNumberFound &&
      quantityFound &&
      supplierFound &&
      serialNumberFound &&
      lotNumberFound
    ) {
      const audio = document.getElementById('playBeep') as HTMLAudioElement;
      audio.play;
      
      barcodeTracking?.setEnabled(false);
      doneButton.style.backgroundColor = '#007bff';
  }else{
    doneButton.style.backgroundColor = '#ffffff';
  }
    
  }
}

function resetScannerSession(): void {
  const inputIds = ['partNumber', 'quantity', 'supplier', 'serialNumber', 'lot'];
  inputIds.forEach((id) => setInputElementValue(id, ''));

  trackedBarcodes = {};

  const canvas = document.getElementById('capturedImage') as HTMLCanvasElement;
  if (canvas) {
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  
  barcodeTracking?.setEnabled(true);
}

function handleDoneButtonClick(): void {
  processTrackedBarcodes();
  

  const trackedBarcodesArray = Object.values(trackedBarcodes);
  let partNumber = '';
  let quantity = '';
  let supplier = '';
  let serialNumber = '';
  let lotNumber = '';

  trackedBarcodesArray.forEach((trackedBarcode) => {
    const { barcode } = trackedBarcode;
    if (barcode.data) {
      switch (barcode.symbology) {
        case Symbology.Code39:
          if (barcode.data.startsWith('P')) {
            partNumber = barcode.data.substring(1);
          } else if (barcode.data.startsWith('Q')) {
            quantity = parseInt(barcode.data.substring(1), 10).toString();
          } else if (barcode.data.startsWith('V')) {
            supplier = barcode.data.substring(1);
          } else if (
            barcode.data.startsWith('S') ||
            barcode.data.startsWith('4S')
          ) {
            serialNumber = barcode.data.substring(1);
          } else if (barcode.data.startsWith('1T')) {
            lotNumber = barcode.data.substring(2);
          }
          break;
      }
      resetScannerSession();
    }
  });
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();
  
  if (partNumber && quantity && supplier && serialNumber && lotNumber) {
    console.log('Date:', formattedDate);
    console.log('Time:', formattedTime);
    console.log('Part Number:', partNumber);
    console.log('Quantity:', quantity);
    console.log('Supplier:', supplier);
    console.log('Serial Number:', serialNumber);
    console.log('Lot number:', lotNumber);
  }
  const doneButton = document.getElementById('doneButton') as HTMLButtonElement;
  doneButton.style.backgroundColor = '#ffffff';
  barcodeTracking?.setEnabled(false);
  setTimeout(() => {
    barcodeTracking?.setEnabled(true);
  }, 1000);
  
}


function setInputElementValue(id: string, value: string): void {
  const input = document.getElementById(id) as HTMLInputElement;
  if (input) {
    input.value = value;
  }
}

run().catch((error: unknown) => {
  console.error(error);
  alert(JSON.stringify(error, null, 2));
});


