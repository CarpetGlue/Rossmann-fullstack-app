
interface Props {
    onChange: (filters: {
        name?: string;
        date_from?: string;
        date_to?: string;
    }) => void;
}

// Earliest episode air date
const MIN_DATE = "2013-12-02";

// Today's date in YYYY-MM-DD format
const TODAY = new Date().toISOString().split("T")[0];

//TODO: controlled input values & debounce search

export default function EpisodeFilters({ onChange }: Props) {
    return (
        <div id="filters">
            <div>
                <label>
                    Search
                    <input
                        className="inputField"
                        type="text"
                        placeholder="Episode name"
                        onChange={(e) => onChange({ name: e.target.value })}
                    />
                </label>
            </div>

            <div>
                <label>
                    From
                    <input
                        className="inputField"
                        type="date"
                        onChange={(e) => onChange({ date_from: e.target.value })}
                        min={MIN_DATE}
                        max={TODAY}
                    />
                </label>
            </div>

            <div>
                <label>
                    To
                    <input
                        className="inputField"
                        type="date"
                        min={MIN_DATE}
                        max={TODAY}
                        onChange={(e) => onChange({ date_to: e.target.value })}
                    />
                </label>
            </div>
        </div>
    );
}