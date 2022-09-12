<?php

namespace App\Controller;

use App\Api\RepLogModel;
use App\Entity\RepLog;
use App\Repository\RepLogRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class BaseController extends AbstractController
{
    public function __construct(
        private RepLogRepository $repLogRepository,
        private SerializerInterface $serializer
    )
    {
    }

    private function buildRepLogModel(RepLog $repLog): RepLogModel
    {
        $model = new RepLogModel();
        $model->id = $repLog->getId();
        $model->reps = $repLog->getReps();
        $model->item = $repLog->getItemLabel();
        $model->totalWeightLifted = $repLog->getTotalWeightLifted();
        $model->addLink('self', 'todo url to delete self');

        return $model;
    }

    protected function createApiResponse($data, $statusCode = 200): Response
    {
        $json = $this->serializer->serialize($data, 'json');
        return new JsonResponse($json, $statusCode, [], true);
    }

    /**
     * @return RepLogModel[]
     */
    protected function findAllRepLogModels(): array
    {
        $repLogs = $this->repLogRepository->findBy(['user' => $this->getUser()]);
        $models = [];

        foreach ($repLogs as $repLog) {
            $models[] = $this->buildRepLogModel($repLog);
        }

        return $models;
    }
}