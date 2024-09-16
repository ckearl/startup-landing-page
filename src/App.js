import React, { useRef, Suspense } from "react";
import {
	Text3D,
	OrbitControls,
	Center,
	Stars,
	Float,
	Sparkles,
	useMatcapTexture,
} from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";

function LoadingIndicator() {
	const ref = useRef();
	useFrame((state) => {
		ref.current.rotation.x = Math.sin(state.clock.elapsedTime) * 2;
		ref.current.rotation.y = Math.sin(state.clock.elapsedTime) * 2;
	});
	return (
		<mesh ref={ref}>
			<boxGeometry args={[1, 1, 1]} />
			<meshNormalMaterial />
		</mesh>
	);
}

function Hero() {
	const [matcapTexture] = useMatcapTexture("CB4E88_F99AD6_F384C3_ED75B9");
	const ref = useRef();
	const { width: w, height: h } = useThree((state) => state.viewport);

	return (
		<Center>
			<Float speed={1}>
				<Text3D
					position={[0, 0, 0]}
					ref={ref}
					font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
					size={w / 15}
					height={0.2}
					curveSegments={12}
				>
					{`Any\ntext`}
					<meshMatcapMaterial matcap={matcapTexture} />
				</Text3D>
			</Float>
		</Center>
	);
}

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.log("Error caught by boundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}

export default function App() {
	return (
		<div className="scene" style={{ width: "100vw", height: "100vh" }}>
			<ErrorBoundary>
				<Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
					<OrbitControls enableZoom={true} enablePan={true} />
					<Suspense fallback={<LoadingIndicator />}>
						<Stars
							radius={100}
							depth={50}
							count={1000}
							factor={4}
							saturation={0}
							fade
						/>
						<Sparkles count={100} size={1} scale={10} color="#fff3b0" />
						<Hero />
					</Suspense>
					<ambientLight intensity={0.6} />
				</Canvas>
			</ErrorBoundary>
		</div>
	);
}
