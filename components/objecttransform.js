import ARCS from '../build/arcs.js';
import * as THREE from '../deps/three.js/index.js';

var ObjectTransform ;

/** 
    * @class ObjectTransform
    * @classdesc Apply transformations to objects
    */
ObjectTransform = ARCS.Component.create(
    function() {
        var objRoot;
        var refMat;
        var id = -1;

        /**
            * Sets the object of interest on which we would like to apply transforms.
            * @param obj {object} a Three.js Object3D
            * @function ObjectTransform#setObject
            */
        this.setObject = function (obj) {
            objRoot = new THREE.Object3D();
            obj.parent.add(objRoot);
            obj.parent.remove(obj);
            objRoot.add(obj);
            
            var box = new THREE.Box3;
            box.setFromObject(obj);
            let s = new THREE.Vector3();
          	box.getSize(s);
            var scale = MAX3(s.x, s.y, s.z);
            console.log(scale);
            obj.add(new THREE.AxesHelper(scale / 2));
        };
        
        var MAX3 = function (a,b,c) {
            if ( a >= b ) {
                    if ( a >= c) {
                        return a;
                    } else {
                        return c;
                    }
            } else {
                    if (b >= c) {
                        return b;
                    } else {
                        return c;
                    }
            }
        };

        
        
        // right now, we make something compatible with aruco markers
        // it may evolve in the future
        
        /**
            * Takes an array of markers and then applies transformations 
            * to the referenced object.
            * @function ObjectTransform#setTransform
            * @param arr {Marker[]} an array of detected markers.
            */                
        this.setTransform = function ( arr ) {
            if (objRoot === undefined) { return ; }
            var i ;
            for ( i = 0; i < arr.length; i++) {
                if ( arr[i].id === id ) {
                /* TODO #4 set here the transformation we should apply on objRoot
                    *  Each marker has 3 major properties :
                    *  - id is the marker id;
                    *  - pose.rotation gives its orientation using a rotation matrix
                    *    and is a 3x3 array
                    *  - pose.position gives its position with respect to the camera
                    *    and is a vector with 3 components.
                    */
                                                
                }
            }
        };
        
        this.setId = function (i) {
            id = i;
        };
    },
    ['setObject', 'setTransform', 'setId'],
    []
);

export default { ObjectTransform : ObjectTransform };
