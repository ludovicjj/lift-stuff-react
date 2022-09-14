<?php

namespace App\Controller;

use App\Entity\RepLog;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\InvalidCsrfTokenException;
use Symfony\Component\Serializer\SerializerInterface;

#[Route("/api", name: "lift_")]
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

    #[Route("/reps", name: "add", methods: ['POST'])]
    public function addRep(
        Request $request,
        SerializerInterface $serializer
    )
    {
        if ($request->isXmlHttpRequest()) {
            $this->denyAccessUnlessGranted('ROLE_USER');

            if (!$this->isCsrfTokenValid('add_rep_log_item', $request->toArray()['_token'] ?? null)) {
                throw new InvalidCsrfTokenException('Invalid CSRF token.');
            }

            $repLog = $serializer->deserialize($request->getContent(), RepLog::class, 'json', ['groups' => 'add_rep_log']);
            dd($repLog);
        }

        return new JsonResponse([
            'message' => 'Request header X-Requested-With is missing'
        ], Response::HTTP_BAD_REQUEST);
    }
}