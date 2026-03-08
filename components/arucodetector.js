import ARCS from '../build/arcs.js';
import CV from '../deps/cv/index.js';
import AR from '../deps/aruco/index.js';

let ARUCODetector;

/**
    * @class ARUCODetector
    * @classdesc Component that detects ARUCO markers in images
    * This component encapsulate the {@link https://github.com/jcmellado/js-aruco|js-aruco} library.
    */
ARUCODetector = ARCS.Component.create(
    function () {
        let detector;

        /*TODO #1a Instanciate here the detector */
        detector = new AR.Detector();

        /**
            * Detects ARUCO markers in the given image.
            * If markers are detected, this slot triggers the signal <b>onMarkers</b>.
            * @param image {obj} the image in which markers should be detected
            * @emits onMarkers
            * @function ARUCODetector#detect
            * @slot
            */
        this.detect = function (image) {
            /*TODO #1b recover markers from image 
                *  then send they will be sent through onMarkers event
                */
            let markers = detector.detect(image);
            this.emit("onMarkers", markers);
            // this.emit("onMarkers",markers);
        };

        /**
            * Signal that is emitted when markers are detected in an image.
            * @function ARUCODetector#onMarkers
            * @param markers {Marker[]} Array of detected markers.
            * @signal
            */

        /**
            * @typedef {Object} Marker
            * @property {number} id - marker id
            * @property {Object} pose - computed pose for the marker
            * @property {number[]} pose.rotation - rotation matrix (3x3)
            * @property {number[]} pose.position - translation (3 components)
            */

    },
    'detect',
    ['onMarkers']
);

export default { ARUCODetector: ARUCODetector };
