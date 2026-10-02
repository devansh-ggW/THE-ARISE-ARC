import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ArcScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: window.innerWidth > 650, powerPreference: 'low-power' });
    } catch {
      setSupported(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 650 ? 1.25 : 1.65));
    renderer.setSize(host.clientWidth, host.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, host.clientWidth / Math.max(1, host.clientHeight), 0.1, 100);
    camera.position.set(0, 0, 5.1);
    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.HemisphereLight(0xfffcf4, 0x82765d, 1.65);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xfff4dd, 3.1);
    keyLight.position.set(-3.4, 3.5, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xe1c28a, 24, 11, 2);
    rimLight.position.set(2.8, -1.6, 2.7);
    scene.add(rimLight);
    const coreLight = new THREE.PointLight(0xe8d5ae, 4.2, 4.2, 2);
    coreLight.position.set(0, 0, .1);
    group.add(coreLight);

    const gold = new THREE.MeshPhysicalMaterial({ color: 0xb99a63, metalness: .76, roughness: .23, clearcoat: .78, clearcoatRoughness: .2, emissive: 0x705633, emissiveIntensity: .12 });
    const paleGold = new THREE.MeshPhysicalMaterial({ color: 0xe0cc9d, metalness: .68, roughness: .29, clearcoat: .65, clearcoatRoughness: .23, emissive: 0x876f43, emissiveIntensity: .08 });
    const darkGold = new THREE.MeshPhysicalMaterial({ color: 0x7e6a47, metalness: .82, roughness: .27, clearcoat: .45 });

    const outer = new THREE.Mesh(new THREE.TorusGeometry(1.12, .018, 10, 200), gold);
    outer.rotation.set(.78, .1, -.28);
    group.add(outer);
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(.91, .008, 8, 180), paleGold);
    orbit.rotation.set(1.03, .48, .62);
    group.add(orbit);
    const meridian = new THREE.Mesh(new THREE.TorusGeometry(1.07, .009, 8, 180), darkGold);
    meridian.rotation.set(.15, .92, .18);
    group.add(meridian);

    const crescentArc = new THREE.Mesh(new THREE.TorusGeometry(1.27, .012, 8, 120, 1.12), paleGold);
    crescentArc.rotation.set(.76, -.28, -.94);
    crescentArc.position.z = -.12;
    group.add(crescentArc);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(.14, 24, 20),
      new THREE.MeshPhysicalMaterial({ color: 0xfff8e7, roughness: .22, metalness: .08, emissive: 0xc8a667, emissiveIntensity: .52, clearcoat: 1 }),
    );
    group.add(core);
    const innerHalo = new THREE.Mesh(
      new THREE.TorusGeometry(.25, .0025, 6, 100),
      new THREE.MeshBasicMaterial({ color: 0xe3c990, transparent: true, opacity: .58 }),
    );
    innerHalo.rotation.x = Math.PI / 2.3;
    group.add(innerHalo);

    const pointCount = window.innerWidth < 650 ? 38 : 72;
    const positions = new Float32Array(pointCount * 3);
    for (let index = 0; index < pointCount; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = .62 + Math.random() * 1.12;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = Math.sin(angle) * radius;
      positions[index * 3 + 2] = (Math.random() - .5) * .68;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xb59a6c, size: .022, transparent: true, opacity: .48, sizeAttenuation: true, depthWrite: false }));
    group.add(stars);

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let active = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();
    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - .5) * .42;
      targetY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - .5) * -.3;
    };
    const onPointerLeave = () => { targetX = 0; targetY = 0; };
    host.addEventListener('pointermove', onPointerMove, { passive: true });
    host.addEventListener('pointerleave', onPointerLeave);

    const resize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const draw = () => {
      if (!reducedMotion) frame = requestAnimationFrame(draw);
      const delta = Math.min(clock.getDelta(), .04);
      if (!reducedMotion) {
        pointerX += (targetX - pointerX) * .035;
        pointerY += (targetY - pointerY) * .035;
        camera.position.x += (pointerX * .28 - camera.position.x) * .025;
        camera.position.y += (pointerY * .22 - camera.position.y) * .025;
        camera.lookAt(0, 0, 0);
        rimLight.position.x = 2.8 + pointerX * .65;
        rimLight.position.y = -1.6 + pointerY * .55;
        group.rotation.y += delta * .075;
        group.rotation.x = .05 + pointerY;
        group.rotation.z = pointerX * .36;
        stars.rotation.z += delta * .018;
        core.scale.setScalar(1 + Math.sin(clock.elapsedTime * .75) * .025);
      }
      renderer.render(scene, camera);
    };
    const start = () => { if (!active) { active = true; clock.start(); draw(); } };
    const stop = () => { active = false; cancelAnimationFrame(frame); };
    const visibility = new IntersectionObserver(([entry]) => entry.isIntersecting ? start() : stop(), { threshold: .01 });
    visibility.observe(host);
    const tabVisibility = () => document.hidden ? stop() : start();
    document.addEventListener('visibilitychange', tabVisibility);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', tabVisibility);
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div className={`arc-scene${supported ? '' : ' arc-scene--fallback'}`} ref={hostRef} aria-label="A softly illuminated orbiting arc surrounding a luminous core" role="img">
    <div className="arc-scene__guide arc-scene__guide--one" /><div className="arc-scene__guide arc-scene__guide--two" />
    <div className="arc-scene__core-fallback" />
    <canvas ref={canvasRef} aria-hidden="true" />
    <span className="arc-scene__caption"><i /> THE ARC / 01</span>
  </div>;
}
