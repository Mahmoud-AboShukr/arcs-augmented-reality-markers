# Web Requirements

## Runtime
- A modern web browser
- JavaScript enabled
- Canvas support
- WebGL support recommended for rendering components
- A local static file server

## How to Serve
Because this is a browser project with multiple relative assets and module-like script loading, it should be served through a local web server rather than opened directly as a file.

Example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/tests/aruco/aruco.html
```

## Project Dependencies
This project bundles most of its dependencies locally inside the repository, including:

- ARCS browser runtime in `build/`
- ARUCO-related code in `deps/aruco/`
- pose estimation code in `deps/pose/`
- computer vision utilities in `deps/cv/`
- 3D loading/rendering helpers in:
  - `deps/three.js/`
  - `deps/objloader/`
  - `deps/mtlloader/`
  - `deps/ddsloader/`

## Demo Assets
The included demo depends on local assets in `tests/aruco/`, including:

- `arcsapp.json`
- `webcam.ogv`
- `al3.obj`
- `al2.mtl`

## Notes
- No npm install step appears necessary for the included demo.
- The repository already includes prebuilt browser files under `build/`.
- Some parts of the project may also support Node.js usage, but the bundled demo is browser-focused.
