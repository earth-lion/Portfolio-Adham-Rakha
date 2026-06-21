import { useEffect, useRef } from 'react';

/**
 * FluidBackground.jsx
 * ─────────────────────────────────────────────────────────────
 * A high-performance WebGL Hybrid Background.
 * Combines a WebGL Fluid Mesh simulation with an interactive
 * particle network. Particles are organically carried by the fluid
 * velocity fields and mouse drag. Rendered using a single canvas
 * and context to guarantee a stable 60fps.
 */
export default function FluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported in this browser');
      return;
    }

    // ── 1. SHADER SOURCES ────────────────────────────────────

    // Fluid Mesh Shaders
    const fluidVs = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fluidFs = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                       dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                   mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                       dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 m = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float dist = length(p - m);

        // Fluid repulsion force
        float influence = smoothstep(0.8, 0.0, dist);
        vec2 dir = normalize(p - m + vec2(0.001));
        p += dir * influence * 0.25;

        // Wave turbulence
        p.x += sin(p.y * 2.0 + u_time * 0.15) * 0.1;
        p.y += cos(p.x * 2.0 + u_time * 0.12) * 0.1;

        // Domain warping
        vec2 q = vec2(0.0);
        q.x = fbm(p + vec2(0.0, 0.0) + u_time * 0.08);
        q.y = fbm(p + vec2(5.2, 1.3) + u_time * 0.06);

        vec2 r = vec2(0.0);
        r.x = fbm(p + 3.0 * q + vec2(1.7, 9.2) + u_time * 0.04);
        r.y = fbm(p + 3.0 * q + vec2(8.3, 2.8) + u_time * 0.05);

        float f = fbm(p + 3.0 * r);

        // Colors
        vec3 color_bg = vec3(0.015, 0.015, 0.06);     // #04040f
        vec3 color_gold = vec3(0.72, 0.59, 0.24);     // #B8963E
        vec3 color_indigo = vec3(0.19, 0.17, 0.58);   // #4F46E5
        vec3 color_teal = vec3(0.04, 0.43, 0.40);     // #0FA096

        vec3 color = color_bg;
        color = mix(color, color_indigo, clamp(length(q), 0.0, 1.0) * 0.55);
        color = mix(color, color_teal, clamp(length(r.x), 0.0, 1.0) * 0.35);
        color = mix(color, color_gold, clamp(f * f * 2.5, 0.0, 1.0) * 0.85);

        color = color * (0.85 + 0.25 * f);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Particle/Node Shaders
    const particleVs = `
      attribute vec2 a_position;
      attribute float a_alpha;
      varying float v_alpha;
      uniform vec2 u_resolution;
      uniform float u_point_size;
      void main() {
        // Map screen pixels to WebGL clip space: (0,0) top-left -> (w,h) bottom-right
        vec2 clipSpace = vec2(
          (a_position.x / u_resolution.x) * 2.0 - 1.0,
          1.0 - (a_position.y / u_resolution.y) * 2.0
        );
        gl_Position = vec4(clipSpace, 0.0, 1.0);
        gl_PointSize = u_point_size;
        v_alpha = a_alpha;
      }
    `;

    const particleFs = `
      precision mediump float;
      varying float v_alpha;
      uniform vec3 u_color;
      void main() {
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        if (dist > 0.5) {
          discard;
        }
        // Soft circle edge blending
        float alpha = smoothstep(0.5, 0.15, dist) * v_alpha;
        gl_FragColor = vec4(u_color, alpha);
      }
    `;

    // Line Network Shaders
    const lineVs = `
      attribute vec2 a_position;
      attribute float a_alpha;
      varying float v_alpha;
      uniform vec2 u_resolution;
      void main() {
        vec2 clipSpace = vec2(
          (a_position.x / u_resolution.x) * 2.0 - 1.0,
          1.0 - (a_position.y / u_resolution.y) * 2.0
        );
        gl_Position = vec4(clipSpace, 0.0, 1.0);
        v_alpha = a_alpha;
      }
    `;

    const lineFs = `
      precision mediump float;
      varying float v_alpha;
      uniform vec3 u_color;
      void main() {
        gl_FragColor = vec4(u_color, v_alpha);
      }
    `;

    // Helper: Compile Shader
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    // Helper: Create Program
    const createProgram = (vsSource, fsSource) => {
      const vs = compileShader(gl.VERTEX_SHADER, vsSource);
      const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return null;

      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        return null;
      }
      return { program, vs, fs };
    };

    // Initialize WebGL programs
    const fluidProg = createProgram(fluidVs, fluidFs);
    const particleProg = createProgram(particleVs, particleFs);
    const lineProg = createProgram(lineVs, lineFs);

    if (!fluidProg || !particleProg || !lineProg) return;

    // ── 2. GEOMETRY BUFFERS ──────────────────────────────────

    // Fluid Quad
    const quadVertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    // Particle Point Buffers
    const particleCoordBuffer = gl.createBuffer();
    const particleAlphaBuffer = gl.createBuffer();

    // Line Network Buffers
    const lineCoordBuffer = gl.createBuffer();
    const lineAlphaBuffer = gl.createBuffer();

    // ── 3. STATE AND SIMULATION ─────────────────────────────

    // Mouse Tracking (Screen Space)
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Initialize 60 Particles
    const PARTICLE_COUNT = 60;
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: 3.5 + Math.random() * 3.5, // Particle visual sizes
        alpha: 0.6 + Math.random() * 0.4,
        baseAlpha: 0.6 + Math.random() * 0.4,
      });
    }

    // Resize Handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    // ── 4. RENDER LOOP ───────────────────────────────────────
    let animationFrameId;
    const startTime = Date.now();

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      // Lerp mouse coordinate for smooth trailing
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // ── A. Update Particles (Fluid Influence & Mouse repulse/swirl) ──
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];

        // 1. Fluid drag currents (Slow noise drift)
        const fluidDriftX = Math.sin(p.y * 0.006 + elapsed * 0.4) * 0.12;
        const fluidDriftY = Math.cos(p.x * 0.006 + elapsed * 0.3) * 0.12;
        p.vx += fluidDriftX;
        p.vy += fluidDriftY;

        // 2. Mouse interactive fluid force (swirl and push)
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 220; // range of cursor current

        if (dist < radius) {
          const force = (1.0 - dist / radius) * 0.32;
          
          // Push force (Fluid repulsion)
          p.vx += (dx / (dist + 0.01)) * force * 1.5;
          p.vy += (dy / (dist + 0.01)) * force * 1.5;

          // Swirl force (Viscous swirl current)
          p.vx += (-dy / (dist + 0.01)) * force * 0.8;
          p.vy += (dx / (dist + 0.01)) * force * 0.8;
        }

        // Apply friction and move
        p.vx *= 0.94;
        p.vy *= 0.94;
        
        // Add minimal noise motion
        p.vx += (Math.random() - 0.5) * 0.03;
        p.vy += (Math.random() - 0.5) * 0.03;

        p.x += p.vx;
        p.y += p.vy;

        // Boundary checks (organic wrap-around)
        const padding = 15;
        if (p.x < -padding) { p.x = width + padding; p.vx = (Math.random() - 0.5) * 0.5; }
        if (p.x > width + padding) { p.x = -padding; p.vx = (Math.random() - 0.5) * 0.5; }
        if (p.y < -padding) { p.y = height + padding; p.vy = (Math.random() - 0.5) * 0.5; }
        if (p.y > height + padding) { p.y = -padding; p.vy = (Math.random() - 0.5) * 0.5; }

        // Subtle alpha pulsation (twinkling)
        p.alpha = p.baseAlpha * (0.85 + 0.15 * Math.sin(elapsed * 2.5 + i));
      }

      // ── B. Prepare Network Connections (Lines) ──
      const lineCoords = [];
      const lineAlphas = [];
      const MAX_LINK_DIST = 145;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < MAX_LINK_DIST * MAX_LINK_DIST) {
            const dist = Math.sqrt(distSq);
            // Linear fade out based on distance (much brighter now)
            const alpha = (1.0 - dist / MAX_LINK_DIST) * 0.55 * ((p1.alpha + p2.alpha) * 0.5);
            
            lineCoords.push(p1.x, p1.y, p2.x, p2.y);
            lineAlphas.push(alpha, alpha);
          }
        }
      }

      // ── C. WebGL Rendering Passes ──
      gl.clear(gl.COLOR_BUFFER_BIT);

      // --- Pass 1: RENDER FLUID MESH CANVAS ---
      gl.useProgram(fluidProg.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      const positionLoc = gl.getAttribLocation(fluidProg.program, 'position');
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      // Set fluid uniforms
      gl.uniform2f(gl.getUniformLocation(fluidProg.program, 'u_resolution'), canvas.width, canvas.height);
      gl.uniform1f(gl.getUniformLocation(fluidProg.program, 'u_time'), elapsed);
      gl.uniform2f(
        gl.getUniformLocation(fluidProg.program, 'u_mouse'),
        mouseX * dpr,
        (height - mouseY) * dpr
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // --- SETUP TRANSPARENT BLENDING FOR NETWORK PASSES ---
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      // Bright glowing gold color token (#F2DC9B)
      const goldRGB = [0.95, 0.86, 0.61];

      // --- Pass 2: RENDER INTERCONNECTED LINES ---
      if (lineCoords.length > 0) {
        gl.useProgram(lineProg.program);

        // Upload line positions
        gl.bindBuffer(gl.ARRAY_BUFFER, lineCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineCoords), gl.DYNAMIC_DRAW);
        const linePosLoc = gl.getAttribLocation(lineProg.program, 'a_position');
        gl.enableVertexAttribArray(linePosLoc);
        gl.vertexAttribPointer(linePosLoc, 2, gl.FLOAT, false, 0, 0);

        // Upload line alphas
        gl.bindBuffer(gl.ARRAY_BUFFER, lineAlphaBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineAlphas), gl.DYNAMIC_DRAW);
        const lineAlphaLoc = gl.getAttribLocation(lineProg.program, 'a_alpha');
        gl.enableVertexAttribArray(lineAlphaLoc);
        gl.vertexAttribPointer(lineAlphaLoc, 1, gl.FLOAT, false, 0, 0);

        // Set line uniforms
        gl.uniform2f(gl.getUniformLocation(lineProg.program, 'u_resolution'), width, height);
        gl.uniform3fv(gl.getUniformLocation(lineProg.program, 'u_color'), goldRGB);

        gl.drawArrays(gl.LINES, 0, lineCoords.length / 2);
      }

      // --- Pass 3: RENDER FLOATING PARTICLES ---
      gl.useProgram(particleProg.program);

      // Map coordinates for array buffer
      const partCoords = [];
      const partAlphas = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        partCoords.push(particles[i].x, particles[i].y);
        partAlphas.push(particles[i].alpha);
      }

      // Upload point positions
      gl.bindBuffer(gl.ARRAY_BUFFER, particleCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(partCoords), gl.DYNAMIC_DRAW);
      const partPosLoc = gl.getAttribLocation(particleProg.program, 'a_position');
      gl.enableVertexAttribArray(partPosLoc);
      gl.vertexAttribPointer(partPosLoc, 2, gl.FLOAT, false, 0, 0);

      // Upload point alphas
      gl.bindBuffer(gl.ARRAY_BUFFER, particleAlphaBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(partAlphas), gl.DYNAMIC_DRAW);
      const partAlphaLoc = gl.getAttribLocation(particleProg.program, 'a_alpha');
      gl.enableVertexAttribArray(partAlphaLoc);
      gl.vertexAttribPointer(partAlphaLoc, 1, gl.FLOAT, false, 0, 0);

      // Set point uniforms
      gl.uniform2f(gl.getUniformLocation(particleProg.program, 'u_resolution'), width, height);
      gl.uniform3fv(gl.getUniformLocation(particleProg.program, 'u_color'), goldRGB);
      gl.uniform1f(gl.getUniformLocation(particleProg.program, 'u_point_size'), 14.5 * dpr);

      gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);

      gl.disable(gl.BLEND);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // ── 5. CLEANUP ──────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resize);

      // Delete buffers
      gl.deleteBuffer(quadBuffer);
      gl.deleteBuffer(particleCoordBuffer);
      gl.deleteBuffer(particleAlphaBuffer);
      gl.deleteBuffer(lineCoordBuffer);
      gl.deleteBuffer(lineAlphaBuffer);

      // Delete programs and shaders
      const cleanProgram = (prog) => {
        if (!prog) return;
        gl.deleteProgram(prog.program);
        gl.deleteShader(prog.vs);
        gl.deleteShader(prog.fs);
      };
      cleanProgram(fluidProg);
      cleanProgram(particleProg);
      cleanProgram(lineProg);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          display: 'block',
        }}
      />
      {/* Vignette effect layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 95% 95% at 50% 50%, transparent 30%, rgba(4,4,15,0.72) 100%)',
        }}
      />
    </>
  );
}
