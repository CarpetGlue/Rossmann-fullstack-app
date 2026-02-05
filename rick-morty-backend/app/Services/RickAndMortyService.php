<?php

namespace App\Services;

use Softonic\GraphQL\ClientBuilder;

class RickAndMortyService
{
    private $client;

    public function __construct()
    {
        $this->client = ClientBuilder::build(
            'https://rickandmortyapi.com/graphql'
        );
    }

    public function fetchEpisodes(int $page): array
    {
        $query = <<<'GRAPHQL'
query ($page: Int!) {
  episodes(page: $page) {
    info {
      pages
    }
    results {
      id
      name
      air_date
      episode
      characters {
        id
        name
        status
        species
        gender
      }
    }
  }
}
GRAPHQL;

        return $this->client
            ->query($query, ['page' => $page])
            ->getData();
    }
}
