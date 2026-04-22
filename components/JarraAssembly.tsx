"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function JarraAssembly() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const sceneRefs = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    woodBody?: THREE.Mesh;
    steelInner?: THREE.Mesh;
    handle?: THREE.Mesh;
    baseMetal?: THREE.Mesh;
    topRim?: THREE.Mesh;
    rivets?: THREE.Group;
    group?: THREE.Group;
    particles?: THREE.Points;
    animationId?: number;
  }>({});

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(1.8, 1.6, 5.5);
    camera.lookAt(0, -0.1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const keyLight = new THREE.DirectionalLight(0xfff0d4, 2.4);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x9cb4d4, 0.6);
    fillLight.position.set(-5, 2, 3);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffb578, 1.5);
    rimLight.position.set(-2, 3, -5);
    scene.add(rimLight);
    scene.add(new THREE.AmbientLight(0x6b5340, 0.4));

    const createEngravingTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 2048; canvas.height = 1024;
      const ctx = canvas.getContext("2d")!;

      const g = ctx.createLinearGradient(0, 0, 0, 1024);
      g.addColorStop(0, "#C9985E");
      g.addColorStop(0.3, "#B88248");
      g.addColorStop(0.7, "#9E6A35");
      g.addColorStop(1, "#7A4F25");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 2048, 1024);

      for (let i = 0; i < 25; i++) {
        const x = Math.random() * 2048, y = Math.random() * 1024, r = 80 + Math.random() * 200;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        const dark = Math.random() > 0.5;
        grad.addColorStop(0, dark ? "rgba(80,45,20,0.25)" : "rgba(220,175,110,0.2)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }

      for (let i = 0; i < 180; i++) {
        const x = Math.random() * 2048;
        ctx.strokeStyle = `rgba(70,40,18,${0.08 + Math.random() * 0.22})`;
        ctx.lineWidth = 0.5 + Math.random() * 1.8;
        ctx.beginPath(); ctx.moveTo(x, 0);
        let cx = x;
        for (let y = 0; y < 1024; y += 6) { cx += (Math.random() - 0.5) * 2.2; ctx.lineTo(cx, y); }
        ctx.stroke();
      }

      for (let i = 0; i < 4; i++) {
        const x = Math.random() * 2048, y = 200 + Math.random() * 600, r = 12 + Math.random() * 20;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, "rgba(55,28,12,0.9)");
        grad.addColorStop(0.5, "rgba(75,40,18,0.5)");
        grad.addColorStop(1, "rgba(75,40,18,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }

      for (let i = 0; i < 10; i++) {
        const x = (i / 10) * 2048;
        ctx.strokeStyle = "rgba(40,22,10,0.35)";
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
      }

      ctx.strokeStyle = "#1E0E05"; ctx.fillStyle = "#1E0E05";
      ctx.font = "italic bold 72px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("Sant  Jordi", 1024, 160);

      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(1024, 115); ctx.lineTo(1024, 155);
      ctx.moveTo(1004, 135); ctx.lineTo(1044, 135);
      ctx.stroke();

      const cx = 1024, cy = 540;

      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.ellipse(cx - 40, cy + 40, 140, 55, 0, 0, Math.PI * 2); ctx.stroke();

      const legs: number[][] = [
        [cx - 140, cy + 80, cx - 155, cy + 200],
        [cx - 90, cy + 85, cx - 100, cy + 210],
        [cx + 40, cy + 85, cx + 55, cy + 210],
        [cx + 80, cy + 80, cx + 100, cy + 200],
      ];
      legs.forEach(([x1, y1, x2, y2]) => {
        ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(x1 + 5, (y1 + y2) / 2, x2, y2);
        ctx.stroke();
      });

      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx + 95, cy + 10);
      ctx.quadraticCurveTo(cx + 170, cy - 60, cx + 200, cy - 100);
      ctx.quadraticCurveTo(cx + 220, cy - 110, cx + 240, cy - 95);
      ctx.lineTo(cx + 220, cy - 70); ctx.lineTo(cx + 180, cy - 40);
      ctx.stroke();

      for (let i = 0; i < 6; i++) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        const sx = cx + 100 + i * 12;
        ctx.moveTo(sx, cy - 5); ctx.lineTo(sx - 15, cy + 25); ctx.stroke();
      }

      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx - 40, cy - 30); ctx.lineTo(cx - 10, cy - 110);
      ctx.lineTo(cx + 30, cy - 105); ctx.lineTo(cx + 55, cy - 25);
      ctx.stroke();

      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(cx + 10, cy - 135, 28, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx + 10, cy - 155); ctx.lineTo(cx + 10, cy - 115);
      ctx.moveTo(cx - 5, cy - 135); ctx.lineTo(cx + 25, cy - 135);
      ctx.stroke();

      ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.moveTo(cx - 80, cy - 180); ctx.lineTo(cx + 150, cy + 100); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 95, cy - 195); ctx.lineTo(cx - 80, cy - 180); ctx.lineTo(cx - 100, cy - 175);
      ctx.closePath(); ctx.fill();

      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx - 200, cy + 180);
      ctx.bezierCurveTo(cx - 150, cy + 160, cx - 100, cy + 240, cx, cy + 215);
      ctx.bezierCurveTo(cx + 120, cy + 195, cx + 180, cy + 260, cx + 240, cy + 220);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 240, cy + 220); ctx.lineTo(cx + 280, cy + 205);
      ctx.lineTo(cx + 290, cy + 230); ctx.lineTo(cx + 270, cy + 245);
      ctx.closePath(); ctx.stroke();
      for (let i = 0; i < 8; i++) {
        const t = i / 8;
        const x = cx - 200 + t * 440;
        const y = cy + 180 + Math.sin(t * Math.PI * 2) * 15;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y - 5); ctx.lineTo(x + 3, y - 15); ctx.lineTo(x + 6, y - 5); ctx.stroke();
      }

      ctx.lineWidth = 2.5;
      for (let side = -1; side <= 1; side += 2) {
        const baseX = cx + side * 380;
        for (let i = 0; i < 10; i++) {
          const y = cy - 150 + i * 38;
          ctx.save();
          ctx.translate(baseX, y);
          ctx.rotate((side === -1 ? -0.3 : 0.3) + (i % 2 === 0 ? 0.4 : -0.4));
          ctx.beginPath(); ctx.ellipse(0, 0, 22, 7, 0, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }
        ctx.beginPath();
        ctx.moveTo(baseX, cy - 170);
        ctx.quadraticCurveTo(baseX + side * 15, cy, baseX, cy + 220);
        ctx.stroke();
      }

      ctx.font = "italic 36px Georgia, serif";
      ctx.fillText("· Maderas del Sur ·", 1024, 920);
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(700, 955); ctx.lineTo(1348, 955); ctx.stroke();

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.anisotropy = 8;
      return texture;
    };

    const createWoodNormal = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512; canvas.height = 512;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#8080ff"; ctx.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 512;
        ctx.strokeStyle = `rgba(100,100,200,${Math.random() * 0.5})`;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.beginPath(); ctx.moveTo(x, 0);
        let cx = x;
        for (let y = 0; y < 512; y += 10) { cx += (Math.random() - 0.5) * 2; ctx.lineTo(cx, y); }
        ctx.stroke();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const engravingTexture = createEngravingTexture();
    const woodNormal = createWoodNormal();

    const woodMaterial = new THREE.MeshStandardMaterial({
      map: engravingTexture, normalMap: woodNormal,
      normalScale: new THREE.Vector2(0.4, 0.4),
      roughness: 0.75, metalness: 0.05,
    });
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8dde2, roughness: 0.18, metalness: 0.95,
    });
    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1512, roughness: 0.35, metalness: 0.8,
    });
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9a668, roughness: 0.3, metalness: 0.9,
    });

    const group = new THREE.Group();
    scene.add(group);

    const bodyHeight = 1.4, topR = 0.78, bottomR = 1.02;
    const bodyProfile: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const curve = Math.sin(t * Math.PI) * 0.04;
      const r = bottomR + (topR - bottomR) * t + curve;
      bodyProfile.push(new THREE.Vector2(r, -bodyHeight / 2 + bodyHeight * t));
    }
    const woodBody = new THREE.Mesh(new THREE.LatheGeometry(bodyProfile, 64), woodMaterial);
    woodBody.castShadow = true; woodBody.receiveShadow = true;
    group.add(woodBody);

    const staveMat = new THREE.MeshBasicMaterial({ color: 0x2a1810, transparent: true, opacity: 0.4 });
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const stave = new THREE.Mesh(new THREE.BoxGeometry(0.006, bodyHeight * 0.96, 0.02), staveMat);
      const avgR = (topR + bottomR) / 2 + 0.02;
      stave.position.set(Math.cos(angle) * avgR, 0, Math.sin(angle) * avgR);
      stave.rotation.y = -angle;
      woodBody.add(stave);
    }

    const steelProfile: THREE.Vector2[] = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const r = (bottomR - 0.08) + ((topR - 0.06) - (bottomR - 0.08)) * t;
      steelProfile.push(new THREE.Vector2(r, -bodyHeight / 2 + bodyHeight * t));
    }
    const steelInner = new THREE.Mesh(new THREE.LatheGeometry(steelProfile, 48, 0, Math.PI * 2), steelMaterial);
    steelInner.position.y = 0.02;
    group.add(steelInner);

    const steelBottom = new THREE.Mesh(new THREE.CircleGeometry(bottomR - 0.08, 48), steelMaterial);
    steelBottom.rotation.x = -Math.PI / 2;
    steelBottom.position.y = -bodyHeight / 2;
    steelInner.add(steelBottom);

    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(bottomR + 0.02, -0.5, 0),
      new THREE.Vector3(bottomR + 0.5, -0.35, 0),
      new THREE.Vector3(bottomR + 0.65, 0, 0),
      new THREE.Vector3(bottomR + 0.5, 0.35, 0),
      new THREE.Vector3(topR + 0.05, 0.55, 0),
    ]);
    const handle = new THREE.Mesh(new THREE.TubeGeometry(handleCurve, 40, 0.11, 16, false), woodMaterial);
    handle.castShadow = true;
    group.add(handle);

    const baseMetal = new THREE.Mesh(new THREE.CylinderGeometry(bottomR + 0.05, bottomR + 0.05, 0.18, 48), darkMetalMaterial);
    baseMetal.position.y = -bodyHeight / 2 - 0.08;
    baseMetal.castShadow = true;
    group.add(baseMetal);

    const rivetsGroup = new THREE.Group();
    const rivetGeo = new THREE.SphereGeometry(0.035, 12, 12);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const r = new THREE.Mesh(rivetGeo, brassMaterial);
      r.position.set(Math.cos(a) * (bottomR + 0.055), -bodyHeight / 2 - 0.08, Math.sin(a) * (bottomR + 0.055));
      rivetsGroup.add(r);
    }
    group.add(rivetsGroup);

    const topRim = new THREE.Mesh(new THREE.TorusGeometry(topR + 0.02, 0.035, 12, 48), steelMaterial);
    topRim.rotation.x = Math.PI / 2;
    topRim.position.y = bodyHeight / 2 + 0.02;
    group.add(topRim);

    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      pPos[i*3] = (Math.random() - 0.5) * 8;
      pPos[i*3+1] = (Math.random() - 0.5) * 4;
      pPos[i*3+2] = (Math.random() - 0.5) * 4;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0xd4a574, size: 0.015, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending,
    }));
    scene.add(particles);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.ShadowMaterial({ opacity: 0.3 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.85;
    floor.receiveShadow = true;
    scene.add(floor);

    sceneRefs.current = { scene, camera, renderer, woodBody, steelInner, handle, baseMetal, topRim, rivets: rivetsGroup, group, particles };

    let time = 0;
    const animate = () => {
      time += 0.01;
      if (particles) particles.rotation.y = time * 0.05;
      renderer.render(scene, camera);
      sceneRefs.current.animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (sceneRefs.current.animationId) cancelAnimationFrame(sceneRefs.current.animationId);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      engravingTexture.dispose();
      woodNormal.dispose();
    };
  }, []);

  useEffect(() => {
    const refs = sceneRefs.current;
    if (!refs.woodBody || !refs.steelInner || !refs.handle || !refs.baseMetal || !refs.topRim || !refs.rivets || !refs.group) return;

    const ease = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
    const bodyHeight = 1.4, topR = 0.78, bottomR = 1.02;

    const p1 = ease(Math.max(0, Math.min(1, progress / 0.25)));
    refs.woodBody.position.y = THREE.MathUtils.lerp(-5, 0, p1);
    refs.woodBody.rotation.x = THREE.MathUtils.lerp(Math.PI * 0.8, 0, p1);

    const p2 = ease(Math.max(0, Math.min(1, (progress - 0.25) / 0.25)));
    refs.steelInner.position.y = THREE.MathUtils.lerp(6, 0.02, p2);
    refs.steelInner.scale.setScalar(THREE.MathUtils.lerp(0.3, 1, p2));

    const p3 = ease(Math.max(0, Math.min(1, (progress - 0.5) / 0.25)));
    refs.handle.position.x = THREE.MathUtils.lerp(6, 0, p3);
    refs.handle.rotation.y = THREE.MathUtils.lerp(Math.PI, 0, p3);

    const p4 = ease(Math.max(0, Math.min(1, (progress - 0.75) / 0.15)));
    refs.baseMetal.position.y = THREE.MathUtils.lerp(-5, -bodyHeight / 2 - 0.08, p4);
    refs.rivets.scale.setScalar(p4);

    const p5 = ease(Math.max(0, Math.min(1, (progress - 0.9) / 0.1)));
    refs.topRim.position.y = THREE.MathUtils.lerp(4, bodyHeight / 2 + 0.02, p5);
    refs.topRim.scale.setScalar(p5);

    if (progress > 0.95) {
      refs.group.rotation.y = (progress - 0.95) / 0.05 * Math.PI * 0.4;
    } else {
      refs.group.rotation.y = progress * 0.15;
    }
  }, [progress]);

  const phases = [
    { t: 0, num: "01", title: "La madera", sub: "Roble tostado, tallado en CNC y unido en duelas." },
    { t: 0.25, num: "02", title: "El acero", sub: "Interior de acero inoxidable, seguro y duradero." },
    { t: 0.5, num: "03", title: "El asa", sub: "Tallada a mano, ergonómica, única en cada jarra." },
    { t: 0.75, num: "04", title: "La base", sub: "Refuerzo metálico con remaches de latón." },
    { t: 0.92, num: "05", title: "Tu jarra", sub: "Hecha para durar generaciones." },
  ];
  const current = phases.slice().reverse().find(p => progress >= p.t)!;
  const phaseIndex = phases.findIndex(p => p.t === current.t);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: "250vh", background: "#1a1410" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#2a1f17] to-[#1a1410]" />
        <div ref={mountRef} className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />

        <div className="absolute inset-0 flex flex-col justify-between py-16 px-8 pointer-events-none z-10">
          <p className="text-center text-[10px] font-bold tracking-[.32em] uppercase text-[#E2D3C3]/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>El proceso</p>

          <div className="flex-1 flex items-center pl-[7%]">
            <div key={current.num} className="max-w-xs" style={{ animation: "fadeSlideUp .6s ease-out forwards" }}>
              <p className="text-[11px] tracking-[.32em] uppercase text-[#E2D3C3]/50 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Paso {current.num}</p>
              <h2 className="text-[clamp(36px,5vw,64px)] text-[#F5EDE1] leading-[1.05] mb-4" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>{current.title}</h2>
              <p className="text-[14px] text-[#E2D3C3]/70 leading-relaxed font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>{current.sub}</p>
            </div>
          </div>

          <div className="max-w-md mx-auto w-full">
            <div className="flex justify-between text-[10px] tracking-[.2em] uppercase text-[#E2D3C3]/50 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <span>Inicio</span><span>{Math.round(progress * 100)}%</span><span>Final</span>
            </div>
            <div className="h-[2px] bg-[#E2D3C3]/15 rounded-full overflow-hidden">
              <div className="h-full bg-[#E2D3C3] transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
            </div>
            <div className="flex justify-between mt-4">
              {["Madera", "Acero", "Asa", "Base", "Final"].map((label, i) => {
                const active = phaseIndex >= i;
                return (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${active ? "bg-[#E2D3C3] scale-150" : "bg-[#E2D3C3]/30"}`} />
                    <span className={`text-[9px] tracking-[.15em] uppercase transition-colors duration-500 ${active ? "text-[#E2D3C3]" : "text-[#E2D3C3]/30"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {progress < 0.05 && (
          <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col items-center gap-3 text-[#E2D3C3]/40 animate-pulse pointer-events-none z-10">
            <span className="text-[9px] tracking-[.28em] uppercase [writing-mode:vertical-rl]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Desplázate</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#E2D3C3]/40 to-transparent" />
          </div>
        )}
      </div>
      <style jsx global>{`@keyframes fadeSlideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
}
