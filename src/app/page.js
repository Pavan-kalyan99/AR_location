"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.getElementById("aframe-script")) {
      setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "aframe-script";
    script.src = "https://aframe.io/releases/1.5.0/aframe.min.js";
    script.onload = () => {
      if (!AFRAME.components["tap-place"]) {
        AFRAME.registerComponent("tap-place", {
          init: function () {
            const model = document.getElementById("duck");
            const reticle = document.getElementById("reticle");
            this.el.sceneEl.addEventListener("click", () => {
              if (reticle && reticle.getAttribute("visible")) {
                model.setAttribute("position", reticle.getAttribute("position"));
                model.setAttribute("visible", true);
              }
            });
          },
        });
      }
      setReady(true);
    };
    document.body.appendChild(script);
  }, []);

  if (!ready) {
    return <div>Loading WebXR AR...</div>;
  }

  return (
    <div style={{ height: "100vh" }}>
      <a-scene
        tap-place
        vr-mode-ui="enabled: false"
        renderer="colorManagement: true;"
        webxr="mode: ar; optionalFeatures: hit-test, local-floor;"
        embedded
      >
        {/* Reticle */}
        <a-entity
          id="reticle"
          geometry="primitive: ring; radiusInner: 0.05; radiusOuter: 0.06;"
          material="color: yellow; shader: flat;"
          rotation="-90 0 0"
          visible="false"
        ></a-entity>

        {/* Model (hidden until placed) */}
        <a-entity
          id="duck"
          gltf-model="https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Duck/glTF-Binary/Duck.glb"
          visible="false"
          scale="0.2 0.2 0.2"
        ></a-entity>

        <a-camera></a-camera>
      </a-scene>
    </div>
  );
}



// import Link from "next/link";

// export default function Home() {
//   return (
//     <>

//     <div style={{ height: "100vh" }}>
//       <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
//       <script src="https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/aframe/build/aframe-ar.js"></script>

//       <a-scene embedded arjs>
//         <a-text value="Hello AR!" position="0 0 -2" color="red"></a-text>
//         <a-box position="0 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
//       </a-scene>
//     </div>

//     </>
//     // <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
//     //   <h1 className="text-4xl font-bold mb-6">🏴‍☠️ AR Treasure Hunt</h1>
//     //   <p className="text-lg mb-6 text-center max-w-lg">
//     //     Explore the real world and find hidden treasures using Augmented Reality.
//     //   </p>
//     //   <Link href="/ar">
//     //     <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-500 transition">
//     //       Start AR Hunt
//     //     </button>
//     //   </Link>
//     // </main>
//   );
// }

// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
// //       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={180}
// //           height={38}
// //           priority
// //         />
// //         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
// //           <li className="mb-2 tracking-[-.01em]">
// //             Get started by editing{" "}
// //             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
// //               src/app/page.js
// //             </code>
// //             .
// //           </li>
// //           <li className="tracking-[-.01em]">
// //             Save and see your changes instantly.
// //           </li>
// //         </ol>

// //         <div className="flex gap-4 items-center flex-col sm:flex-row">
// //           <a
// //             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={20}
// //               height={20}
// //             />
// //             Deploy now
// //           </a>
// //           <a
// //             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Read our docs
// //           </a>
// //         </div>
// //       </main>
// //       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/file.svg"
// //             alt="File icon"
// //             width={16}
// //             height={16}
// //           />
// //           Learn
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/window.svg"
// //             alt="Window icon"
// //             width={16}
// //             height={16}
// //           />
// //           Examples
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/globe.svg"
// //             alt="Globe icon"
// //             width={16}
// //             height={16}
// //           />
// //           Go to nextjs.org →
// //         </a>
// //       </footer>
// //     </div>
// //   );
// // }
