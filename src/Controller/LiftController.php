<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/api", name: "rep_log_")]
class LiftController extends BaseController
{
    #[Route("/reps", name: "list", methods: ['GET'])]
    public function listRep(): Response
    {
        $models = $this->findAllRepLogModels();

        return $this->createApiResponse([
            'items' => $models
        ]);
    }
}