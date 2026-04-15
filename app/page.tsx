"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function Home() {
  return (
    <div id="app" className="flex h-screen bg-[#0d1117] text-[#e6edf3] font-sans">
      <aside id="sidebar" className="w-[340px] p-4 bg-[#161b22] border-r border-[#222] overflow-y-auto">
        <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          CalMulti3D
        </h1>
        
        <section className="panel">
          <h2 className="font-semibold">Función</h2>
          <div className="space-y-3">
            <div>
              <label htmlFor="fnSelect">Selecciona una fórmula</label>
              <select id="fnSelect" className="w-full p-2 border border-[#2a2f3a] rounded-md bg-[#0b0f14] text-[#e6edf3]"></select>
            </div>
            <div>
              <label htmlFor="fnInput">z = f(x, y)</label>
              <input id="fnInput" type="text" placeholder="7*x*y / exp(x^2 + y^2)" className="w-full p-2 border border-[#2a2f3a] rounded-md bg-[#0b0f14] text-[#e6edf3]" />
            </div>
            <div id="texDisplay" className="tex-display" aria-live="polite"></div>
            
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label htmlFor="viewMode">Vista</label>
                <select id="viewMode" className="w-full p-2 border border-[#2a2f3a] rounded-md bg-[#0b0f14] text-[#e6edf3]">
                  <option value="3D" defaultValue="3D">3D</option>
                  <option value="2D">2D (curvas de nivel)</option>
                </select>
              </div>
              <div>
                <label htmlFor="contourLevels">Curvas <span id="contourLevelsLabel" className="float-right text-blue-400">12</span></label>
                <input id="contourLevels" type="range" min="5" max="40" step="1" defaultValue="12" className="w-full accent-blue-500" />
              </div>
              <div>
                <label htmlFor="contourWidth">Grosor <span id="contourWidthLabel" className="float-right text-blue-400">1.0</span></label>
                <input id="contourWidth" type="range" min="0.5" max="3" step="0.1" defaultValue="1" className="w-full accent-blue-500" />
              </div>
              <div>
                <label htmlFor="contourColor">Color</label>
                <select id="contourColor" className="w-full p-2 border border-[#2a2f3a] rounded-md bg-[#0b0f14] text-[#e6edf3]">
                  <option value="red" defaultValue="red">Rojo</option>
                  <option value="blue">Azul</option>
                  <option value="green">Verde</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input id="contourGradient" type="checkbox" className="accent-blue-500 w-4 h-4" />
                <span className="text-sm">Degradado</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input id="useFixedColor" type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
                <span className="text-sm">Usar color fijo</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input id="useCustomWidth" type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
                <span className="text-sm">Grosor personalizado</span>
              </label>
            </div>
            
            <button id="save2DBtn" style={{ display: 'none' }} className="w-full">Guardar imagen 2D</button>
            
            <div className="mt-3">
              <label htmlFor="resolution">Resolución <span id="resolutionLabel" className="float-right text-blue-400">60</span></label>
              <input id="resolution" type="range" min="20" max="150" step="5" defaultValue="60" className="w-full accent-blue-500" />
            </div>
            <button id="addGraphBtn" className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium border-0">Añadir a la gráfica</button>
          </div>
        </section>

        <section className="panel mt-6">
          <h2 className="font-semibold">Axes</h2>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label htmlFor="xmin">x-min</label>
              <input id="xmin" type="number" step="0.1" defaultValue="-3" />
            </div>
            <div>
              <label htmlFor="xmax">x-max</label>
              <input id="xmax" type="number" step="0.1" defaultValue="3" />
            </div>
            <div>
              <label htmlFor="ymin">y-min</label>
              <input id="ymin" type="number" step="0.1" defaultValue="-3" />
            </div>
            <div>
              <label htmlFor="ymax">y-max</label>
              <input id="ymax" type="number" step="0.1" defaultValue="3" />
            </div>
            <div>
              <label htmlFor="zmin">z-min</label>
              <input id="zmin" type="number" step="0.1" defaultValue="-2" />
            </div>
            <div>
              <label htmlFor="zmax">z-max</label>
              <input id="zmax" type="number" step="0.1" defaultValue="2" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label htmlFor="zclipLow">lower z-clip</label>
              <input id="zclipLow" type="number" step="0.1" placeholder="(opcional)" />
            </div>
            <div>
              <label htmlFor="zclipHigh">upper z-clip</label>
              <input id="zclipHigh" type="number" step="0.1" placeholder="(opcional)" />
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input id="clipToBox" type="checkbox" className="accent-blue-500 w-4 h-4" />
              <span className="text-sm">Recortar a caja 3D</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input id="showGrid3D" type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
              <span className="text-sm">Mostrar cuadrícula 3D</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input id="showAxes3D" type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
              <span className="text-sm">Mostrar ejes 3D</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input id="autoUpdateGraphs" type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
              <span className="text-sm">Actualizar superficies al aplicar</span>
            </label>
          </div>
          
          <button id="applyAxesBtn" className="w-full">Aplicar límites</button>
        </section>

        <section className="panel mt-6">
          <h2 className="font-semibold flex justify-between items-center">
            Gráficas
            <button id="clearAllBtn" className="danger text-xs px-2 py-1 h-auto">Limpiar todo</button>
          </h2>
          <ul id="graphsList" className="list"></ul>
        </section>

        <section className="panel mt-6">
          <h2 className="font-semibold">Opciones</h2>
          <div className="mb-3">
            <button id="resetOptionsBtn" className="w-full mb-3">Restablecer opciones</button>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="zoom3D">Zoom 3D <span id="zoom3DLabel" className="float-right text-blue-400">45°</span></label>
                <input id="zoom3D" type="range" min="25" max="85" step="1" className="w-full accent-blue-500" />
              </div>
              <div className="flex items-end">
                <button id="fitView3DBtn" className="w-full h-[38px] text-xs">Ajustar vista</button>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="graphScale3D">Escala de gráfica 3D <span id="graphScale3DLabel" className="float-right text-blue-400">1.00×</span></label>
              <input id="graphScale3D" type="range" min="0.1" max="2.0" step="0.05" defaultValue="1" className="w-full accent-blue-500" />
            </div>
          </div>
        </section>

        <section className="panel mt-6">
          <h2 className="font-semibold">Cálculos</h2>
          <div className="space-y-2 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input id="autoPoint" type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
              <span className="text-sm">Elegir punto automáticamente</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input id="showGradient" type="checkbox" className="accent-blue-500 w-4 h-4" />
              <span className="text-sm">Mostrar gradiente en 2D</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input id="showGradientField2D" type="checkbox" className="accent-blue-500 w-4 h-4" />
              <span className="text-sm">Mostrar campo de gradiente en 2D</span>
            </label>
          </div>
          
          <div className="mb-3">
            <label htmlFor="gradientFieldDensity">Densidad de flechas <span id="gradientFieldDensityLabel" className="float-right text-blue-400">10</span></label>
            <input id="gradientFieldDensity" type="range" min="5" max="20" step="1" defaultValue="10" className="w-full accent-blue-500" />
          </div>

          <div className="mb-3">
            <button id="calcUseCenter" title="Fijar x₀,y₀ al centro de la caja actual" className="w-full">Usar centro de la caja</button>
            <p id="calcPointHint" className="text-xs text-gray-400 mt-1 text-center">Vacío ⇒ se usa el centro</p>
          </div>

          <div className="space-y-2 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input id="showGradient3D" type="checkbox" className="accent-blue-500 w-4 h-4" />
              <span className="text-sm">Mostrar gradiente en 3D</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input id="showGradientField3D" type="checkbox" className="accent-blue-500 w-4 h-4" />
              <span className="text-sm">Mostrar campo de gradiente en 3D</span>
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="gradientScale">Escala flecha <span id="gradientScaleLabel" className="float-right text-blue-400">0.20</span></label>
            <input id="gradientScale" type="range" min="0.05" max="0.5" step="0.05" defaultValue="0.2" className="w-full accent-blue-500" />
          </div>

          <div className="space-y-2 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input id="calcEnabled" type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
              <span className="text-sm text-green-400">Habilitar cálculos automáticos</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input id="useSymbolicDerivatives" type="checkbox" className="accent-blue-500 w-4 h-4" />
              <span className="text-sm">Usar derivadas simbólicas (si aplica)</span>
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="derivHScale">Factor h derivadas <span id="derivHScaleLabel" className="float-right text-blue-400">1.00×</span></label>
            <input id="derivHScale" type="range" min="0.1" max="2.0" step="0.1" defaultValue="1" className="w-full accent-blue-500" />
          </div>

          <div id="calcDomainRange" className="calc-block text-sm"></div>
          <div id="calcDerivatives" className="calc-block text-sm"></div>
          
          <hr className="border-[#222] my-4" />
          
          <h3 className="font-semibold text-sm mb-2 text-gray-300">Integrales</h3>
          <div className="mb-3">
            <label htmlFor="integralRes">Resolución integral <span id="integralResLabel" className="float-right text-blue-400">60</span></label>
            <input id="integralRes" type="range" min="20" max="120" step="10" defaultValue="60" className="w-full accent-blue-500" />
          </div>
          
          <div className="mb-3">
            <label htmlFor="rhoInput">Densidad ρ(x,y)</label>
            <input id="rhoInput" type="text" placeholder="1" />
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1">
                <label htmlFor="volumeZ0Input" className="text-xs">Plano z0</label>
                <input id="volumeZ0Input" type="number" step="0.1" defaultValue="0" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer mt-4">
                <input id="volumeUseRho" type="checkbox" className="accent-blue-500 w-4 h-4" />
                <span className="text-xs">Usar ρ como peso</span>
              </label>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <button id="computeDoubleIntegralBtn" className="bg-[#1f2937] hover:bg-[#374151]">Calcular ∬ f(x,y) dA</button>
            <button id="computeCentroidBtn" className="bg-[#1f2937] hover:bg-[#374151]">Centro de masa (ρ)</button>
            <button id="computeVolumeBtn" className="bg-[#1f2937] hover:bg-[#374151]">Volumen bajo superficie (z=0)</button>
          </div>
          <div id="calcIntegrals" className="calc-block text-sm"></div>
          
          <hr className="border-[#222] my-4" />
          
          <h3 className="font-semibold text-sm mb-2 text-gray-300">Optimización (Lagrange)</h3>
          <div className="mb-3">
            <label htmlFor="constraintInput">Restricción g(x,y)=0</label>
            <input id="constraintInput" type="text" placeholder="x + y - 1" />
          </div>
          <button id="solveLagrangeBtn" className="w-full bg-[#1f2937] hover:bg-[#374151]">Resolver multiplicadores</button>
          <div id="calcOptimization" className="calc-block text-sm"></div>
        </section>

        <section className="panel mt-6 text-sm text-gray-400">
          <h2 className="font-semibold text-gray-300">Ayuda Teórica</h2>
          <p className="mb-2">
            Esta calculadora trabaja con funciones de dos variables en la forma <span>z = f(x, y)</span> y visualiza tanto la superficie 3D como las curvas de nivel 2D dentro de los límites definidos por los ejes.
          </p>
          <ul className="list-disc pl-4 space-y-1 mb-4 opacity-80">
            <li>Evita singularidades (división por cero, log de negativo, etc.).</li>
            <li>Si <span>f(x,y)</span> no está definida en algún punto, se omite.</li>
            <li>Más resolución mejora detalle pero aumenta costo de cómputo.</li>
            <li>Usa el botón "Usar centro de la caja" para fijar <span>(x₀,y₀)</span> si los campos están vacíos o inválidos.</li>
          </ul>
        </section>
      </aside>

      <main id="main" className="flex-1 relative bg-black">
        <div id="canvasContainer" className="w-full h-full absolute inset-0"></div>
        <div id="contourContainer" className="w-full h-full absolute inset-0 hidden bg-[#0d1117]">
          <canvas id="contourCanvas" className="w-full h-full block"></canvas>
        </div>
      </main>

      <Script src="/main.js" strategy="lazyOnload" type="module" />
    </div>
  );
}
