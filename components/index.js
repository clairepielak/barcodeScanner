"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var scandit_web_datacapture_core_1 = require("scandit-web-datacapture-core");
var scandit_web_datacapture_barcode_1 = require("scandit-web-datacapture-barcode");
var trackedBarcodes = {};
var barcodeTracking = null;
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var view, context, camera, cameraSettings, settings, doneButton, resetButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    view = new scandit_web_datacapture_core_1.DataCaptureView();
                    view.connectToElement(document.getElementById('data-capture-view'));
                    view.showProgressBar();
                    return [4 /*yield*/, (0, scandit_web_datacapture_core_1.configure)({
                            licenseKey: 'AvHksWH0RbwJD5nC6gk0L3I14pFUOfSbEShRnNUqJSqqRkYbwmwhRMoqvtAKOWnaOH2h45dIYThDA80ET1029M9hX3UeAKW8yEcNdTtviXYxICGVRBqUuvUoNO8eQJwG8ABSYzNdX08Zb0CGbVaKgsEiUe8UZ1E4un7FPIBAkvUgU1aR5nDHekFJkk0RX7RsGU6e21pDwxnLIcE3JU8MjYlNiF5BFRJQskGb5Bla6+nDaGl6t3D+LoRD/hNURL+U/FluQAYT3sljdlif+HqPu6JfzVdgdciMC0uRLoNpTQn+f526MXI4eQdw3EulUbovX2WOv8dyMXwXRYLKsV0dMaRpOToTMCzuRi42Qg14vwodMeB4ZiY7bzRkZz30dY1/hS+XyI5brKJ5Icv6jUHHA4ZfBD5iax3IsF2A5/lfWSEIffrz7m9NXPB7xne1eJDtKmLF9ZBjC1qMR95zziRLV9Bw1eUFRnLMGWRhiqhudU9mT/mkWk0n4rEIM4tFTGDBsAwXtZls0bUdcQxFI30lGQUPyNOZERs2pNuKsvbMI3UAT9t8fdZ5HVHs/DQgsy4ephHaTERi9RiJIPPZfQOUcylZoH4hRaWpRWISbTbePnw6m6weEXCAv6VGB0PR/GHAlCdNdexvMuc/vmSQR0Lj5O9bTAlmeaw6DZ/VFUcRf6nsr6rDJZ0CC+0zUeibLSqIwMuw7J1BQx3BaqQn0VEa09g8STO4Y0K6KN6Zd4w1KBqFzv2IYvKXo66SjRTR/0NEesdZU+GFjJBNGjeWbd5subjxacPjWs37D8j+UvIaJ89/eWwPi+CSeofsTXq3PeUQmeqNn5UrfR7IEOq1AT9i0gtHmW8D/v3nk48M3fQnWE1i6+7kI+hXQ9meY5h6bIZq46pGQCbguleUYGqhViUxWTIKGFzO+U0K33RPLyKHSntngYErSyo/Bk94EAH74Yj5ncYLYtZsXfPUvifLnNooXXD32mgWdhYrtH0bgL+XcOWzAZo6R/Qv+8YkRuP/b/ztq0v/xjR06cWaBv6QKGAsNC2GhKGQXCPn9XEDS16qFzP4Imio5Uf0iv2rYB2h0QVhw31Vk01psjS+eWa0H0ht5XZnUH69lC6OmO/gMyYCxDeU6oTWv8Lu6Vwx9vZy81xRHjKtzLQwkzeBMzRp7Cu/xFRcHg0zn2+1YB00oMTGgeCmd9ZokUP5o9fTJTQse2FhGgGpJyzk',
                            libraryLocation: new URL('library/engine/', document.baseURI).toString(),
                            moduleLoaders: [(0, scandit_web_datacapture_barcode_1.barcodeCaptureLoader)({ highEndBlurryRecognition: true })],
                        })];
                case 1:
                    _a.sent();
                    view.setProgressBarPercentage(null);
                    view.setProgressBarMessage('Accessing Camera...');
                    return [4 /*yield*/, scandit_web_datacapture_core_1.DataCaptureContext.create()];
                case 2:
                    context = _a.sent();
                    return [4 /*yield*/, view.setContext(context)];
                case 3:
                    _a.sent();
                    camera = scandit_web_datacapture_core_1.Camera.default;
                    cameraSettings = scandit_web_datacapture_barcode_1.BarcodeTracking.recommendedCameraSettings;
                    return [4 /*yield*/, camera.applySettings(cameraSettings)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, context.setFrameSource(camera)];
                case 5:
                    _a.sent();
                    settings = scandit_web_datacapture_barcode_1.BarcodeTrackingSettings.forScenario(scandit_web_datacapture_barcode_1.BarcodeTrackingScenario.A);
                    settings.enableSymbologies([
                        scandit_web_datacapture_barcode_1.Symbology.DataMatrix,
                        scandit_web_datacapture_barcode_1.Symbology.Code39,
                        scandit_web_datacapture_barcode_1.Symbology.Code128,
                        scandit_web_datacapture_barcode_1.Symbology.InterleavedTwoOfFive,
                    ]);
                    return [4 /*yield*/, scandit_web_datacapture_barcode_1.BarcodeTracking.forContext(context, settings)];
                case 6:
                    barcodeTracking = _a.sent();
                    return [4 /*yield*/, barcodeTracking.setEnabled(true)];
                case 7:
                    _a.sent();
                    barcodeTracking.addListener({
                        didUpdateSession: function (barcodeTrackingMode, session) {
                            trackedBarcodes = session.trackedBarcodes;
                            processTrackedBarcodes();
                        },
                    });
                    view.addControl(new scandit_web_datacapture_core_1.CameraSwitchControl());
                    return [4 /*yield*/, scandit_web_datacapture_barcode_1.BarcodeTrackingBasicOverlay.withBarcodeTrackingForViewWithStyle(barcodeTracking, view, scandit_web_datacapture_barcode_1.BarcodeTrackingBasicOverlayStyle.Frame)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, camera.switchToDesiredState(scandit_web_datacapture_core_1.FrameSourceState.On)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, barcodeTracking.setEnabled(true)];
                case 10:
                    _a.sent();
                    view.hideProgressBar();
                    doneButton = document.getElementById('doneButton');
                    resetButton = document.getElementById('resetButton');
                    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener('click', resetScannerSession);
                    doneButton === null || doneButton === void 0 ? void 0 : doneButton.addEventListener('click', handleDoneButtonClick);
                    return [2 /*return*/];
            }
        });
    });
}
function processTrackedBarcodes() {
    var partNumberFound = false;
    var quantityFound = false;
    var supplierFound = false;
    var serialNumberFound = false;
    var lotNumberFound = false;
    for (var _i = 0, _a = Object.values(trackedBarcodes); _i < _a.length; _i++) {
        var trackedBarcode = _a[_i];
        var barcode = trackedBarcode.barcode;
        if (barcode.data) {
            switch (barcode.symbology) {
                case scandit_web_datacapture_barcode_1.Symbology.Code39:
                    if (barcode.data.startsWith('P') && !partNumberFound) {
                        setInputElementValue('partNumber', barcode.data.substring(1));
                        partNumberFound = true;
                    }
                    else if (barcode.data.startsWith('Q') && !quantityFound) {
                        setInputElementValue('quantity', parseInt(barcode.data.substring(1), 10).toString());
                        quantityFound = true;
                    }
                    else if (barcode.data.startsWith('V') && !supplierFound) {
                        setInputElementValue('supplier', barcode.data.substring(1));
                        supplierFound = true;
                    }
                    else if ((barcode.data.startsWith('S') || barcode.data.startsWith('4S')) &&
                        !serialNumberFound) {
                        setInputElementValue('serialNumber', barcode.data.substring(1));
                        serialNumberFound = true;
                    }
                    else if (barcode.data.startsWith('1T') && !lotNumberFound) {
                        setInputElementValue('lot', barcode.data.substring(2));
                        lotNumberFound = true;
                    }
                    break;
            }
        }
        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleDateString();
        var formattedTime = currentDate.toLocaleTimeString();
        if (partNumberFound &&
            quantityFound &&
            supplierFound &&
            serialNumberFound &&
            lotNumberFound) {
            barcodeTracking === null || barcodeTracking === void 0 ? void 0 : barcodeTracking.setEnabled(false);
            console.log('Date:', formattedDate);
            console.log('Time:', formattedTime);
            console.log('Part Number:', partNumberFound);
            console.log('Quantity:', quantityFound);
            console.log('Supplier:', supplierFound);
            console.log('Serial Number:', serialNumberFound);
            console.log('Lot number:', lotNumberFound);
            break;
        }
    }
}
function resetScannerSession() {
    var inputIds = ['partNumber', 'quantity', 'supplier', 'serialNumber', 'lot'];
    inputIds.forEach(function (id) { return setInputElementValue(id, ''); });
    trackedBarcodes = {};
    var canvas = document.getElementById('capturedImage');
    if (canvas) {
        var context = canvas.getContext('2d');
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    barcodeTracking === null || barcodeTracking === void 0 ? void 0 : barcodeTracking.setEnabled(true);
}
function handleDoneButtonClick() {
    processTrackedBarcodes();
    var trackedBarcodesArray = Object.values(trackedBarcodes);
    var partNumber = '';
    var quantity = '';
    var supplier = '';
    var serialNumber = '';
    var lotNumber = '';
    trackedBarcodesArray.forEach(function (trackedBarcode) {
        var barcode = trackedBarcode.barcode;
        if (barcode.data) {
            switch (barcode.symbology) {
                case scandit_web_datacapture_barcode_1.Symbology.Code39:
                    if (barcode.data.startsWith('P')) {
                        partNumber = barcode.data.substring(1);
                    }
                    else if (barcode.data.startsWith('Q')) {
                        quantity = parseInt(barcode.data.substring(1), 10).toString();
                    }
                    else if (barcode.data.startsWith('V')) {
                        supplier = barcode.data.substring(1);
                    }
                    else if (barcode.data.startsWith('S') ||
                        barcode.data.startsWith('4S')) {
                        serialNumber = barcode.data.substring(1);
                    }
                    else if (barcode.data.startsWith('1T')) {
                        lotNumber = barcode.data.substring(2);
                    }
                    break;
            }
            resetScannerSession();
        }
    });
    var currentDate = new Date();
    var formattedDate = currentDate.toLocaleDateString();
    var formattedTime = currentDate.toLocaleTimeString();
    var doneButton = document.getElementById('doneButton');
    if (partNumber && quantity && supplier && serialNumber && lotNumber) {
        console.log('Date:', formattedDate);
        console.log('Time:', formattedTime);
        console.log('Part Number:', partNumber);
        console.log('Quantity:', quantity);
        console.log('Supplier:', supplier);
        console.log('Serial Number:', serialNumber);
        console.log('Lot number:', lotNumber);
        doneButton.style.backgroundColor = '#007bff';
    }
    else {
        doneButton.style.backgroundColor = '#ffffff';
    }
    barcodeTracking === null || barcodeTracking === void 0 ? void 0 : barcodeTracking.setEnabled(false);
    setTimeout(function () {
        barcodeTracking === null || barcodeTracking === void 0 ? void 0 : barcodeTracking.setEnabled(true);
    }, 1000);
}
function setInputElementValue(id, value) {
    var input = document.getElementById(id);
    if (input) {
        input.value = value;
    }
}
run().catch(function (error) {
    console.error(error);
    alert(JSON.stringify(error, null, 2));
});
