<?php

namespace App\Controller;

use App\Entity\RepLog;
use App\Repository\RepLogRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class RepLogController extends BaseController
{
    #[Route("/", name: "rep_log")]
    #[IsGranted("ROLE_USER")]
    public function index(
        SerializerInterface $serializer,
        RepLogRepository $repLogRepository,
        CsrfTokenManagerInterface $csrfTokenManager
    ): Response
    {
        $repLogModel = $this->findAllRepLogModels();
        $repLogs = $serializer->serialize($repLogModel, 'json');
        $leadBoard = $this->getLeadBoard($repLogRepository);

        $repLogAppProps = [
            'itemOptions' => [],
            'withHeart' => true,
            'token' => $csrfTokenManager->getToken('add_rep_log_token')->getValue()
        ];
        foreach (RepLog::getLiftedItemChoices() as $label => $id) {
            $repLogAppProps['itemOptions'][] = [
                'id' => $id,
                'label' => ucwords($label)
            ];
        }

        return $this->render('reps/rep_log.html.twig', [
            'repLogs' => $repLogs,
            'leadBoard' => $leadBoard,
            'repLogAppProps' => $repLogAppProps
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