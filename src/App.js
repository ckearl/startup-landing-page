import React, { useState, useRef, Suspense, useEffect } from "react";
import {
	Text3D,
	OrbitControls,
	Center,
	Stars,
	Float,
	Sparkles,
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
		<header className="absolute top-0 left-0 w-full p-2.5 bg-white bg-opacity-50 text-white z-50 flex justify-start items-center gap-8">
			<h1 className="text-2xl font-bold">3D Forge</h1>
			<a
				href="https://codesandbox.io/s/react-three-fiber-3d-text-7w1q4"
				target="_blank"
				rel="noreferrer"
				className="text-white no-underline transition-all hover:text-gray-200"
			>
				Open the Editor
			</a>
			<a
				href="https://codesandbox.io/s/react-three-fiber-3d-text-7w1q4"
				target="_blank"
				rel="noreferrer"
				className="text-white no-underline transition-all hover:text-gray-200"
			>
				Learn More
			</a>
			<a
				href="https://codesandbox.io/s/react-three-fiber-3d-text-7w1q4"
				target="_blank"
				rel="noreferrer"
				className="text-white no-underline transition-all hover:text-gray-200"
			>
				Our History
			</a>
		</header>
	);
}

function Hero({ text, color, fontFamily }) {
	const ref = useRef();
	const { width: w } = useThree((state) => state.viewport);

	return (
		<Center>
			<Float speed={1}>
				<Text3D
					position={[15, -2, 0]}
					ref={ref}
					font={`https://threejs.org/examples/fonts/${fontFamily}.typeface.json`}
					size={w / 30}
					height={0.2}
					curveSegments={12}
				>
					{text}
					<meshStandardMaterial color={color} />
				</Text3D>
			</Float>
		</Center>
	);
}

export default function App() {
	const [displayText, setDisplayText] = useState(`Welcome to\n3D Forge.`);
	const [inputText, setInputText] = useState("");
	const [isAnimating, setIsAnimating] = useState(true);
	const [textColor, setTextColor] = useState("#CB4E88");
	const [fontFamily, setFontFamily] = useState("helvetiker_regular");

	useEffect(() => {
		if (!isAnimating) return;

		const interval = setInterval(() => {
			setDisplayText((prevText) => {
				if (prevText === `Welcome to\n3D Forge...`)
					return `Welcome to\n3D Forge.`;
				return prevText + ".";
			});
		}, 500);

		return () => clearInterval(interval);
	}, [isAnimating]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const words = inputText.split(" ").slice(0, 5);
		setDisplayText(words.join("\n"));
		setInputText("");
		setIsAnimating(false);
	};

	return (
		<React.Fragment>
			<Header />
			<div className="w-screen h-screen relative bg-black">
				<div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-1/3 p-5 bg-white bg-opacity-10 rounded-lg z-50 flex flex-col justify-between">
					<div className="space-y-2.5 h-24">
						<h2 className="text-white text-2xl font-bold">3D Forge</h2>
						<p className="text-white text-sm mt-2">
							Create 3D models online. For free, forever. Try out the 3D text
							editor below.
						</p>
					</div>
					<form onSubmit={handleSubmit} className="space-y-2.5">
						<input
							type="text"
							value={inputText}
							onChange={(e) => setInputText(e.target.value)}
							placeholder="Enter up to 5 words"
							className="w-full p-2.5 bg-white bg-opacity-20 text-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="flex flex-row justify-around">
							<input
								type="color"
								value={textColor}
								onChange={(e) => setTextColor(e.target.value)}
								className="w-25 h-10"
							/>
							<select className="w-25 h-10" onChange={(e) => setFontFamily(e.target.value)}>
								<option value="helvetiker_regular">Helvetiker</option>
								<option value="optimer_bold">Optimer</option>
								<option value="gentilis_regular">Gentilis</option>
							</select>
						</div>
						<button
							type="submit"
							className="w-full p-2.5 bg-white bg-opacity-30 text-white border-none rounded-md cursor-pointer hover:bg-opacity-40 transition-all"
						>
							Update Text
						</button>
					</form>
				</div>
				<div className="absolute right-0 w-full h-full">
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
							<Hero text={displayText} color={textColor} fontFamily={fontFamily} />
						</Suspense>
						<ambientLight intensity={0.8} />
					</Canvas>
				</div>
			</div>
		</React.Fragment>
	);
}
