<?php

namespace App\Controller;

use App\Entity\RepLog;
use App\Entity\User;
use App\Repository\RepLogRepository;
use App\Security\RepLogVoter;
use App\Service\ErrorValidationFactory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\InvalidCsrfTokenException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route("/api", name: "lift_")]
class LiftController extends BaseController
{
    #[Route("/reps/{id}", name: "get", methods: ['GET'])]
    public function getLift(Request $request, RepLogRepository $repLogRepository): Response
    {
        if ($request->isXmlHttpRequest()) {
            $repLog = $repLogRepository->find($request->attributes->get('id'));
            $model = $this->buildRepLogModel($repLog);
            return $this->createApiResponse($model);
        }

        return new JsonResponse([
            'message' => 'Request header X-Requested-With is missing'
        ], Response::HTTP_BAD_REQUEST);
    }

    #[Route("/reps", name: "add", methods: ['POST'])]
    public function addLift(
        Request $request,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        EntityManagerInterface $entityManager
    ): Response
    {
        if ($request->isXmlHttpRequest()) {
            $this->denyAccessUnlessGranted('ROLE_USER');

            if (!$this->isCsrfTokenValid('add_rep_log_item', $request->toArray()['_token'] ?? null)) {
                throw new InvalidCsrfTokenException('Invalid CSRF token.');
            }
            /** @var RepLog $repLog */
            $repLog = $serializer->deserialize($request->getContent(), RepLog::class, 'json', ['groups' => 'add_rep_log']);

            /** @var User $user */
            $user = $this->getUser();
            $repLog->setUser($user);

            $constraintList = $validator->validate($repLog);
            ErrorValidationFactory::handleErrors($constraintList);

            $entityManager->persist($repLog);
            $entityManager->flush();

            $response = new Response(null, 204);
            $response->headers->set(
                'Location',
                $this->generateUrl('lift_get', ['id' => $repLog->getId()])
            );

            return $response;
        }

        return new JsonResponse([
            'message' => 'Request header X-Requested-With is missing'
        ], Response::HTTP_BAD_REQUEST);
    }

    #[Route("/reps/{id}", name: "delete", methods: ['DELETE'])]
    public function deleteLift(
        Request $request,
        RepLogRepository $repLogRepository,
        EntityManagerInterface $entityManager
    ): Response
    {
        if ($request->isXmlHttpRequest()) {
            $this->denyAccessUnlessGranted('ROLE_USER');
            $repLog = $repLogRepository->find($request->attributes->get('id'));

            if (!$repLog) {
                throw new NotFoundHttpException("Not found.", null, Response::HTTP_NOT_FOUND);
            }

            $this->denyAccessUnlessGranted(RepLogVoter::DELETE, $repLog, "You are not allow to do this action");

            $entityManager->remove($repLog);
            $entityManager->flush();
            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        }

        return new JsonResponse([
            'message' => 'Request header X-Requested-With is missing'
        ], Response::HTTP_BAD_REQUEST);
    }
}