import * as THREE from './index.js';

let FrustumCamera = function (  left, right, bottom, top, near, far ) {

    THREE.Camera.call( this );

    this.type = 'FrustumCamera';


    this.left = left !== undefined ? left : -1;
    this.right = right !== undefined ? right : 1;
    this.bottom = bottom !== undefined ? bottom : -1;
    this.top = top !== undefined ? top : 1;
    this.near = near !== undefined ? near : 0.1;
    this.far = far !== undefined ? far : 2000;

    this.updateProjectionMatrix();

};

FrustumCamera.prototype = Object.create( THREE.Camera.prototype );
FrustumCamera.prototype.constructor = FrustumCamera;




FrustumCamera.prototype.updateProjectionMatrix = function () {

    this.projectionMatrix.makeFrustum(
        this.left, this.right, this.bottom, this.top, this.near, this.far
    );
};

FrustumCamera.prototype.clone = function () {

    var camera = new FrustumCamera();

    THREE.Camera.prototype.clone.call( this, camera );


    camera.left = this.left;
    camera.right = this.right;
    camera.top = this.top;
    camera.bottom = this.bottom;
    
    camera.near = this.near;
    camera.far = this.far;

    camera.projectionMatrix.copy( this.projectionMatrix );

    return camera;

};

export default FrustumCamera;
