# Browser-Based Augmented Reality with ARCS and ARUCO Markers

This repository presents a web-based **augmented reality** project built with the **ARCS (Augmented Reality Component System)** framework. The project uses ARUCO marker detection, marker pose localization, video input, and 3D object rendering to create a marker-based AR pipeline directly in the browser.

Although you referred to it as a VR project, the uploaded codebase is more accurately an **augmented reality (AR)** system: it detects fiducial markers in a camera or prerecorded video stream and overlays a 3D object aligned with the marker pose.

## Project Overview

The project is structured as a modular AR application with:

- a browser-based AR engine built on **ARCS**,
- component-based architecture for video processing and rendering,
- ARUCO marker detection,
- marker localization and pose estimation,
- 3D object loading with OBJ/MTL assets,
- browser rendering of virtual content over a video stream,
- application orchestration through a JSON-based ARCS configuration.

The included demo application in `tests/aruco/` shows the full pipeline using prerecorded webcam footage and a marker-driven 3D overlay.

## Main Features

- Browser-based marker AR application
- Component-driven architecture using **ARCS**
- ARUCO marker detection
- Marker pose estimation and object transformation
- 3D object loading via OBJ/MTL assets
- Video source integration
- Canvas-based marker processing
- Overlay and marker display components
- JSON-configured application graph through `arcsapp.json`
- Prebuilt browser runtime via `build/arcs_browser.js`

## Repository Structure

```text
arcs-augmented-reality-markers/
├── build/
│   ├── arcs.js
│   ├── arcs.min.js
│   └── arcs_browser.js
├── components/
│   ├── arviewer.js
│   ├── arucodetector.js
│   ├── markerlocator.js
│   ├── markerdisplay.js
│   ├── objecttransform.js
│   ├── objloader.js
│   ├── animator.js
│   ├── video.js
│   ├── windowevent.js
│   └── tokensender.js
├── deps/
│   ├── aruco/
│   ├── cv/
│   ├── objloader/
│   ├── mtlloader/
│   ├── ddsloader/
│   ├── pose/
│   └── three.js/
├── tests/
│   └── aruco/
│       ├── aruco.html
│       ├── arcsapp.json
│       ├── webcam.ogv
│       ├── webcam2.ogv
│       ├── al2.obj
│       ├── al2.mtl
│       ├── al3.obj
│       ├── cubone.obj
│       └── ...
├── docs/
└── README.md
```

## Methodology

### 1. ARCS Framework

The project is based on the JavaScript version of **ARCS**, described in the included documentation as an **Augmented Reality Component System** designed to run both in Node.js and in the browser. The architecture is organized around reusable components connected through signals, slots, and application sheets. This is stated directly in the existing project README under `docs/Readme.md`. 

### 2. Browser AR Application

The demo application is defined in `tests/aruco/arcsapp.json`, where the AR pipeline is declared using components such as:

- `ARViewer`
- `Animator`
- `ARUCODetector`
- `MarkerLocator`
- `WindowEvent`
- `ObjectTransform`
- `MarkerDisplay`
- `OBJLoader`
- `VideoSource`

The configuration also sets camera intrinsics, marker model size, scene ID, and object-loading behavior.

### 3. Marker Detection and Localization

The AR pipeline detects markers from incoming video frames and passes the detections to the localization component. The JSON application graph connects:

- video frames → `ARUCODetector`
- detected markers → `MarkerLocator`
- located markers → `ARViewer` and `MarkerDisplay`

This structure makes the system easy to inspect and extend.

### 4. 3D Object Overlay

The system loads 3D models such as `al3.obj` and corresponding material files, then applies object transformations according to the detected marker pose. This allows the virtual object to appear registered with the physical marker.

### 5. Demo Interface

The demo page `tests/aruco/aruco.html` loads the browser runtime, references `arcsapp.json`, and uses:

- a hidden video element as the image source,
- a canvas for processing,
- a container for rendering and overlay display.

In the included example, the video is taken from prerecorded `.ogv` files rather than a live webcam stream.

## How to Run

The easiest way to run the project is to serve it locally and open the AR demo page in a browser.

From the project root, start a local server, for example with Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/tests/aruco/aruco.html
```

This will launch the included marker-based AR demo.

## Requirements

See `WEB_REQUIREMENTS.md` for the runtime and dependency notes.

At a high level, the project requires:

- a modern browser
- JavaScript enabled
- local static file serving
- WebGL/canvas support

## Demo Assets

The project includes example assets such as:

- prerecorded webcam videos:
  - `webcam.ogv`
  - `webcam2.ogv`
- 3D object files:
  - `al2.obj`
  - `al2.mtl`
  - `al3.obj`
  - `cubone.obj`
  - `cubone.mtl`

These support the included AR marker demo.
