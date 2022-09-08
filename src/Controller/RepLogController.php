<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;

class RepLogController extends BaseController
{
    #[Route("/", name: "rep_log")]
    #[IsGranted("ROLE_USER")]
    public function index(SerializerInterface $serializer): Response
    {
        $repLogModel = $this->findAllRepLogModels();
        $repLogs = $serializer->serialize($repLogModel, 'json');

        return $this->render('reps/rep_log.html.twig', [
            'repLogs' => $repLogs
        ]);
    }
}