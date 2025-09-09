// Neon Shader Background
let scene, camera, renderer, uniforms;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.Camera();
  camera.position.z = 1;

  const geometry = new THREE.PlaneGeometry(2, 2);

  uniforms = {
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;

      // Simple hash
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
      }

      // Noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) +
               (c - a)*u.y*(1.0 - u.x) +
               (d - b)*u.x*u.y;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;

        // Distance from mouse
        vec2 toMouse = uv - u_mouse;
        float dist = length(toMouse);

        // Neon color flow based on noise + distance
        float n = noise(uv * 6.0 + u_time * 0.5);
        float intensity = exp(-dist * 20.0) * 1.5;
        vec3 color = vec3(
          0.5 + 0.5 * sin(u_time + n * 6.283),
          0.5 + 0.5 * sin(u_time + 2.0 + n * 6.283),
          0.5 + 0.5 * sin(u_time + 4.0 + n * 6.283)
        );

        gl_FragColor = vec4(color * intensity, 1.0);
      }
    `
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg"), alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousemove', e => {
    uniforms.u_mouse.value.x = e.clientX / window.innerWidth;
    uniforms.u_mouse.value.y = 1.0 - e.clientY / window.innerHeight;
  });
}

function onWindowResize() {
  uniforms.u_resolution.value.x = window.innerWidth;
  uniforms.u_resolution.value.y = window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  uniforms.u_time.value += 0.02;
  renderer.render(scene, camera);
}
