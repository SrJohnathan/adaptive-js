'hydrate'

import { signal } from "@adaptive-js/web";

/**
 * Minimal test component to isolate hydrate mode reactivity issue with .map()
 *
 * Problem: When rendering multiple different components via .map() in hydrate mode,
 * prop changes don't trigger re-renders. The SSR HTML is cached and not reactively updated.
 *
 * This component tests if signals that drive .map() props cause re-renders.
 */

interface ItemProps {
    label: string;
    count: () => number;
}

// Simple component that displays different content based on props
const TestItem = (props: ItemProps) => (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "4px" }}>
        <strong>{props.label}</strong>: {() => props.count()}
    </div>
);

// Another simple component with different styling
const TestItemAlt = (props: ItemProps) => (
    <div style={{ border: "2px solid #f00", padding: "8px", margin: "4px", background: "#ffe0e0" }}>
        <em>{props.label}</em> = {() => props.count() * 2}
    </div>
);

export default function HydrateListaMap() {
    // Signal that drives the list render
    const [counter, setCounter] = signal(0);

    // Items to render - alternating between two component types
    const items = () => [
        { id: 1, label: "Item A", component: TestItem },
        { id: 2, label: "Item B", component: TestItemAlt },
        { id: 3, label: "Item C", component: TestItem },
        { id: 4, label: "Item D", component: TestItemAlt },
        { id: 5, label: "Item E", component: TestItem },
    ];

    return (
        <div style={{ padding: "20px", fontFamily: "monospace" }}>
            <h2>HydrateListaMap Test</h2>

            <div style={{ marginBottom: "20px" }}>
                <p>
                    <strong>Counter:</strong> {() => counter()}
                </p>
                <button
                    onClick={() => setCounter(counter() + 1)}
                    style={{
                        padding: "8px 16px",
                        fontSize: "14px",
                        cursor: "pointer",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px"
                    }}
                >
                    Increment Counter
                </button>
            </div>

            <div style={{ background: "#f5f5f5", padding: "12px", borderRadius: "4px", marginBottom: "16px" }}>
                <strong>Test Instructions:</strong>
                <ol>
                    <li>Wait for page to fully hydrate</li>
                    <li>Click "Increment Counter" button</li>
                    <li>Expected: All items below should update to show new counter value</li>
                    <li>Actual (bug): Items stay the same, counter doesn't propagate to components</li>
                </ol>
            </div>

            <div style={{ border: "2px solid #333", padding: "16px", background: "#fff" }}>
                <h3>Items (should update when counter changes):</h3>
                {() =>
                    items().map((item) => {
                        const Component = item.component;
                        return (
                            <Component
                                key={item.id}
                                label={item.label}
                                count={() => counter() + item.id}
                            />
                        );
                    })
                }
            </div>

            <div style={{ marginTop: "20px", padding: "12px", background: "#e8f4f8", borderRadius: "4px", fontSize: "12px" }}>
                <strong>Diagnosis Notes:</strong>
                <ul>
                    <li>✓ Client mode: Should update correctly</li>
                    <li>✓ Single component type: Should update correctly</li>
                    <li>✗ Hydrate + varied components in .map(): Props don't trigger re-renders</li>
                    <li>Issue likely in: <code>packages/web/src/hy/hydrate/reactive.ts</code></li>
                </ul>
            </div>
        </div>
    );
}