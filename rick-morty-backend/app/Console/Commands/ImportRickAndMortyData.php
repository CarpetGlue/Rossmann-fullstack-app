<?php

namespace App\Console\Commands;

use App\Models\Character;
use App\Models\Episode;
use App\Services\RickAndMortyService;
use Illuminate\Console\Command;

class ImportRickAndMortyData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rickmorty:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import episodes and characters from Rick & Morty GraphQL API';

    /**
     * Execute the console command.
     */
    public function handle(RickAndMortyService $service)
    {
        $page = 1;

        do {
            $data = $service->fetchEpisodes($page);
            $episodesData = $data['episodes']['results'];
            $totalPages = $data['episodes']['info']['pages'];

            foreach ($episodesData as $episodeData) {
                $episode = Episode::updateOrCreate(
                    ['api_id' => $episodeData['id']],
                    [
                        'name' => $episodeData['name'],
                        'air_date' => $episodeData['air_date']
                            ? date('Y-m-d', strtotime($episodeData['air_date']))
                            : null,
                        'episode_code' => $episodeData['episode'],
                    ]
                );

                foreach ($episodeData['characters'] as $charData) {
                    $character = Character::updateOrCreate(
                        ['api_id' => $charData['id']],
                        [
                            'name' => $charData['name'],
                            'status' => $charData['status'],
                            'species' => $charData['species'],
                            'gender' => $charData['gender'],
                        ]
                    );

                    $episode
                        ->characters()
                        ->syncWithoutDetaching($character->id);
                }
            }

            $page++;
        } while ($page <= $totalPages);

        $this->info('Rick & Morty data imported successfully.');
    }
}
