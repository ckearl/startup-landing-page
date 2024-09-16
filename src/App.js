import React, { useState, useRef, Suspense } from "react";
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

function Header() {
	return (
		<header
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100vw",
				padding: "10px",
				backgroundColor: "rgba(225, 225, 225, 0.5)",
				color: "white",
				zIndex: 100,
				display: "flex",
				justifyContent: "flex-start",
				alignItems: "center",
				gap: "32px",
			}}
		>
			<h1>3D Forge</h1>
			<a
				href="https://codesandbox.io/s/react-three-fiber-3d-text-7w1q4"
				target="_blank"
				rel="noreferrer"
				style={{
					color: "white",
					textDecoration: "none",
					transition: "all",
				}}
			>
				Open the Editor
			</a>
			<a
				href="https://codesandbox.io/s/react-three-fiber-3d-text-7w1q4"
				target="_blank"
				rel="noreferrer"
				style={{
					color: "white",
					textDecoration: "none",
					transition: "all",
				}}
			>
				Learn More
			</a>
			<a
				href="https://codesandbox.io/s/react-three-fiber-3d-text-7w1q4"
				target="_blank"
				rel="noreferrer"
				style={{
					color: "white",
					textDecoration: "none",
					transition: "all",
				}}
			>
				Our History
			</a>
		</header>
	);
}

function Hero({ text }) {
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
					size={w / 20}
					height={0.2}
					curveSegments={12}
				>
					{text}
					<meshMatcapMaterial matcap={matcapTexture} />
				</Text3D>
			</Float>
		</Center>
	);
}

function InputForm({ onTextSubmit }) {
	const [inputText, setInputText] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const words = inputText.split(" ").slice(0, 5);
		onTextSubmit(words.join("\n"));
		setInputText("");
	};

	return (
		<React.Fragment>
			<div
				style={{
					position: "absolute",
					left: "10px",
					top: "50%",
					transform: "translateY(-50%)",
					width: "calc(33% - 20px)",
					padding: "20px",
					backgroundColor: "rgba(255, 255, 255, 0.1)",
					borderRadius: "10px",
				}}
			>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						placeholder="Enter up to 5 words"
						style={{
							width: "100%",
							padding: "10px",
							marginBottom: "10px",
							backgroundColor: "rgba(255, 255, 255, 0.2)",
							color: "white",
							border: "none",
							borderRadius: "5px",
						}}
					/>
					<button
						type="submit"
						style={{
							width: "100%",
							padding: "10px",
							backgroundColor: "rgba(255, 255, 255, 0.3)",
							color: "white",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
						}}
					>
						Update Text
					</button>
				</form>
			</div>
		</React.Fragment>
	);
}

export default function App() {
	const [displayText, setDisplayText] = useState("Enter\nYour\nText");

	return (
		<React.Fragment>
			<Header />
			<div
				className="scene"
				style={{
					width: "100vw",
					height: "100vh",
					position: "relative",
					backgroundColor: "#000",
				}}
			>
				<InputForm onTextSubmit={setDisplayText} />
				<div
					style={{
						position: "absolute",
						right: 0,
						width: "66%",
						height: "100%",
					}}
				>
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
							<Hero text={displayText} />
						</Suspense>
						<ambientLight intensity={0.6} />
					</Canvas>
				</div>
			</div>
		</React.Fragment>
	);
}
