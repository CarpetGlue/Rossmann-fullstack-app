import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchEpisodes } from "../api/episodes";
import type { Episode, PaginatedResponse } from "../types/episode";
import EpisodeFilters from "./EpisodeFilters";
import { CharacterList } from "./CharacterList";
import React from "react";

export default function EpisodeTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<PaginatedResponse<Episode> | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // URL-driven state
    const page = Number(searchParams.get("page") ?? 1);

    const filters = {
        name: searchParams.get("name") ?? undefined,
        date_from: searchParams.get("date_from") ?? undefined,
        date_to: searchParams.get("date_to") ?? undefined,
    };

    const sort = {
        field: searchParams.get("sort") ?? "air_date",
        direction:
            (searchParams.get("direction") as "asc" | "desc") ?? "asc",
    };

    useEffect(() => {
        fetchEpisodes({
            page,
            ...filters,
            sort: sort.field,
            direction: sort.direction,
        }).then(setData);
    }, [page, filters.name, filters.date_from, filters.date_to, sort.field, sort.direction]);

    function updateParams(newParams: Record<string, string | undefined>) {
        const updated = new URLSearchParams(searchParams);

        Object.entries(newParams).forEach(([key, value]) => {
            if (value === undefined || value === "") {
                updated.delete(key);
            } else {
                updated.set(key, value);
            }
        });

        setSearchParams(updated);
    }

    function toggleSort(field: string) {
        setExpandedId(null);

        const newDirection =
            sort.field === field && sort.direction === "asc"
                ? "desc"
                : "asc";

        updateParams({
            sort: field,
            direction: newDirection,
            page: "1",
        });
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
        <div className="centered">
            <h2>Rick and Morty Episodes</h2>

            <EpisodeFilters
                onChange={(newFilters) => {
                    setExpandedId(null);
                    updateParams({
                        ...newFilters,
                        page: "1",
                    });
                }}
            />

            <table border={1} cellPadding={6}>
                <thead>
                    <tr>
                        <th
                            className="sortable"
                            onClick={() => toggleSort("name")}
                        >
                            Name{" "}
                            <span className="sort-indicator">
                                {renderSortArrow("name")}
                            </span>
                        </th>

                        <th
                            className="sortable"
                            onClick={() => toggleSort("air_date")}
                        >
                            Air Date{" "}
                            <span className="sort-indicator">
                                {renderSortArrow("air_date")}
                            </span>
                        </th>

                        <th>Episode</th>
                        <th>Characters</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((episode) => {
                        const isOpen = expandedId === episode.id;

                        return (
                            <React.Fragment key={episode.id}>
                                <tr>
                                    <td>{episode.name}</td>
                                    <td>
                                        {episode.air_date
                                            ? new Date(
                                                  episode.air_date
                                              ).toLocaleDateString("en-CA")
                                            : "-"}
                                    </td>
                                    <td>{episode.episode_code}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                setExpandedId(
                                                    isOpen ? null : episode.id
                                                )
                                            }
                                        >
                                            {isOpen ? "Hide" : "Show"} characters
                                        </button>
                                    </td>
                                </tr>

                                {isOpen && (
                                    <tr>
                                        <td colSpan={4}>
                                            <CharacterList
                                                characters={
                                                    episode.characters
                                                }
                                            />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>

            <div style={{ marginTop: "1rem" }}>
                <button
                    disabled={page === 1}
                    onClick={() =>
                        updateParams({
                            page: String(page - 1),
                        })
                    }
                >
                    Prev
                </button>

                <span style={{ margin: "0 1rem" }}>
                    Page {data.current_page} / {data.last_page}
                </span>

                <button
                    disabled={page === data.last_page}
                    onClick={() =>
                        updateParams({
                            page: String(page + 1),
                        })
                    }
                >
                    Next
                </button>
            </div>
        </div>
    );
}