import { Suspense, lazy, useEffect, useState } from 'react';

const ShaderStack = lazy(() => import('./ShaderStack'));

/** Static fallback used while the shader loads or when WebGL is unavailable. */
const StaticBackground = () => (
  <div
    className="absolute inset-0 z-10 pointer-events-none"
    style={{
      background:
        'radial-gradient(ellipse at 30% 20%, rgba(255,95,3,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,95,3,0.05) 0%, transparent 50%), #EFEFEF',
    }}
  />
);

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export default function ShaderBackground() {
  const [supported, setSupported] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      if (mounted) {
        setSupported(supportsWebGL());
        setChecked(true);
      }
    }, 100);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  if (!checked || !supported) return <StaticBackground />;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Suspense fallback={<StaticBackground />}>
        <ShaderStack />
      </Suspense>
    </div>
  );
}
