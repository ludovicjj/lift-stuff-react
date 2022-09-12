<?php

namespace App\Controller;

use App\Repository\RepLogRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;

class RepLogController extends BaseController
{
    #[Route("/", name: "rep_log")]
    #[IsGranted("ROLE_USER")]
    public function index(SerializerInterface $serializer, RepLogRepository $repLogRepository): Response
    {
        $repLogModel = $this->findAllRepLogModels();
        $repLogs = $serializer->serialize($repLogModel, 'json');
        $leadBoard = $this->getLeadBoard($repLogRepository);

        return $this->render('reps/rep_log.html.twig', [
            'repLogs' => $repLogs,
            'leadBoard' => $leadBoard
        ]);
    }

    private function getLeadBoard(RepLogRepository $repLogRepository): array
    {
        $leadBoardDetails = $repLogRepository->getLeadBoardDetails();
        $leadBoard = [];

        foreach ($leadBoardDetails as $detail) {
            $leadBoard[] = [
                'weight' => $detail['weight_sum'],
                'username' => strstr($detail['user_email'],'@', true)
            ];
        }

        return $leadBoard;
    }
}