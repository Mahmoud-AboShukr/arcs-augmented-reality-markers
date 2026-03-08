import ARCS from '../build/arcs.js';
import * as THREE from '../deps/three.js/index.js';
import { OBJLoader } from '../deps/objloader/objloader.js';
import { MTLLoader } from '../deps/mtlloader/mtlloader.js';
//import { DDSLoader } from '../deps/ddsloader/ddsloader.js';


var internalOBJLoader;


internalOBJLoader = ARCS.Component.create(
    function() {
        var self = this;
        var innerObject; 
        
        var onLoadWrapper = function(obj) {
            innerObject = obj;
            console.log("[OBJLoader] object has %d components", obj.children.length); 
            //console.log(obj);
            self.emit("onLoad", obj);
        };

        var onLoadJSON = function(geom, mat) {
            innerObject = new THREE.Mesh(geom, new THREE.MeshFaceMaterial(mat));
            
            self.emit("onLoad", innerObject);
        };
        
        var progress = function ( xhr ) { 
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); 
        };
        
        var error = function ( xhr ) { 
            console.log( 'An error happened' ); 
        };
        
        this.load = function(objURL, mtlURL) {
            var loader;
            // we may use a string tokenizer to determine file types 
            // then all would be in the same loading slot.
            
            //console.log("loading objects", objURL, mtlURL);
            var manager = new THREE.LoadingManager();
            //manager.addHandler( /\.dds$/i, new DDSLoader() );
            
            if (mtlURL === undefined) {
                //console.log("using loader");
                loader = new OBJLoader(manager);
                loader.load(objURL, onLoadWrapper, progress, error);                        
            } else {
                //console.log("using mtl loader");
                loader = new MTLLoader(manager);
                loader.load(mtlURL, function(materials) {
                        materials.preload();
                        console.log(materials);
                        new OBJLoader(manager)
                            .setMaterials(materials)
                            .load(objURL, onLoadWrapper, progress, error);                        
                    }, progress, error);                        
            }
        };
        
        this.loadJSON = function(jsonURL) {
            var loader;
            //console.log("loading objects", jsonURL);
            loader = new THREE.ObjectLoader();
            loader.load(jsonURL, onLoadJSON); //, progress, error);                         
            
            
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
        
        this.unitize = function() {
            if (innerObject === undefined) { return ; }
            var box = new THREE.Box3(); 
            box.setFromObject(innerObject);
            let s = new THREE.Vector3();
          	box.getSize(s);
            let c = new THREE.Vector3();
          	box.getCenter(c);
            var scale = 1 / MAX3(s.x, s.y, s.z);                    
            innerObject.scale.x = innerObject.scale.y = innerObject.scale.z = scale;
        };
        
        this.resize = function(s) {
            this.unitize();
            if (innerObject === undefined) { return ; }
            innerObject.scale.x *= s;
            innerObject.scale.y *= s;
            innerObject.scale.z *= s;
        };
        
    },
    ["load","unitize", "resize"],
    ["onLoad"]
);
        
export default { OBJLoader: internalOBJLoader}; 
