import type { Character } from "../types/episode";

type Props = {
    characters: Character[];
};

export function CharacterList({ characters }: Props) {
    return (
        <div style={{ padding: "0.75rem 1rem" }}>
            <strong>Characters ({characters.length})</strong>

            <ul style={{ marginTop: 8, paddingLeft: 16, listStyle: "none" }}>
                {characters.map((c) => (
                    <li key={c.id}>
                        <strong>{c.name}</strong> — {c.species}, {c.gender},{" "}
                        <em>{c.status}</em>
                    </li>
                ))}
            </ul>
        </div>
    );
}