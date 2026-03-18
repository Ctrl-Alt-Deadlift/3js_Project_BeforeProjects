import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery

const Target = (props) => {
  const targetRef = useRef();
  const { scene } = useGLTF(
    '/public/models/',
  );

  // Media query to detect if screen width is less than 640px
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  useGSAP(() => {
    // GSAP animation for y-axis floating effect
    gsap.to(targetRef.current.position, {
      y: targetRef.current.position.x + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });
  });

  // Set the x position conditionally based on screen size
  useEffect(() => {
    if (targetRef.current) {
      if (isSmallScreen) {
        targetRef.current.position.x = -8; // Set x to -7 on small screens


      } else {
        targetRef.current.position.x = -12; // Default x position for larger screens (adjust as needed)

      }
    }
  }, [isSmallScreen]); // Re-run effect when screen size changes

  return (
    <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Target;
