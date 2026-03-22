import { useState, useCallback, useEffect } from "react";
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    MiniMap,
    Controls,
    Background,
    Handle,
    Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { askAI, saveData } from "../services/api";

// INPUT NODE 
const InputNode = ({ data }) => {
    return (
        <div className="p-1 border border-gray-300 rounded bg-white w-40">
            <Handle type="source" position={Position.Bottom} />

            <textarea
                value={data.prompt || ""}
                onChange={(e) => data.onChange(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="Enter prompt..."
                className="w-full text-xs outline-none resize-none p-1"
            />
        </div>
    );
};

// RESULT Node
const ResultNode = ({ data }) => {
    return (
        <div className="p-2 border border-gray-300 rounded bg-white w-40">
            <Handle type="target" position={Position.Top} />

            <p className="text-xs ">{data.result || "Result will appear"}</p>
        </div>
    );
};

const nodeTypes = {
    inputNode: InputNode,
    resultNode: ResultNode,
};

export default function FlowChart() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    // text cleaning
    const cleanText = (text) => {
        if (!text) return "";
        let cleaned = text
            .replace(/\*\*/g, "")
            .replace(/\n/g, " ")
            .replace(/😊/g, "")
            .trim();

        if (!cleaned.endsWith(".")) cleaned += ".";
        return cleaned;
    };

    //  NODES & EDGES 
    const [nodes, setNodes] = useState([
        {
            id: "1",
            type: "inputNode",
            position: { x: 250, y: 50 },
            data: {
                prompt: "",
                onChange: (val) => setPrompt(val),
            },
        },
        {
            id: "2",
            type: "resultNode",
            position: { x: 250, y: 200 },
            data: { result: "" },
        },
    ]);

    const [edges, setEdges] = useState([
        {
            id: "e1-2",
            source: "1",
            target: "2",
            type: "smoothstep",
            animated: true,
        },
    ]);

    //  SYNC NODES 
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === "1") {
                    return {
                        ...node,
                        data: {
                            prompt,
                            onChange: (val) => setPrompt(val),
                        },
                    };
                }
                if (node.id === "2") {
                    return {
                        ...node,
                        data: { result },
                    };
                }
                return node;
            })
        );
    }, [prompt, result]);

    //  HANDLERS 
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    // RUN 
    const handleRun = async () => {
        if (!prompt) return alert("Enter prompt first!");

        setLoading(true);

        try {
            const res = await askAI(prompt);

            if (res && res.trim() !== "") {
                const cleaned = cleanText(res);
                setResult(cleaned);             // update state
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    //  SAVE 
    const handleSave = async () => {
        if (!prompt || !result) return alert("Nothing to save!");

        try {
            await saveData(prompt, result);
            alert("Saved!");
        } catch {
            alert("Save failed!");
        }
    };

    return (
        <div className="w-full h-[500px]">
            {/* Buttons */}
            <div className="p-2">
                <button
                    onClick={handleRun}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                >
                    {loading ? "Running..." : "Run Flow"}
                </button>

                <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded ml-2 hover:bg-green-700 transition cursor-pointer"
                >
                    Save
                </button>
            </div>

            {/* Flow */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                deleteKeyCode={null}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
}