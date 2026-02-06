import { useEffect, useState } from "react";
import { fetchEpisodes } from "../api/episodes";
import type { Episode, PaginatedResponse } from "../types/episode";
import EpisodeFilters from "./EpisodeFilters";

export default function EpisodeTable() {
    const [data, setData] = useState<PaginatedResponse<Episode> | null>(null);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState<{
        field: string;
        direction: "asc" | "desc";
    }>({
        field: "air_date",
        direction: "asc",
    });

    useEffect(() => {
        fetchEpisodes({
            page,
            ...filters,
            sort: sort.field,
            direction: sort.direction,
        }).then(setData);
    }, [page, filters, sort]);

    function toggleSort(field: string) {
        setPage(1);
        setSort((prev) => ({
            field,
            direction:
                prev.field === field && prev.direction === "asc" ? "desc" : "asc",
        }));
    }

    function renderSortArrow(field: string) {
        if (sort.field !== field) {
            return <span style={{ marginLeft: 4, opacity: 0.3 }}>⇅</span>;
        }

        return (
            <span style={{ marginLeft: 4 }}>
                {sort.direction === "asc" ? "↑" : "↓"}
            </span>
        );
    }


    if (!data) return <p>Loading...</p>;

    return (
        <div>
            <h2>Rick and Morty Episodes</h2>

            <EpisodeFilters
                onChange={(newFilters) => {
                    setPage(1);
                    setFilters((prev) => ({ ...prev, ...newFilters }));
                }}
            />

            <table border={1} cellPadding={6}>
                <thead>
                    <tr>
                        <th
                            className="sortable"
                            onClick={() => toggleSort("name")}
                        >
                            Name <span className="sort-indicator">{renderSortArrow("name")}</span>
                        </th>

                        <th
                            className="sortable"
                            onClick={() => toggleSort("air_date")}
                        >
                            Air Date <span className="sort-indicator">{renderSortArrow("air_date")}</span>
                        </th>

                        <th>Episode</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((episode) => (
                        <tr key={episode.id}>
                            <td>{episode.name}</td>
                            <td>{episode.air_date ?? "-"}</td>
                            <td>{episode.episode_code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: "1rem" }}>
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                    Prev
                </button>

                <span style={{ margin: "0 1rem" }}>
                    Page {data.current_page} / {data.last_page}
                </span>

                <button
                    disabled={page === data.last_page}
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}